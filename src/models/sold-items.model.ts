import {Entity, model, property} from '@loopback/repository';

@model()
export class SoldItems extends Entity {
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
  customerId: string;

  @property({
    type: 'string',
    required: true
  })
  sellBillId: string;

  @property({
    type: 'string',
    required: true
  })
  productTypeId: string;

  @property({
    type: 'string',
    required: true
  })
  brandId: string;

  @property({
    type: 'string',
    required: true
  })
  productId: string;

  @property({
    type: 'string',
    required: true
  })
  productUnitId: string;

  @property({
    type: 'number',
    required: true
  })
  mrp: number;

  @property({
    type: 'number',
    required: true
  })
  qtySold: number;

  @property({
    type: 'string',
    required: true
  })
  expiryDate: string;

  @property({
    type: 'string',
    required: true
  })
  purchasedBillId: string;

  @property({
    type: 'string',
    required: true
  })
  batchNo: string;

  @property({
    type: 'string',
    required: true
  })
  branchId: string;

  @property({
    type: 'boolean',
    required: true
  })
  isReturned: boolean;

  @property({
    type: 'number',
    required: true
  })
  qtyReturned: number;

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


  constructor(data?: Partial<SoldItems>) {
    super(data);
  }
}


export interface SoldItemsRelations {

}
