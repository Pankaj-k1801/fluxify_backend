import {Entity, model, property} from '@loopback/repository';

@model()
export class Stock extends Entity {
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
  branchId: string;

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
    type: 'string',
  })
  batchNo: string;

  @property({
    type: 'number',
    required: true
  })
  qtyRemain: number;

  @property({
    type: 'string',
    required: true
  })
  purchasedBillId: string;

  @property({
    type: 'number',
    required: true
  })
  mrp: number;

  @property({
    type: 'boolean',
    default: true,
  })
  isUnpackedForLooseSale: boolean;

  @property({
    type: 'number',
    required: true
  })
  unPackedQty: number;

  @property({
    type: 'date',
    required: true,
    postgresql: {dataType: 'timestamp with time zone'},
  })
  expiryDate: string;

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

  constructor(data?: Partial<Stock>) {
    super(data);
  }
}

export interface StockRelations {

}
