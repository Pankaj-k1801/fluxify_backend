// src/services/user.service.ts
import {BindingScope, inject, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {randomBytes} from 'crypto';
import {Login, Signup} from '../dtos/signup.dto';
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
    if (existingUser) throw new Error('Email already in use');

    const hashedPassword = await this.passwordService.hashPassword(signupData.password);
    const userId = await this.uniqueIdService.generateNextUserId();

    const newUser = await this.usersRepository.create({
      ...signupData,
      password: hashedPassword,
      userId,
      createdDate: new Date().toISOString(),
      upDatedDate: new Date().toISOString(),
      isLoggedIn: false,
      lastLoginTime: new Date().toISOString(),
      isOwner: false,
      createdBy: 'system',
      updatedBy: 'system',
    });

    return newUser;
  }

  /* User Login  */
  async login(loginData: Login): Promise<{token: string; user: Users}> {
    const {email, password} = loginData;

    // Step 1: Find user by email
    const user = await this.usersRepository.findOne({where: {email}});
    if (!user) {
      throw new HttpErrors.Unauthorized('No user with this Email');
    }

    /* Checking is User is Active or Not  */
    if (!user.isActive) {
      throw new HttpErrors.Unauthorized('User is Not Active');
    }

    // Step 2: Verify password
    const isMatch = await this.passwordService.comparePassword(password, user.password);
    if (!isMatch) {
      throw new HttpErrors.Unauthorized('Invalid Password');
    }

    // Step 3: Generate token (Random bytes used as Token for Security)
    const token = randomBytes(32).toString('hex');

    // Step 4: Create session entry
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 12); // 12 hours

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

    return {
      token,
      user,
    };
  }
}



