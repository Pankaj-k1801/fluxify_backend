import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {BranchUnit, BranchUnitRelations} from '../models';

export class BranchUnitRepository extends DefaultCrudRepository<
  BranchUnit,
  typeof BranchUnit.prototype.id,
  BranchUnitRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(BranchUnit, dataSource);
  }
}
