import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Session, SessionRelations} from '../models';

export class SessionRepository extends DefaultCrudRepository<
  Session,
  typeof Session.prototype.id,
  SessionRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Session, dataSource);
  }
}
