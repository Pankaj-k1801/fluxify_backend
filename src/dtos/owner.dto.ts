import {model, Model, property} from '@loopback/repository';

@model()
export class OwnerRegistrationDto extends Model {
  @property({type: 'string', required: true})
  firstName: string;

  @property({type: 'string', required: true})
  lastName: string;

  @property({type: 'string', required: true})
  email: string;

  @property({type: 'string', required: true})
  contactNo: string;

  @property({type: 'string'})
  alternatePhone?: string;

  // Address fields
  @property({type: 'string', required: true})
  houseNo: string;

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
