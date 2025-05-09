import {Entity, model, property} from '@loopback/repository';

@model()
export class Setup extends Entity {
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

  /* Increment Id for New Owners */
  @property({
    type: 'string',
    required: true,
  })
  nextOrgId: string; // o-1000

  constructor(data?: Partial<Setup>) {
    super(data);
  }
}

export interface SetupRelations {

}
