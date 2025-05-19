// src/services/user.service.ts
import {BindingScope, inject, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {randomBytes} from 'crypto';
import {Login, Signup} from '../dtos/user.dto';
import {Session, Users} from '../models';
import {SessionRepository, UsersRepository} from '../repositories';
import {PasswordService} from './password.service';
import {UniqueIdService} from './unique-id.service';

@injectable({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(
    @repository(UsersRepository)
    private usersRepository: UsersRepository,

    @repository(SessionRepository)
    private sessionRepository: SessionRepository,

    @inject('services.UniqueIdService')
    private uniqueIdService: UniqueIdService,

    @inject('services.PasswordService')
    private passwordService: PasswordService,
  ) { }

  /* User SignUp  */
  async signup(signupData: Signup): Promise<Users> {
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
      isOwner: false,
      isRegistered: false, // Make this True when User Registers itself as Owner or Staff
      createdBy: 'system',
      updatedBy: 'system',
    });

    return newUser;
  }

  /* User Login  */
  async login(loginData: Login): Promise<{token: string; user: Users}> {
    const {email, password} = loginData;

    // Find user by email
    const user = await this.usersRepository.findOne({where: {email}});
    if (!user) {
      throw new HttpErrors.Unauthorized('No user with this Email');
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

      return {
        token: existingSession.token,
        user,
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

    return {
      token,
      user: updatedUser,
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
