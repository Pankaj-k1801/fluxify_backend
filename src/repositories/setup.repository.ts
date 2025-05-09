import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Setup, SetupRelations} from '../models';

export class SetupRepository extends DefaultCrudRepository<
  Setup,
  typeof Setup.prototype.id,
  SetupRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Setup, dataSource);
  }
}
