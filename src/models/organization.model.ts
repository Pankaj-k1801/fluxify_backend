import {Entity, model, property} from '@loopback/repository';

@model()
export class Organization extends Entity {
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
  orgName: string;

  @property({
    type: 'object',
    postgresql: {dataType: 'jsonb'},
  })
  orgAdd: object;

  @property({
    type: 'string',
  })
  orgEmail: string;

  @property({
    type: 'string',
  })
  orgPhone: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isMultipleBranches: boolean;

  /* Incremented Ids */
  @property({
    type: 'string',
    required: true,
  })
  nextbranchId: string;

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

  constructor(data?: Partial<Organization>) {
    super(data);
  }
}

export interface OrganizationRelations {

}
