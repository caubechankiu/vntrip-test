import * as path from 'path';
import config from './config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product, Order } from './typeorm/entities';

const basename = path.basename(__dirname);

// Check typeORM documentation for more information.
const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  database: config.POSTGRES_DB,
  port: Number(config.POSTGRES_PORT),
  host: config.POSTGRES_HOST,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  entities: [Product, Order],
  keepConnectionAlive: true,

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: true,
  // logger: 'file',

  // allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev
  migrations: [basename + '/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: basename + '/migrations',
  },
};

export = ormConfig;
