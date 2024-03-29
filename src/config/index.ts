import { config } from 'dotenv';
config();
import databaseConfig from './database.config';
import loggingConfig from './logging.config';
import keycloakConfig from './keycloak.config';
import { ConfigDTO } from './dto/config.dto';

const CONFIG = {
  ENV: {
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
  },
  APP: {
    NAME: process.env.APP_NAME || 'NestJS API',
    VERSION: process.env.APP_VERSION || '1.0',
    PORT: Number(process.env.APP_PORT) || 8000,
  },
  DATABASE: { ...databaseConfig },
  LOGGING: { ...loggingConfig },
  KEYCLOAK: {... keycloakConfig},
  PI: {
    API_KEY: process.env.PI_API_KEY,
    BASE_URL: process.env.PI_BASE_URL
  }
} as ConfigDTO;

export default CONFIG;
