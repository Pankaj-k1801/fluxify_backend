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
import {BranchUnit} from '../models';
import {BranchUnitRepository} from '../repositories';

export class BranchUnitControllerController {
  constructor(
    @repository(BranchUnitRepository)
    public branchUnitRepository : BranchUnitRepository,
  ) {}

  @post('/branch-units')
  @response(200, {
    description: 'BranchUnit model instance',
    content: {'application/json': {schema: getModelSchemaRef(BranchUnit)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BranchUnit, {
            title: 'NewBranchUnit',
            
          }),
        },
      },
    })
    branchUnit: BranchUnit,
  ): Promise<BranchUnit> {
    return this.branchUnitRepository.create(branchUnit);
  }

  @get('/branch-units/count')
  @response(200, {
    description: 'BranchUnit model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BranchUnit) where?: Where<BranchUnit>,
  ): Promise<Count> {
    return this.branchUnitRepository.count(where);
  }

  @get('/branch-units')
  @response(200, {
    description: 'Array of BranchUnit model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BranchUnit, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BranchUnit) filter?: Filter<BranchUnit>,
  ): Promise<BranchUnit[]> {
    return this.branchUnitRepository.find(filter);
  }

  @patch('/branch-units')
  @response(200, {
    description: 'BranchUnit PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BranchUnit, {partial: true}),
        },
      },
    })
    branchUnit: BranchUnit,
    @param.where(BranchUnit) where?: Where<BranchUnit>,
  ): Promise<Count> {
    return this.branchUnitRepository.updateAll(branchUnit, where);
  }

  @get('/branch-units/{id}')
  @response(200, {
    description: 'BranchUnit model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BranchUnit, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(BranchUnit, {exclude: 'where'}) filter?: FilterExcludingWhere<BranchUnit>
  ): Promise<BranchUnit> {
    return this.branchUnitRepository.findById(id, filter);
  }

  @patch('/branch-units/{id}')
  @response(204, {
    description: 'BranchUnit PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BranchUnit, {partial: true}),
        },
      },
    })
    branchUnit: BranchUnit,
  ): Promise<void> {
    await this.branchUnitRepository.updateById(id, branchUnit);
  }

  @put('/branch-units/{id}')
  @response(204, {
    description: 'BranchUnit PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() branchUnit: BranchUnit,
  ): Promise<void> {
    await this.branchUnitRepository.replaceById(id, branchUnit);
  }

  @del('/branch-units/{id}')
  @response(204, {
    description: 'BranchUnit DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.branchUnitRepository.deleteById(id);
  }
}
