import {Entity, model, property} from '@loopback/repository';

@model()
export class Staff extends Entity {
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
  orgId: string;

  @property({
    type: 'string',
    required: true
  })
  staffId: string;

  @property({
    type: 'string',
    required: true
  })
  name: string;

  @property({
    type: 'string',
  })
  add: string;

  @property({
    type: 'string',
    required: true
  })
  phone: string;

  @property({
    type: 'string',
  })
  email: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isManager: boolean;

  @property({
    type: 'string',
  })
  assignedBranch: string;

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

  constructor(data?: Partial<Staff>) {
    super(data);
  }
}

export interface StaffRelations {

}
