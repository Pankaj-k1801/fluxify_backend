import {
  AuthenticationStrategy,
} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors, Request, RestBindings} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {SessionRepository} from '../repositories';

export class SessionStrategy implements AuthenticationStrategy {
  name = 'session';

  constructor(
    @repository(SessionRepository)
    public sessionRepository: SessionRepository,

    @inject(RestBindings.Http.REQUEST) private request: Request,
  ) { }

  async authenticate(): Promise<UserProfile | undefined> {
    const authHeader = this.request.headers['authorization'];
    if (!authHeader) throw new HttpErrors.Unauthorized('Authorization header missing');

    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) throw new HttpErrors.Unauthorized('Token missing');

    const session = await this.sessionRepository.findOne({
      where: {token: token},
    });
    if (!session) throw new HttpErrors.Unauthorized('Invalid session');

    if (new Date(session.expiresAt) < new Date()) {
      throw new HttpErrors.Unauthorized('Session expired');
    }

    // Return user profile
    return {
      [securityId]: session.userId,
      name: session.userId,
    };
  }
}
