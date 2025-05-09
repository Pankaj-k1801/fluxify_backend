import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductUnit extends Entity {
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
  productUnitId: string;

  @property({
    type: 'string',
    required: true
  })
  unitName: string;

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

  /* Relations */

  constructor(data?: Partial<ProductUnit>) {
    super(data);
  }
}

export interface ProductUnitRelations {

}
