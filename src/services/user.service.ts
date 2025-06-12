// src/services/user.service.ts
import {BindingScope, inject, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {randomBytes} from 'crypto';
import {LoginDto, SignupDto, UserDto} from '../dtos/user.dto';
import {Session, Users} from '../models';
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
  async signup(signupData: SignupDto): Promise<UserDto> {
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
      orgId: 'org-0000', // Temporary
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
  async login(loginData: LoginDto): Promise<{token: string; user: UserDto}> {
    const {email, password} = loginData;

    // Find user by email
    const user = await this.usersRepository.findOne({where: {email}});
    if (!user) {
      throw new HttpErrors.Unauthorized('No user with this Email');
    }

    let updatedFields: Partial<Users> = {};

    // Check if user is an Owner
    const owner = await this.ownerRepository.findOne({where: {userId: user.userId}});
    if (owner) {
      updatedFields = {
        isRegistered: true,
        isOwner: true,
        upDatedDate: new Date().toISOString(),
      };
    } else {
      // Else check if user is a Staff
      const staff = await this.staffRepository.findOne({where: {userId: user.userId}});
      if (staff) {
        updatedFields = {
          isRegistered: true,
          isOwner: false,
          upDatedDate: new Date().toISOString(),
        };
      }
    }

    // Update user if needed
    if (Object.keys(updatedFields).length > 0) {
      await this.usersRepository.updateById(user.userId, updatedFields);
    }

    // ❗ Ensure user is active
    if (!user.isActive) {
      throw new HttpErrors.Unauthorized('User is Not Active');
    }

    // Verify password
    const isMatch = await this.passwordService.comparePassword(password, user.password);
    if (!isMatch) {
      throw new HttpErrors.Unauthorized('Invalid Password');
    }

    // Update login fields
    await this.usersRepository.updateById(user.userId, {
      isLoggedIn: true,
      lastLoginTime: new Date().toISOString(),
    });

    // Check for existing session
    const existingSession = await this.sessionRepository.findOne({
      where: {
        userId: user.userId,
        expiresAt: {gt: new Date()},
      },
    });

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 12); // 12 hours
    let token = '';

    if (existingSession) {
      // Extend session
      await this.sessionRepository.updateById(existingSession.userId, {
        expiresAt,
      });
      token = existingSession.token;
    } else {
      // Create new session
      token = randomBytes(32).toString('hex');
      const session: Partial<Session> = {
        userId: user.userId,
        token,
        orgId: user.orgId,
        createdAt: now,
        expiresAt,
        sessionData: {
          email: user.email,
        },
      };
      await this.sessionRepository.create(session);
    }

    // Safely combine updated fields with user (in-memory)
    const responseUser = {
      ...user,
      ...updatedFields,
      isLoggedIn: true,
      lastLoginTime: new Date().toISOString(),
      expiresAt: expiresAt
    };

    // Return user DTO without password
    const {password: pw, ...safeUser} = responseUser;

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
