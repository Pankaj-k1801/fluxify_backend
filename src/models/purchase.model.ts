import {Entity, model, property} from '@loopback/repository';

@model()
export class Purchase extends Entity {
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
  purchasedBillId: string;

  @property({
    type: 'string',
    required: true
  })
  orderDate: string;

  @property({
    type: 'number',
    required: true
  })
  totalAmount: number;

  @property({
    type: 'number',
    required: true
  })
  purchasedPrice: number;

  @property({
    type: 'string',
    required: true
  })
  branchId: string;

  @property({
    type: 'string',
    required: true
  })
  paymentInfoId: string;

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

  constructor(data?: Partial<Purchase>) {
    super(data);
  }
}

export interface PurchaseRelations {

}
