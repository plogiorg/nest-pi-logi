import * as Joi from 'joi';
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
    KEYCLOAK_BASE_URL:Joi.string().required(),
    KEYCLOAK_REALM:Joi.string().required(),
    KEYCLOAK_CLIENT_ID:Joi.string().required(),
    KEYCLOAK_CLIENT_SECRET:Joi.string().required(),
});
