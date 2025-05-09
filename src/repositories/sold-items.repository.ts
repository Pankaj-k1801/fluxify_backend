import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {SoldItems, SoldItemsRelations} from '../models';

export class SoldItemsRepository extends DefaultCrudRepository<
  SoldItems,
  typeof SoldItems.prototype.id,
  SoldItemsRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(SoldItems, dataSource);
  }
}
