import {injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {SessionRepository} from '../repositories';

@injectable()
export class SessionCleanupService {
  constructor(
    @repository(SessionRepository)
    private sessionRepo: SessionRepository,
  ) { }

  async cleanExpiredSessions(): Promise<void> {
    const now = new Date();
    await this.sessionRepo.deleteAll({expiresAt: {lt: now}});
    console.log(`[SessionCleanupService] Expired sessions cleaned at ${now.toISOString()}`);
  }
}
