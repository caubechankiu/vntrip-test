import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PaginationMiddleware } from '../../common/middlewares';
import * as CommandHandlers from './commands/handlers';
import * as QueryHandlers from './queries/handlers';
import { OrderController } from './order.controller';

@Module({
  imports: [CqrsModule],
  controllers: [OrderController],
  providers: [
    ...Object.values(CommandHandlers),
    ...Object.values(QueryHandlers),
  ],
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware({
        defaultSort: { field: 'id', order: 'DESC' },
        sortKeys: ['id'],
      }))
      .forRoutes(
        { path: '/api/order', method: RequestMethod.GET },
      );
  }
}
