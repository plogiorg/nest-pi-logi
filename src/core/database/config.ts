import { config as initDotEnv } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import CONFIG from '../../config';
initDotEnv();

const config = {
  type: 'postgres',
  host: CONFIG.DATABASE.HOST,
  port: CONFIG.DATABASE.PORT,
  username: CONFIG.DATABASE.USER,
  password: CONFIG.DATABASE.PASSWORD,
  database: CONFIG.DATABASE.NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
};

const AppDataSource = new DataSource(config as DataSourceOptions);

export default AppDataSource;
export { config };
