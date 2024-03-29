import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { config } from "./core/database/config";
import HttpExceptionFilter from "./core/exceptions/filter";
import { ConfigModule } from "@nestjs/config";
import { configSchema } from "./config/enviroment-validation-schema";
import { RequestLoggerMiddleware } from "./core/middlewares/request-logger.middleware";
import ServiceModule from "./modules/services/service.module";
import {AuthModule} from "./modules/auth/auth.module";

const CUSTOM_MODULES = [ServiceModule, AuthModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      validationSchema: configSchema,
      validationOptions: {
        abortEarly: false,
        allowUnknown: false
      }
    }),
    TypeOrmModule.forRoot(config as TypeOrmModuleOptions),
    ...CUSTOM_MODULES,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
