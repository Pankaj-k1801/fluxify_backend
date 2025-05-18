import {inject} from '@loopback/core';
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
import {Login, LogoutDto, Signup} from '../dtos/user.dto';
import {Users} from '../models';
import {UsersRepository} from '../repositories';
import {UserService} from '../services';

export class UsersController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @inject('services.UserService')
    private userService: UserService,
  ) { }

  @post('/users')
  @response(200, {
    description: 'Users model instance',
    content: {'application/json': {schema: getModelSchemaRef(Users)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsers',

          }),
        },
      },
    })
    users: Users,
  ): Promise<Users> {
    return this.usersRepository.create(users);
  }

  @get('/users/count')
  @response(200, {
    description: 'Users model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Users) where?: Where<Users>,
  ): Promise<Count> {
    return this.usersRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of Users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Users, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Users) filter?: Filter<Users>,
  ): Promise<Users[]> {
    return this.usersRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'Users PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
    @param.where(Users) where?: Where<Users>,
  ): Promise<Count> {
    return this.usersRepository.updateAll(users, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'Users model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Users, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Users, {exclude: 'where'}) filter?: FilterExcludingWhere<Users>
  ): Promise<Users> {
    return this.usersRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'Users PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
  ): Promise<void> {
    await this.usersRepository.updateById(id, users);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'Users PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() users: Users,
  ): Promise<void> {
    await this.usersRepository.replaceById(id, users);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'Users DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usersRepository.deleteById(id);
  }

  @post('/signup')
  @response(200, {
    description: 'Signup new user',
    content: {'application/json': {schema: getModelSchemaRef(Users)}},
  })
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Signup),
        },
      },
    })
    signupData: Signup,
  ): Promise<Users> {
    return this.userService.signup(signupData);
  }

  @post('/login')
  @response(200, {
    description: 'Login existing user',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            token: {type: 'string'},
            user: getModelSchemaRef(Users),
          },
        },
      },
    },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Login),
        },
      },
    })
    loginData: Login,
  ): Promise<{token: string; user: Users}> {
    return this.userService.login(loginData);
  }

  @post('/logout', {
    responses: {
      '200': {
        description: 'Logout  existing user',
        content: {'application/json': {schema: {type: 'object'}}},
      },
    },
  })
  async logout(
    @requestBody() logoutDto: LogoutDto,
  ): Promise<{message: string}> {
    const {userId, token} = logoutDto;

    if (!userId || !token) {
      throw new HttpErrors.BadRequest('userId and token are required');
    }

    return this.userService.logout(userId, token);
  }

}

