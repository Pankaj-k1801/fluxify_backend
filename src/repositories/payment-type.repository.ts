import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {PaymentType, PaymentTypeRelations} from '../models';

export class PaymentTypeRepository extends DefaultCrudRepository<
  PaymentType,
  typeof PaymentType.prototype.id,
  PaymentTypeRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(PaymentType, dataSource);
  }
}
