import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {OwnerRegistrationDto} from '../dtos/owner.dto';
import {Owner} from '../models';
import {OwnerRepository} from '../repositories';
import {OwnerService} from '../services';

export class OwnerController {
  constructor(
    @repository(OwnerRepository)
    public ownerRepository: OwnerRepository,
    @service(OwnerService)
    private ownerService: OwnerService,
  ) { }

  @post('/owners')
  @response(200, {
    description: 'Owner model instance',
    content: {'application/json': {schema: getModelSchemaRef(Owner)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Owner, {
            title: 'NewOwner',

          }),
        },
      },
    })
    owner: Owner,
  ): Promise<Owner> {
    return this.ownerRepository.create(owner);
  }

  @get('/owners/count')
  @response(200, {
    description: 'Owner model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Owner) where?: Where<Owner>,
  ): Promise<Count> {
    return this.ownerRepository.count(where);
  }

  @get('/owners')
  @response(200, {
    description: 'Array of Owner model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Owner, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Owner) filter?: Filter<Owner>,
  ): Promise<Owner[]> {
    return this.ownerRepository.find(filter);
  }

  @patch('/owners')
  @response(200, {
    description: 'Owner PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Owner, {partial: true}),
        },
      },
    })
    owner: Owner,
    @param.where(Owner) where?: Where<Owner>,
  ): Promise<Count> {
    return this.ownerRepository.updateAll(owner, where);
  }

  @get('/owners/{id}')
  @response(200, {
    description: 'Owner model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Owner, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Owner, {exclude: 'where'}) filter?: FilterExcludingWhere<Owner>
  ): Promise<Owner> {
    return this.ownerRepository.findById(id, filter);
  }

  @patch('/owners/{id}')
  @response(204, {
    description: 'Owner PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Owner, {partial: true}),
        },
      },
    })
    owner: Owner,
  ): Promise<void> {
    await this.ownerRepository.updateById(id, owner);
  }

  @put('/owners/{id}')
  @response(204, {
    description: 'Owner PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() owner: Owner,
  ): Promise<void> {
    await this.ownerRepository.replaceById(id, owner);
  }

  @del('/owners/{id}')
  @response(204, {
    description: 'Owner DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ownerRepository.deleteById(id);
  }

  @post('/owners/register', {
    responses: {
      '200': {
        description: 'Owner Registration Successful',
        content: {'application/json': {schema: {'x-ts-type': Owner}}},
      },
    },
  })
  async registerOwner(
    @requestBody({
      description: 'Owner registration data',
      required: true,
      content: {
        'application/json': {schema: {'x-ts-type': OwnerRegistrationDto}},
      },
    })
    ownerData: OwnerRegistrationDto,

    @param.query.string('userId', {
      description: 'User ID for registration',
      required: true,
    })
    userId: string,
  ): Promise<Owner> {
    if (!userId) {
      throw new HttpErrors.BadRequest('userId query parameter is required.');
    }

    return this.ownerService.ownerRegistration(ownerData, userId);
  }
}
