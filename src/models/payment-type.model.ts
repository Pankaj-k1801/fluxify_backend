import {Entity, model, property} from '@loopback/repository';

@model()
export class PaymentType extends Entity {
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
  paymentInfoId: string;

  @property({
    type: 'string',
    required: true
  })
  paymentType: string;

  @property({
    type: 'string',
  })
  creditDebitNumer: string;

  @property({
    type: 'string',
  })
  referenceNumber: string;

  @property({
    type: 'string',
  })
  remark: string;

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

  constructor(data?: Partial<PaymentType>) {
    super(data);
  }
}

export interface PaymentTypeRelations {

}
