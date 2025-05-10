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
import {PaymentType} from '../models';
import {PaymentTypeRepository} from '../repositories';

export class PaymentTypeController {
  constructor(
    @repository(PaymentTypeRepository)
    public paymentTypeRepository : PaymentTypeRepository,
  ) {}

  @post('/payment-types')
  @response(200, {
    description: 'PaymentType model instance',
    content: {'application/json': {schema: getModelSchemaRef(PaymentType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentType, {
            title: 'NewPaymentType',
            
          }),
        },
      },
    })
    paymentType: PaymentType,
  ): Promise<PaymentType> {
    return this.paymentTypeRepository.create(paymentType);
  }

  @get('/payment-types/count')
  @response(200, {
    description: 'PaymentType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PaymentType) where?: Where<PaymentType>,
  ): Promise<Count> {
    return this.paymentTypeRepository.count(where);
  }

  @get('/payment-types')
  @response(200, {
    description: 'Array of PaymentType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PaymentType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PaymentType) filter?: Filter<PaymentType>,
  ): Promise<PaymentType[]> {
    return this.paymentTypeRepository.find(filter);
  }

  @patch('/payment-types')
  @response(200, {
    description: 'PaymentType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentType, {partial: true}),
        },
      },
    })
    paymentType: PaymentType,
    @param.where(PaymentType) where?: Where<PaymentType>,
  ): Promise<Count> {
    return this.paymentTypeRepository.updateAll(paymentType, where);
  }

  @get('/payment-types/{id}')
  @response(200, {
    description: 'PaymentType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PaymentType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PaymentType, {exclude: 'where'}) filter?: FilterExcludingWhere<PaymentType>
  ): Promise<PaymentType> {
    return this.paymentTypeRepository.findById(id, filter);
  }

  @patch('/payment-types/{id}')
  @response(204, {
    description: 'PaymentType PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentType, {partial: true}),
        },
      },
    })
    paymentType: PaymentType,
  ): Promise<void> {
    await this.paymentTypeRepository.updateById(id, paymentType);
  }

  @put('/payment-types/{id}')
  @response(204, {
    description: 'PaymentType PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() paymentType: PaymentType,
  ): Promise<void> {
    await this.paymentTypeRepository.replaceById(id, paymentType);
  }

  @del('/payment-types/{id}')
  @response(204, {
    description: 'PaymentType DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.paymentTypeRepository.deleteById(id);
  }
}
