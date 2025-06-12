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
import {SellBills} from '../models';
import {SellBillsRepository} from '../repositories';

@authenticate('session')
export class SellBillsController {
  constructor(
    @repository(SellBillsRepository)
    public sellBillsRepository: SellBillsRepository,
  ) { }

  @post('/sell-bills')
  @response(200, {
    description: 'SellBills model instance',
    content: {'application/json': {schema: getModelSchemaRef(SellBills)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellBills, {
            title: 'NewSellBills',

          }),
        },
      },
    })
    sellBills: SellBills,
  ): Promise<SellBills> {
    return this.sellBillsRepository.create(sellBills);
  }

  @get('/sell-bills/count')
  @response(200, {
    description: 'SellBills model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SellBills) where?: Where<SellBills>,
  ): Promise<Count> {
    return this.sellBillsRepository.count(where);
  }

  @get('/sell-bills')
  @response(200, {
    description: 'Array of SellBills model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SellBills, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SellBills) filter?: Filter<SellBills>,
  ): Promise<SellBills[]> {
    return this.sellBillsRepository.find(filter);
  }

  @patch('/sell-bills')
  @response(200, {
    description: 'SellBills PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellBills, {partial: true}),
        },
      },
    })
    sellBills: SellBills,
    @param.where(SellBills) where?: Where<SellBills>,
  ): Promise<Count> {
    return this.sellBillsRepository.updateAll(sellBills, where);
  }

  @get('/sell-bills/{id}')
  @response(200, {
    description: 'SellBills model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SellBills, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SellBills, {exclude: 'where'}) filter?: FilterExcludingWhere<SellBills>
  ): Promise<SellBills> {
    return this.sellBillsRepository.findById(id, filter);
  }

  @patch('/sell-bills/{id}')
  @response(204, {
    description: 'SellBills PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellBills, {partial: true}),
        },
      },
    })
    sellBills: SellBills,
  ): Promise<void> {
    await this.sellBillsRepository.updateById(id, sellBills);
  }

  @put('/sell-bills/{id}')
  @response(204, {
    description: 'SellBills PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sellBills: SellBills,
  ): Promise<void> {
    await this.sellBillsRepository.replaceById(id, sellBills);
  }

  @del('/sell-bills/{id}')
  @response(204, {
    description: 'SellBills DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sellBillsRepository.deleteById(id);
  }
}
