import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Owner, OwnerRelations} from '../models';

export class OwnerRepository extends DefaultCrudRepository<
  Owner,
  typeof Owner.prototype.id,
  OwnerRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Owner, dataSource);
  }
}
