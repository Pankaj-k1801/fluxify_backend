import {injectable, BindingScope} from '@loopback/core';
import * as bcrypt from 'bcryptjs';

@injectable({scope: BindingScope.SINGLETON})
export class PasswordService {
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(
    providedPassword: string,
    storedHash: string
  ): Promise<boolean> {
    return bcrypt.compare(providedPassword, storedHash);
  }
}
