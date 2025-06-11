import {Model, model, property} from '@loopback/repository';

@model()
export class AddOrganizationRequest extends Model {
  @property({type: 'string', required: true})
  orgId: string;

  @property({type: 'string', required: true})
  orgName: string;

  @property({type: 'string'})
  orgEmail?: string;

  @property({type: 'string'})
  orgPhone?: string;

  @property({type: 'string'})
  createdBy: string;

  @property({type: 'string'})
  updatedBy: string;

  // Address fields
  @property({type: 'string', required: true})
  shopNo: string;

  @property({type: 'string', required: true})
  buildingName: string;

  @property({type: 'string', required: true})
  street: string;

  @property({type: 'string', required: true})
  area: string;

  @property({type: 'string', required: true})
  landmark: string;

  @property({type: 'string', required: true})
  city: string;

  @property({type: 'string', required: true})
  district: string;

  @property({type: 'string', required: true})
  state: string;

  @property({type: 'string', required: true})
  country: string;

  @property({type: 'string', required: true})
  pincode: string;
}
