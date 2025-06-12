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
import {ProductType} from '../models';
import {ProductTypeRepository} from '../repositories';

@authenticate('session')
export class ProductTypeController {
  constructor(
    @repository(ProductTypeRepository)
    public productTypeRepository: ProductTypeRepository,
  ) { }

  @post('/product-types')
  @response(200, {
    description: 'ProductType model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductType, {
            title: 'NewProductType',

          }),
        },
      },
    })
    productType: ProductType,
  ): Promise<ProductType> {
    return this.productTypeRepository.create(productType);
  }

  @get('/product-types/count')
  @response(200, {
    description: 'ProductType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductType) where?: Where<ProductType>,
  ): Promise<Count> {
    return this.productTypeRepository.count(where);
  }

  @get('/product-types')
  @response(200, {
    description: 'Array of ProductType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductType) filter?: Filter<ProductType>,
  ): Promise<ProductType[]> {
    return this.productTypeRepository.find(filter);
  }

  @patch('/product-types')
  @response(200, {
    description: 'ProductType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductType, {partial: true}),
        },
      },
    })
    productType: ProductType,
    @param.where(ProductType) where?: Where<ProductType>,
  ): Promise<Count> {
    return this.productTypeRepository.updateAll(productType, where);
  }

  @get('/product-types/{id}')
  @response(200, {
    description: 'ProductType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProductType, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductType>
  ): Promise<ProductType> {
    return this.productTypeRepository.findById(id, filter);
  }

  @patch('/product-types/{id}')
  @response(204, {
    description: 'ProductType PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductType, {partial: true}),
        },
      },
    })
    productType: ProductType,
  ): Promise<void> {
    await this.productTypeRepository.updateById(id, productType);
  }

  @put('/product-types/{id}')
  @response(204, {
    description: 'ProductType PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() productType: ProductType,
  ): Promise<void> {
    await this.productTypeRepository.replaceById(id, productType);
  }

  @del('/product-types/{id}')
  @response(204, {
    description: 'ProductType DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productTypeRepository.deleteById(id);
  }
}
