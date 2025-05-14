import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {SetupRepository} from '../repositories';

@injectable({scope: BindingScope.SINGLETON})
export class UniqueIdService {
  constructor(
    @repository(SetupRepository)
    private setupRepository: SetupRepository,
  ) { }

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
}
