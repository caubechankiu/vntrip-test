import * as ormconfig from './ormconfig';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmRepositoriesModule } from './typeorm/typeorm.module';

// Controller Modules
import { ProductModule } from './components/products/product.module';

// Config
import config from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmRepositoriesModule.register(),
    ProductModule,
  ],
})
export class AppModule { }
