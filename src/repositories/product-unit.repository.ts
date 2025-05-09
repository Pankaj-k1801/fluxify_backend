import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductUnit, ProductUnitRelations} from '../models';

export class ProductUnitRepository extends DefaultCrudRepository<
  ProductUnit,
  typeof ProductUnit.prototype.id,
  ProductUnitRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(ProductUnit, dataSource);
  }
}
