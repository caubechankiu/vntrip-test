import * as _ from 'lodash';
import dotenv = require('dotenv');

dotenv.config();

const config: {
  PORT: string,
  TOKEN: string,
  POSTGRES_DB: string,
  POSTGRES_HOST: string,
  POSTGRES_PORT: string,
  POSTGRES_USER: string,
  POSTGRES_PASSWORD: string,
} = Object.keys(process.env).reduce(
  (result, path) => _.set(result, path, process.env[path]),
  {},
) as any;

export default config;
