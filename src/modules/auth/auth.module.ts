import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { KeycloakService } from './keycloak.service';
import { AuthGuard } from "../../core/guards/auth.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import TokenEntity from "./entities/token.entity";
import { PiModule } from "../pi/pi.module";

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([TokenEntity]), PiModule],
  controllers: [AuthController],
  providers: [AuthService, KeycloakService, JwtStrategy, AuthGuard],
  exports: [KeycloakService, AuthService]
})
export class AuthModule {}
