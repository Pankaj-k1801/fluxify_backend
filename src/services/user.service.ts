// src/services/user.service.ts
import {injectable, BindingScope, inject} from '@loopback/core';
import {UsersRepository} from '../repositories';
import { Signup } from '../dtos/signup.dto';
import {Users} from '../models';
import {repository} from '@loopback/repository';
import * as bcrypt from 'bcryptjs';

@injectable({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(
    @repository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async signup(signupData: Signup): Promise<Users> {
    const existingUser = await this.usersRepository.findOne({
      where: {email: signupData.email},
    });

    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(signupData.password, 10);

    const newUser = await this.usersRepository.create({
      ...signupData,
      password: hashedPassword,
      userId: `user-${Date.now()}`,
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
