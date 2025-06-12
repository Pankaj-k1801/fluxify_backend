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
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {SoldItems} from '../models';
import {SoldItemsRepository} from '../repositories';

@authenticate('session')
export class SoldItemsController {
  constructor(
    @repository(SoldItemsRepository)
    public soldItemsRepository: SoldItemsRepository,
  ) { }

  @post('/sold-items')
  @response(200, {
    description: 'SoldItems model instance',
    content: {'application/json': {schema: getModelSchemaRef(SoldItems)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SoldItems, {
            title: 'NewSoldItems',

          }),
        },
      },
    })
    soldItems: SoldItems,
  ): Promise<SoldItems> {
    return this.soldItemsRepository.create(soldItems);
  }

  @get('/sold-items/count')
  @response(200, {
    description: 'SoldItems model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SoldItems) where?: Where<SoldItems>,
  ): Promise<Count> {
    return this.soldItemsRepository.count(where);
  }

  @get('/sold-items')
  @response(200, {
    description: 'Array of SoldItems model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SoldItems, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SoldItems) filter?: Filter<SoldItems>,
  ): Promise<SoldItems[]> {
    return this.soldItemsRepository.find(filter);
  }

  @patch('/sold-items')
  @response(200, {
    description: 'SoldItems PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SoldItems, {partial: true}),
        },
      },
    })
    soldItems: SoldItems,
    @param.where(SoldItems) where?: Where<SoldItems>,
  ): Promise<Count> {
    return this.soldItemsRepository.updateAll(soldItems, where);
  }

  @get('/sold-items/{id}')
  @response(200, {
    description: 'SoldItems model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SoldItems, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SoldItems, {exclude: 'where'}) filter?: FilterExcludingWhere<SoldItems>
  ): Promise<SoldItems> {
    return this.soldItemsRepository.findById(id, filter);
  }

  @patch('/sold-items/{id}')
  @response(204, {
    description: 'SoldItems PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SoldItems, {partial: true}),
        },
      },
    })
    soldItems: SoldItems,
  ): Promise<void> {
    await this.soldItemsRepository.updateById(id, soldItems);
  }

  @put('/sold-items/{id}')
  @response(204, {
    description: 'SoldItems PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() soldItems: SoldItems,
  ): Promise<void> {
    await this.soldItemsRepository.replaceById(id, soldItems);
  }

  @del('/sold-items/{id}')
  @response(204, {
    description: 'SoldItems DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.soldItemsRepository.deleteById(id);
  }
}
