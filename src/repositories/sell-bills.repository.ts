import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {SellBills, SellBillsRelations} from '../models';

export class SellBillsRepository extends DefaultCrudRepository<
  SellBills,
  typeof SellBills.prototype.id,
  SellBillsRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(SellBills, dataSource);
  }
}
