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
import {Setup} from '../models';
import {SetupRepository} from '../repositories';

export class SetupController {
  constructor(
    @repository(SetupRepository)
    public setupRepository : SetupRepository,
  ) {}

  @post('/setups')
  @response(200, {
    description: 'Setup model instance',
    content: {'application/json': {schema: getModelSchemaRef(Setup)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Setup, {
            title: 'NewSetup',
            
          }),
        },
      },
    })
    setup: Setup,
  ): Promise<Setup> {
    return this.setupRepository.create(setup);
  }

  @get('/setups/count')
  @response(200, {
    description: 'Setup model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Setup) where?: Where<Setup>,
  ): Promise<Count> {
    return this.setupRepository.count(where);
  }

  @get('/setups')
  @response(200, {
    description: 'Array of Setup model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Setup, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Setup) filter?: Filter<Setup>,
  ): Promise<Setup[]> {
    return this.setupRepository.find(filter);
  }

  @patch('/setups')
  @response(200, {
    description: 'Setup PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Setup, {partial: true}),
        },
      },
    })
    setup: Setup,
    @param.where(Setup) where?: Where<Setup>,
  ): Promise<Count> {
    return this.setupRepository.updateAll(setup, where);
  }

  @get('/setups/{id}')
  @response(200, {
    description: 'Setup model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Setup, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Setup, {exclude: 'where'}) filter?: FilterExcludingWhere<Setup>
  ): Promise<Setup> {
    return this.setupRepository.findById(id, filter);
  }

  @patch('/setups/{id}')
  @response(204, {
    description: 'Setup PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Setup, {partial: true}),
        },
      },
    })
    setup: Setup,
  ): Promise<void> {
    await this.setupRepository.updateById(id, setup);
  }

  @put('/setups/{id}')
  @response(204, {
    description: 'Setup PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() setup: Setup,
  ): Promise<void> {
    await this.setupRepository.replaceById(id, setup);
  }

  @del('/setups/{id}')
  @response(204, {
    description: 'Setup DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.setupRepository.deleteById(id);
  }
}
