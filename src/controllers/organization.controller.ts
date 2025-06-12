import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
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
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {AddOrganizationRequest} from '../dtos/organization.dto';
import {Organization} from '../models';
import {OrganizationRepository} from '../repositories';
import {OrganizationService} from '../services';

@authenticate('session')
export class OrganizationController {
  constructor(
    @repository(OrganizationRepository)
    public organizationRepository: OrganizationRepository,

    @service(OrganizationService)
    private organizationService: OrganizationService,
  ) { }

  @post('/organizations')
  @response(200, {
    description: 'Organization model instance',
    content: {'application/json': {schema: getModelSchemaRef(Organization)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Organization, {
            title: 'NewOrganization',

          }),
        },
      },
    })
    organization: Organization,
  ): Promise<Organization> {
    return this.organizationRepository.create(organization);
  }

  @get('/organizations/count')
  @response(200, {
    description: 'Organization model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Organization) where?: Where<Organization>,
  ): Promise<Count> {
    return this.organizationRepository.count(where);
  }

  @get('/organizations')
  @response(200, {
    description: 'Array of Organization model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Organization, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Organization) filter?: Filter<Organization>,
  ): Promise<Organization[]> {
    return this.organizationRepository.find(filter);
  }

  @patch('/organizations')
  @response(200, {
    description: 'Organization PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Organization, {partial: true}),
        },
      },
    })
    organization: Organization,
    @param.where(Organization) where?: Where<Organization>,
  ): Promise<Count> {
    return this.organizationRepository.updateAll(organization, where);
  }

  @get('/organizations/{id}')
  @response(200, {
    description: 'Organization model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Organization, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Organization, {exclude: 'where'}) filter?: FilterExcludingWhere<Organization>
  ): Promise<Organization> {
    return this.organizationRepository.findById(id, filter);
  }

  @patch('/organizations/{id}')
  @response(204, {
    description: 'Organization PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Organization, {partial: true}),
        },
      },
    })
    organization: Organization,
  ): Promise<void> {
    await this.organizationRepository.updateById(id, organization);
  }

  @put('/organizations/{id}')
  @response(204, {
    description: 'Organization PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() organization: Organization,
  ): Promise<void> {
    await this.organizationRepository.replaceById(id, organization);
  }

  @del('/organizations/{id}')
  @response(204, {
    description: 'Organization DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.organizationRepository.deleteById(id);
  }

  /* Find Organization exists or not */
  /* Runs Before Login to Redirect Logged In user to Desginated Page in Client Side */
  @authenticate.skip()
  @post('/organizations/is-registered')
  @response(200, {
    description: 'Check if organization is registered for user',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            isRegistered: {type: 'boolean'},
          },
        },
      },
    },
  })
  async findIsOrganizationRegistered(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['userId'],
            properties: {
              userId: {type: 'string'},
            },
          },
        },
      },
    })
    body: {userId: string},
  ): Promise<{isRegistered: boolean}> {
    const {userId} = body;
    if (!userId) {
      throw new HttpErrors.BadRequest('userId is required');
    }
    return this.organizationService.findIsOrganizationRegistered(userId);
  }

  @post('/organization/add', {
    responses: {
      '200': {
        description: 'New Organization Created',
        content: {'application/json': {schema: {'x-ts-type': Organization}}},
      },
    },
  })
  async addOrganization(
    @requestBody({
      content: {
        'application/json': {
          schema: {'x-ts-type': AddOrganizationRequest},
        },
      },
    })
    body: AddOrganizationRequest,
  ): Promise<Organization> {
    return this.organizationService.addOrganization(body);
  }

}
