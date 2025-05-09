import {Entity, model, property} from '@loopback/repository';

@model()
export class Owner extends Entity {
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
  orgId: string;

  @property({
    type: 'string',
    required: true,
  })
  ownerName: string;

  @property({
    type: 'string',
  })
  ownerAdd: string;

  @property({
    type: 'string',
  })
  ownerEmail: string;

  @property({
    type: 'string',
    required: true,
  })
  ownerPhone: string;

  @property({
    type: 'string',
  })
  alternatePhone: string;

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

  constructor(data?: Partial<Owner>) {
    super(data);
  }
}

export interface OwnerRelations {

}
