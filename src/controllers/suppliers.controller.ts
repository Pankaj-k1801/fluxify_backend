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
import {Suppliers} from '../models';
import {SuppliersRepository} from '../repositories';

export class SuppliersController {
  constructor(
    @repository(SuppliersRepository)
    public suppliersRepository : SuppliersRepository,
  ) {}

  @post('/suppliers')
  @response(200, {
    description: 'Suppliers model instance',
    content: {'application/json': {schema: getModelSchemaRef(Suppliers)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Suppliers, {
            title: 'NewSuppliers',
            
          }),
        },
      },
    })
    suppliers: Suppliers,
  ): Promise<Suppliers> {
    return this.suppliersRepository.create(suppliers);
  }

  @get('/suppliers/count')
  @response(200, {
    description: 'Suppliers model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Suppliers) where?: Where<Suppliers>,
  ): Promise<Count> {
    return this.suppliersRepository.count(where);
  }

  @get('/suppliers')
  @response(200, {
    description: 'Array of Suppliers model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Suppliers, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Suppliers) filter?: Filter<Suppliers>,
  ): Promise<Suppliers[]> {
    return this.suppliersRepository.find(filter);
  }

  @patch('/suppliers')
  @response(200, {
    description: 'Suppliers PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Suppliers, {partial: true}),
        },
      },
    })
    suppliers: Suppliers,
    @param.where(Suppliers) where?: Where<Suppliers>,
  ): Promise<Count> {
    return this.suppliersRepository.updateAll(suppliers, where);
  }

  @get('/suppliers/{id}')
  @response(200, {
    description: 'Suppliers model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Suppliers, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Suppliers, {exclude: 'where'}) filter?: FilterExcludingWhere<Suppliers>
  ): Promise<Suppliers> {
    return this.suppliersRepository.findById(id, filter);
  }

  @patch('/suppliers/{id}')
  @response(204, {
    description: 'Suppliers PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Suppliers, {partial: true}),
        },
      },
    })
    suppliers: Suppliers,
  ): Promise<void> {
    await this.suppliersRepository.updateById(id, suppliers);
  }

  @put('/suppliers/{id}')
  @response(204, {
    description: 'Suppliers PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() suppliers: Suppliers,
  ): Promise<void> {
    await this.suppliersRepository.replaceById(id, suppliers);
  }

  @del('/suppliers/{id}')
  @response(204, {
    description: 'Suppliers DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.suppliersRepository.deleteById(id);
  }
}
