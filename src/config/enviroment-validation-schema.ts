import * as Joi from "joi";
import process from "process";

export const configSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  APP_NAME: Joi.string().required(),
  APP_PORT: Joi.number().required(),
  APP_VERSION: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  KEYCLOAK_BASE_URL: Joi.string().required(),
  KEYCLOAK_REALM: Joi.string().required(),
  KEYCLOAK_CLIENT_ID: Joi.string().required(),
  KEYCLOAK_CLIENT_SECRET: Joi.string().required(),
  KEYCLOAK_PROVIDER_REALM: Joi.string().required(),
  KEYCLOAK_PROVIDER_CLIENT_ID: Joi.string().required(),
  KEYCLOAK_PROVIDER_CLIENT_SECRET: Joi.string().required(),
  KEYCLOAK_USER_REALM: Joi.string().required(),
  KEYCLOAK_USER_CLIENT_ID: Joi.string().required(),
  KEYCLOAK_USER_CLIENT_SECRET: Joi.string().required(),
  KEYCLOAK_PROVIDER_ADMIN_CLIENT_SECRET: Joi.string().required(),
  KEYCLOAK_USER_ADMIN_CLIENT_SECRET: Joi.string().required(),
  PI_BASE_URL: Joi.string().required(),
  PI_API_KEY: Joi.string().required()
});
