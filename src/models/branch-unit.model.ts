import {Entity, model, property} from '@loopback/repository';
import {Organization} from './organization.model';

@model()
export class BranchUnit extends Entity {
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
  branchName: string;

  @property({
    type: 'string',
    required: true
  })
  branchAdd: string;

  @property({
    type: 'string',
    required: true
  })
  branchPhone: string;

  @property({
    type: 'string',
    required: true
  })
  branchEmail: string;

  @property({
    type: 'string',
  })
  branchManagerStaffId: string;

  @property({
    type: 'number',
    default: 1,
  })
  noOfStaff: number;

  /* Incremented Ids */
  @property({
    type: 'string',
    required: true,
  })
  nextBrandId: string;

  @property({
    type: 'string',
    required: true,
  })
  nextproductTypeId: string;

  @property({
    type: 'string',
    required: true,
  })
  nextproductId: string;

  @property({
    type: 'string',
    required: true,
  })
  nextproductUnitId: string;

  @property({
    type: 'string',
    required: true,
  })
  nextDiscountId: string;

  @property({
    type: 'string',
    required: true,
  })
  nextpaymentInfoId: string;

  @property({
    type: 'string',
    required: true,
  })
  nextpurchasedBillId: string;

  @property({
    type: 'string',
    required: true,
  })
  nextsellBillId: string;

  @property({
    type: 'string',
    required: true,
  })
  nextsupplierId: string;

  @property({
    type: 'string',
    required: true,
  })
  nextcustomerId: string;

  @property({
    type: 'string',
    required: true,
  })
  nextStaffId: string;

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

  constructor(data?: Partial<BranchUnit>) {
    super(data);
  }
}

export interface BranchUnitRelations {
  organization?: Organization;
}
