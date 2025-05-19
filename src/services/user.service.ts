// src/services/user.service.ts
import {BindingScope, inject, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {randomBytes} from 'crypto';
import {Login, Signup, UserDto} from '../dtos/user.dto';
import {Session} from '../models';
import {OwnerRepository, SessionRepository, StaffRepository, UsersRepository} from '../repositories';
import {PasswordService} from './password.service';
import {UniqueIdService} from './unique-id.service';

@injectable({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(
    @repository(UsersRepository)
    private usersRepository: UsersRepository,

    @repository(SessionRepository)
    private sessionRepository: SessionRepository,

    @repository(OwnerRepository)
    private ownerRepository: OwnerRepository,

    @repository(StaffRepository)
    private staffRepository: StaffRepository,

    @inject('services.UniqueIdService')
    private uniqueIdService: UniqueIdService,

    @inject('services.PasswordService')
    private passwordService: PasswordService,
  ) { }

  /* User SignUp  */
  async signup(signupData: Signup): Promise<UserDto> {
    const existingUser = await this.usersRepository.findOne({
      where: {email: signupData.email},
    });

    if (existingUser) {
      // Send 409 Conflict error if email already exists
      throw new HttpErrors.Conflict('Email already in use');
    }
    const hashedPassword = await this.passwordService.hashPassword(signupData.password);
    const userId = await this.uniqueIdService.generateNextUserId();

    const newUser = await this.usersRepository.create({
      ...signupData,
      password: hashedPassword,
      userId,
      createdDate: new Date().toISOString(),
      upDatedDate: new Date().toISOString(),
      isLoggedIn: false,
      isActive: true,
      lastLoginTime: new Date().toISOString(),
      isOwner: true,  /* Only Owner will Sign Up and they will add Staff  */
      isRegistered: false, // Make this True when User Registers itself as Owner or Staff
      createdBy: 'system',
      updatedBy: 'system',
    });

    // Exclude password before returning
    const {password, ...safeUser} = newUser;
    return new UserDto(safeUser);
  }

  /* User Login  */
  async login(loginData: Login): Promise<{token: string; user: UserDto}> {
    const {email, password} = loginData;

    // Find user by email
    const user = await this.usersRepository.findOne({where: {email}});
    if (!user) {
      throw new HttpErrors.Unauthorized('No user with this Email');
    }

    /* Checking if User already exists in Owner or Staff Table */
    // Find User in Owner
    const owner = await this.ownerRepository.findOne({where: {userId: user.userId}});
    if (owner) {
      // if user is Registered then updated isRegistered Field to true
      await this.usersRepository.updateById(user.userId, {
        isRegistered: true,
        isOwner: true, /* True if User is Owner */
        upDatedDate: new Date().toISOString(), // Optional: if you're maintaining updated date
      });

      // Optional: refresh user object after update
      user.isRegistered = true;
    }
    else { /* Find User in Staff */
      const staff = await this.staffRepository.findOne({where: {userId: user.userId}});
      if (staff) {
        // if user is Registered then updated isRegistered Field to true
        await this.usersRepository.updateById(user.userId, {
          isRegistered: true,
          isOwner: false, /* False if User is Staff */
          upDatedDate: new Date().toISOString(), // Optional: if you're maintaining updated date
        });

        // Optional: refresh user object after update
        user.isRegistered = true;
      }
    }

    /* Checking if User is Active or Not  */
    if (!user.isActive) {
      throw new HttpErrors.Unauthorized('User is Not Active');
    }

    // Verify password
    const isMatch = await this.passwordService.comparePassword(password, user.password);
    if (!isMatch) {
      throw new HttpErrors.Unauthorized('Invalid Password');
    }

    // Update isLoggedIn and lastLoginTime in Users table
    await this.usersRepository.updateById(user.userId, {
      isLoggedIn: true,
      lastLoginTime: new Date().toISOString(),
    });


    // Check if an active session already exists
    const existingSession = await this.sessionRepository.findOne({
      where: {
        userId: user.userId,
        expiresAt: {gt: new Date()}, // session not expired
      },
    });

    // Create session entry
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 12); // 12 hours

    if (existingSession) {
      // Extend session expiry time
      await this.sessionRepository.updateById(existingSession.userId, {
        expiresAt,
      });

      // Exclude password before returning
      const {password, ...safeUser} = user;
      return {
        token: existingSession.token,
        user: new UserDto(safeUser),
      };
    }

    // Otherwise, create a new session
    // Generate token (Random bytes used as Token for Security)
    const token = randomBytes(32).toString('hex');

    const session: Partial<Session> = {
      userId: user.userId,
      token: token,
      orgId: 'org-1000', // Default Org Id for Now Later we will use Actual OrgId
      createdAt: now,
      expiresAt,
      sessionData: {
        email: user.email,
      },
    };

    await this.sessionRepository.create(session);

    // Re-fetch updated user
    const updatedUser = await this.usersRepository.findById(user.userId);

    const {password: pw, ...safeUser} = updatedUser;

    return {
      token,
      user: new UserDto(safeUser),
    };
  }

  /* User Logout */
  async logout(userId: string, token: string): Promise<{message: string}> {
    // Find the session for this user and token
    const existingSession = await this.sessionRepository.findOne({
      where: {
        userId,
        token,
      },
    });

    if (!existingSession) {
      throw new HttpErrors.Unauthorized('Invalid session or already logged out');
    }

    // Delete session or mark as expired
    await this.sessionRepository.deleteById(userId); // If userId is primary key

    // Update isLoggedIn status in Users table
    await this.usersRepository.updateById(userId, {
      isLoggedIn: false,
    });

    return {
      message: 'User successfully logged out',
    };
  }

}
