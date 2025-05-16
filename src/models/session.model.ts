import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    // Customize the table name if you want
    postgresql: {schema: 'public', table: 'sessions'},
  },
})
export class Session extends Entity {
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
    required: true,
  })
  token: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataType: 'varchar',
      dataLength: 36,
    },
  })
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  orgId: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {dataType: 'timestamp with time zone'},
  })
  createdAt: Date;

  @property({
    type: 'date',
    required: true,
    postgresql: {dataType: 'timestamp with time zone'},
  })
  expiresAt: Date;

  @property({
    type: 'object',
    postgresql: {dataType: 'jsonb'},
  })
  sessionData?: object;

  constructor(data?: Partial<Session>) {
    super(data);
  }
}


export interface SessionRelations {

}
