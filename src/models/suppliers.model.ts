import {Entity, model, property} from '@loopback/repository';

@model()
export class Suppliers extends Entity {
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
  supplierId: string;

  @property({
    type: 'string',
    required: true
  })
  supplierName: string;

  @property({
    type: 'string',
    required: true
  })
  supplierAdd: string;

  @property({
    type: 'string',
  })
  supplierEmail: string;

  @property({
    type: 'string',
  })
  supplierContact: string;

  @property({
    type: 'number',
    required: true
  })
  supplierOutstandingAmt: number;

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

  constructor(data?: Partial<Suppliers>) {
    super(data);
  }
}

export interface SuppliersRelations {

}
