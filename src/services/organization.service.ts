import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {OrganizationRepository, SessionRepository, UsersRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class OrganizationService {
  constructor(/* Add @inject to inject parameters */

    @repository(UsersRepository)
    private usersRepository: UsersRepository,

    @repository(SessionRepository)
    private sessionRepository: SessionRepository,

    @repository(OrganizationRepository)
    private organizationRepository: OrganizationRepository,
  ) { }

  /*
   * Add service methods here
   */

  /* Find Registred Organization */
  async findIsOrganizationRegistered(userId: string): Promise<{isRegistered: boolean}> {
    // 1. Find the session by userId
    const session = await this.sessionRepository.findOne({where: {userId}});
    if (!session || !session.orgId) {
      // If session or orgId not found, update and return false
      await this.usersRepository.updateById(userId, {isRegistered: false});
      return {isRegistered: false};
    }

    // 2. Find organization by orgId from session
    const organization = await this.organizationRepository.findOne({where: {orgId: session.orgId}});

    // 3. Update isRegistered based on whether organization exists
    const isRegistered = !!organization;
    await this.usersRepository.updateById(userId, {isRegistered});

    // 4. Return the result
    return {isRegistered};
  }

}
