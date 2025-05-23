import {Application} from '@loopback/core';
import cron from 'node-cron';
import {SessionCleanupService} from '../services/session-cleanup.service';

export function setupSessionCleanupCron(app: Application) {
  cron.schedule('0 * * * *', async () => {
    try {
      const cleanupService = await app.get<SessionCleanupService>('services.SessionCleanupService');
      await cleanupService.cleanExpiredSessions();
    } catch (error) {
      console.error('[SessionCleanupCron] Error cleaning sessions:', error);
    }
  });

  console.log('[SessionCleanupCron] Scheduled to run every hour.');
}
