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
import {ProductUnit} from '../models';
import {ProductUnitRepository} from '../repositories';

@authenticate('session')
export class ProductUnitController {
  constructor(
    @repository(ProductUnitRepository)
    public productUnitRepository: ProductUnitRepository,
  ) { }

  @post('/product-units')
  @response(200, {
    description: 'ProductUnit model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductUnit)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductUnit, {
            title: 'NewProductUnit',

          }),
        },
      },
    })
    productUnit: ProductUnit,
  ): Promise<ProductUnit> {
    return this.productUnitRepository.create(productUnit);
  }

  @get('/product-units/count')
  @response(200, {
    description: 'ProductUnit model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductUnit) where?: Where<ProductUnit>,
  ): Promise<Count> {
    return this.productUnitRepository.count(where);
  }

  @get('/product-units')
  @response(200, {
    description: 'Array of ProductUnit model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductUnit, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductUnit) filter?: Filter<ProductUnit>,
  ): Promise<ProductUnit[]> {
    return this.productUnitRepository.find(filter);
  }

  @patch('/product-units')
  @response(200, {
    description: 'ProductUnit PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductUnit, {partial: true}),
        },
      },
    })
    productUnit: ProductUnit,
    @param.where(ProductUnit) where?: Where<ProductUnit>,
  ): Promise<Count> {
    return this.productUnitRepository.updateAll(productUnit, where);
  }

  @get('/product-units/{id}')
  @response(200, {
    description: 'ProductUnit model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductUnit, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProductUnit, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductUnit>
  ): Promise<ProductUnit> {
    return this.productUnitRepository.findById(id, filter);
  }

  @patch('/product-units/{id}')
  @response(204, {
    description: 'ProductUnit PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductUnit, {partial: true}),
        },
      },
    })
    productUnit: ProductUnit,
  ): Promise<void> {
    await this.productUnitRepository.updateById(id, productUnit);
  }

  @put('/product-units/{id}')
  @response(204, {
    description: 'ProductUnit PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() productUnit: ProductUnit,
  ): Promise<void> {
    await this.productUnitRepository.replaceById(id, productUnit);
  }

  @del('/product-units/{id}')
  @response(204, {
    description: 'ProductUnit DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productUnitRepository.deleteById(id);
  }
}
