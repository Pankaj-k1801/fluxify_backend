import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {OrganizationRepository, SetupRepository} from '../repositories';

@injectable({scope: BindingScope.SINGLETON})
export class UniqueIdService {
  constructor(
    @repository(SetupRepository)
    private setupRepository: SetupRepository,

    @repository(OrganizationRepository)
    private organizationRepository: OrganizationRepository,

  ) { }

  /* To Increment and Update User Id */
  async generateNextUserId(): Promise<string> {
    const setup = await this.setupRepository.findOne();
    if (!setup) throw new Error('Setup configuration not found');

    const prefix = 'user-';
    const currentId = parseInt(setup.nextUserId.replace(prefix, ''), 10);
    const newUserId = `${prefix}${currentId + 1}`;

    // update back
    await this.setupRepository.updateById(setup.id, {
      nextUserId: newUserId,
    });

    return setup.nextUserId; // return the one used before increment
  }

  /* To Increment and Update Organization Id */
  async generateNextOrgId(): Promise<string> {
    const setup = await this.setupRepository.findOne();
    if (!setup) throw new Error('Setup configuration not found');

    const prefix = 'org-';
    const currentId = parseInt(setup.nextOrgId.replace(prefix, ''), 10);
    const newOrgId = `${prefix}${currentId + 1}`;

    // update back
    await this.setupRepository.updateById(setup.id, {
      nextOrgId: newOrgId,
    });

    return setup.nextOrgId; // return the one used before increment
  }

  /* To Increment and Update Branch Id */
  async generateNextBranchId(orgId: string): Promise<string> {
    // 1. Find organization by orgId
    const organization = await this.organizationRepository.findOne({where: {orgId}});
    if (!organization) throw new Error(`Organization not found with orgId: ${orgId}`);

    const fullBranchId = organization.nextbranchId; // e.g., "org-1000-branch-1000"

    // 2. Extract current numeric branch number
    const parts = fullBranchId.split('-');
    const currentBranchNumber = parseInt(parts[3], 10); // "1000"

    const newBranchNumber = currentBranchNumber + 1;
    const newBranchId = `org-${orgId.split('-')[1]}-branch-${newBranchNumber}`;

    // 3. Update back into organization record
    await this.organizationRepository.updateAll(
      {nextbranchId: newBranchId},
      {orgId}
    );

    // 4. Return current value before incrementing
    return fullBranchId;
  }

}
