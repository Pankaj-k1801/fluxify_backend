import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Privileges, PrivilegesRelations} from '../models';

export class PrivilegesRepository extends DefaultCrudRepository<
  Privileges,
  typeof Privileges.prototype.id,
  PrivilegesRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Privileges, dataSource);
  }
}
