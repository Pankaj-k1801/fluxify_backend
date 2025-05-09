import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {PurchaseItems, PurchaseItemsRelations} from '../models';

export class PurchaseItemsRepository extends DefaultCrudRepository<
  PurchaseItems,
  typeof PurchaseItems.prototype.id,
  PurchaseItemsRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(PurchaseItems, dataSource);
  }
}
