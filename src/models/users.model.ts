import {Entity, model, property} from '@loopback/repository';

@model()
export class Users extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    postgresql: {
      dataType: 'uuid',
      default: 'uuid_generate_v4()',
    },
  })
  id: string;

  @property({
    type: 'string',
    required: true
  })
  userId: string;

  @property({
    type: 'string',
    required: true
  })
  firstName: string;

  @property({
    type: 'string',
    required: true
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'email',
      dataType: 'varchar',
      length: 255,
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataType: 'varchar',
      length: 255,
    },
  })
  password: string;

  @property({
    type: 'string',
    required: false,
    postgresql: {
      dataType: 'varchar',
      length: 20,
    },
  })
  phone?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isLoggedIn?: boolean;

  @property({
    type: 'date',
    required: true,
    postgresql: {dataType: 'timestamp with time zone'},
  })
  lastLoginTime: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isOwner?: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isActive?: boolean;

  /* For Logs */
  @property({
    type: 'date',
    required: true,
    postgresql: {dataType: 'timestamp with time zone'},
  })
  createdDate: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {dataType: 'timestamp with time zone'},
  })
  upDatedDate: string;

  @property({
    type: 'string',
  })
  createdBy: string;

  @property({
    type: 'string',
  })
  updatedBy: string;

  /* Relations */

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {

}
