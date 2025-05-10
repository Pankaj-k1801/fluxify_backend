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
import {PurchaseItems} from '../models';
import {PurchaseItemsRepository} from '../repositories';

export class PurchaseItemsController {
  constructor(
    @repository(PurchaseItemsRepository)
    public purchaseItemsRepository : PurchaseItemsRepository,
  ) {}

  @post('/purchase-items')
  @response(200, {
    description: 'PurchaseItems model instance',
    content: {'application/json': {schema: getModelSchemaRef(PurchaseItems)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PurchaseItems, {
            title: 'NewPurchaseItems',
            
          }),
        },
      },
    })
    purchaseItems: PurchaseItems,
  ): Promise<PurchaseItems> {
    return this.purchaseItemsRepository.create(purchaseItems);
  }

  @get('/purchase-items/count')
  @response(200, {
    description: 'PurchaseItems model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PurchaseItems) where?: Where<PurchaseItems>,
  ): Promise<Count> {
    return this.purchaseItemsRepository.count(where);
  }

  @get('/purchase-items')
  @response(200, {
    description: 'Array of PurchaseItems model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PurchaseItems, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PurchaseItems) filter?: Filter<PurchaseItems>,
  ): Promise<PurchaseItems[]> {
    return this.purchaseItemsRepository.find(filter);
  }

  @patch('/purchase-items')
  @response(200, {
    description: 'PurchaseItems PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PurchaseItems, {partial: true}),
        },
      },
    })
    purchaseItems: PurchaseItems,
    @param.where(PurchaseItems) where?: Where<PurchaseItems>,
  ): Promise<Count> {
    return this.purchaseItemsRepository.updateAll(purchaseItems, where);
  }

  @get('/purchase-items/{id}')
  @response(200, {
    description: 'PurchaseItems model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PurchaseItems, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PurchaseItems, {exclude: 'where'}) filter?: FilterExcludingWhere<PurchaseItems>
  ): Promise<PurchaseItems> {
    return this.purchaseItemsRepository.findById(id, filter);
  }

  @patch('/purchase-items/{id}')
  @response(204, {
    description: 'PurchaseItems PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PurchaseItems, {partial: true}),
        },
      },
    })
    purchaseItems: PurchaseItems,
  ): Promise<void> {
    await this.purchaseItemsRepository.updateById(id, purchaseItems);
  }

  @put('/purchase-items/{id}')
  @response(204, {
    description: 'PurchaseItems PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() purchaseItems: PurchaseItems,
  ): Promise<void> {
    await this.purchaseItemsRepository.replaceById(id, purchaseItems);
  }

  @del('/purchase-items/{id}')
  @response(204, {
    description: 'PurchaseItems DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.purchaseItemsRepository.deleteById(id);
  }
}
