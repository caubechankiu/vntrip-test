import * as ormconfig from './ormconfig';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmRepositoriesModule } from './typeorm/typeorm.module';

// Controller Modules
import { ProductModule } from './components/product/product.module';
import { OrderModule } from './components/order/order.module';

// Config
import config from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmRepositoriesModule.register(),
    ProductModule,
    OrderModule,
  ],
})
export class AppModule { }
