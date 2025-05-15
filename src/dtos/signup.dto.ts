// src/dtos/signup-request.dto.ts
import {Model, model, property} from '@loopback/repository';

@model()
export class Signup extends Model {
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
export class Login extends Model {
  @property({type: 'string', required: true})
  email: string;

  @property({type: 'string', required: true})
  password: string;
}
