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
  orgId: string;

  @property({
    type: 'string',
  })
  branchId: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'google_id',
      dataType: 'varchar',
      length: 255,
    },
  })
  googleId: string;

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
    postgresql: {
      columnName: 'name',
      dataType: 'varchar',
      length: 255,
    },
  })
  name?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'picture_url',
      dataType: 'varchar',
      length: 255,
    },
  })
  pictureUrl?: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'role',
      dataType: 'varchar',
      length: 50,
    },
  })
  role: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {dataType: 'timestamp with time zone'},
  })
  lastLoginTime: string;

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
    required: true,
  })
  createdBy: string;

  @property({
    type: 'string',
    required: true,
  })
  updatedBy: string;

  /* Relations */

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {

}
