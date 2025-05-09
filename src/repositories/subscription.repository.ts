import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Subscription, SubscriptionRelations} from '../models';

export class SubscriptionRepository extends DefaultCrudRepository<
  Subscription,
  typeof Subscription.prototype.id,
  SubscriptionRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Subscription, dataSource);
  }
}
