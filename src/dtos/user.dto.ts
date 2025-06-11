// src/dtos/signup-request.dto.ts
import {Model, model, property} from '@loopback/repository';

@model()
export class SignupDto extends Model {
  @property({type: 'string', required: true})
  firstName: string;

  @property({type: 'string', required: true})
  lastName: string;

  @property({type: 'string', required: true})
  email: string;

  @property({type: 'string', required: true})
  password: string;

  @property({type: 'string', required: false})
  phone?: string;
}

@model()
export class LoginDto extends Model {
  @property({type: 'string', required: true})
  email: string;

  @property({type: 'string', required: true})
  password: string;
}

@model()
export class LogoutDto {
  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  token: string;
}

@model()
export class UserDto extends Model {
  @property({type: 'string', required: true})
  userId: string;

  @property({type: 'string', required: true})
  orgId: string;

  @property({type: 'string', required: true})
  firstName: string;

  @property({type: 'string', required: true})
  lastName: string;

  @property({type: 'string', required: true})
  email: string;

  @property({type: 'string'})
  phone?: string;

  @property({type: 'boolean'})
  isLoggedIn?: boolean;

  @property({type: 'string'})
  lastLoginTime?: string;

  @property({type: 'boolean'})
  isOwner?: boolean;

  @property({type: 'boolean'})
  isRegistered?: boolean;

  @property({type: 'boolean'})
  isActive?: boolean;

  // You can include or exclude audit fields as needed.
  // @property({ type: 'string' })
  // createdDate?: string;

  // @property({ type: 'string' })
  // upDatedDate?: string;

  // @property({ type: 'string' })
  // createdBy?: string;

  // @property({ type: 'string' })
  // updatedBy?: string;

  constructor(data?: Partial<UserDto>) {
    super(data);
  }
}
