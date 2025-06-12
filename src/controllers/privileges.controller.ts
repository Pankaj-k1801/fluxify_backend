import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Privileges} from '../models';
import {PrivilegesRepository} from '../repositories';

@authenticate('session')
export class PrivilegesController {
  constructor(
    @repository(PrivilegesRepository)
    public privilegesRepository: PrivilegesRepository,
  ) { }

  @post('/privileges')
  @response(200, {
    description: 'Privileges model instance',
    content: {'application/json': {schema: getModelSchemaRef(Privileges)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Privileges, {
            title: 'NewPrivileges',

          }),
        },
      },
    })
    privileges: Privileges,
  ): Promise<Privileges> {
    return this.privilegesRepository.create(privileges);
  }

  @get('/privileges/count')
  @response(200, {
    description: 'Privileges model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Privileges) where?: Where<Privileges>,
  ): Promise<Count> {
    return this.privilegesRepository.count(where);
  }

  @get('/privileges')
  @response(200, {
    description: 'Array of Privileges model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Privileges, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Privileges) filter?: Filter<Privileges>,
  ): Promise<Privileges[]> {
    return this.privilegesRepository.find(filter);
  }

  @patch('/privileges')
  @response(200, {
    description: 'Privileges PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Privileges, {partial: true}),
        },
      },
    })
    privileges: Privileges,
    @param.where(Privileges) where?: Where<Privileges>,
  ): Promise<Count> {
    return this.privilegesRepository.updateAll(privileges, where);
  }

  @get('/privileges/{id}')
  @response(200, {
    description: 'Privileges model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Privileges, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Privileges, {exclude: 'where'}) filter?: FilterExcludingWhere<Privileges>
  ): Promise<Privileges> {
    return this.privilegesRepository.findById(id, filter);
  }

  @patch('/privileges/{id}')
  @response(204, {
    description: 'Privileges PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Privileges, {partial: true}),
        },
      },
    })
    privileges: Privileges,
  ): Promise<void> {
    await this.privilegesRepository.updateById(id, privileges);
  }

  @put('/privileges/{id}')
  @response(204, {
    description: 'Privileges PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() privileges: Privileges,
  ): Promise<void> {
    await this.privilegesRepository.replaceById(id, privileges);
  }

  @del('/privileges/{id}')
  @response(204, {
    description: 'Privileges DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.privilegesRepository.deleteById(id);
  }
}
