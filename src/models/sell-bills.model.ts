import {Entity, model, property} from '@loopback/repository';

@model()
export class SellBills extends Entity {
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
  sellBillId: string;

  @property({
    type: 'number',
    required: true
  })
  totalAmt: number;

  @property({
    type: 'number',
    required: true
  })
  totalItemsPurchased: number;

  @property({
    type: 'number',
    required: true
  })
  totalItemsReturned: number;

  @property({
    type: 'number',
    required: true
  })
  returnedAmout: number;

  @property({
    type: 'number',
    required: true
  })
  discount: number;

  @property({
    type: 'string',
    required: true
  })
  customerId: string;

  @property({
    type: 'string',
    required: true
  })
  branchId: string;

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

  constructor(data?: Partial<SellBills>) {
    super(data);
  }
}

export interface SellBillsRelations {

}
