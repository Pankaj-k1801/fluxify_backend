import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Purchase, PurchaseRelations} from '../models';

export class PurchaseRepository extends DefaultCrudRepository<
  Purchase,
  typeof Purchase.prototype.id,
  PurchaseRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Purchase, dataSource);
  }
}
