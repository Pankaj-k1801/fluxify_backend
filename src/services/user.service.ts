// src/services/user.service.ts
import {BindingScope, inject, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Signup} from '../dtos/signup.dto';
import {Users} from '../models';
import {UsersRepository} from '../repositories';
import {PasswordService} from './password.service';
import {UniqueIdService} from './unique-id.service';

@injectable({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(
    @repository(UsersRepository)
    private usersRepository: UsersRepository,

    @inject('services.UniqueIdService')
    private uniqueIdService: UniqueIdService,

    @inject('services.PasswordService')
    private passwordService: PasswordService,
  ) { }

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
}
