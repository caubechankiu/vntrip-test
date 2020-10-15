import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PaginationMiddleware } from '../../common/middlewares';
import * as CommandHandlers from './commands/handlers';
import * as QueryHandlers from './queries/handlers';
import { ProductController } from './product.controller';

@Module({
  imports: [CqrsModule],
  controllers: [ProductController],
  providers: [
    ...Object.values(CommandHandlers),
    ...Object.values(QueryHandlers),
  ],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware({
        defaultSort: { field: 'id', order: 'DESC' },
        sortKeys: ['id'],
      }))
      .forRoutes(
        { path: '/api/product', method: RequestMethod.GET },
      );
  }
}
