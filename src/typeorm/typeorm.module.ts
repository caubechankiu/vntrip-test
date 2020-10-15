import { Global, DynamicModule } from '@nestjs/common';
import * as repositories from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
export class TypeOrmRepositoriesModule {
  public static register(): DynamicModule {
    const typeormModule = TypeOrmModule.forFeature(Object.values(repositories));
    return {
      module: TypeOrmRepositoriesModule,
      imports: [typeormModule],
      providers: typeormModule.providers,
      exports: typeormModule.exports,
    };
  }
}
