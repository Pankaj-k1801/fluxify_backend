import {Entity, model, property} from '@loopback/repository';

@model()
export class Product extends Entity {
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
  productId: string;

  @property({
    type: 'string',
    required: true
  })
  productName: string;

  @property({
    type: 'string',
  })
  productSubname: string;

  @property({
    type: 'string',
    required: true
  })
  brandId: string;

  @property({
    type: 'string',
    required: true
  })
  brandName: string;

  @property({
    type: 'string',
    required: true
  })
  productUnit: string;

  @property({
    type: 'string',
    required: true
  })
  productTypeId: string;

  @property({
    type: 'string',
    required: true
  })
  productUnitId: string;

  @property({
    type: 'string',
    required: true
  })
  productTypeName: string;

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

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {

}
