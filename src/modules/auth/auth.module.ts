import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { KeycloakService } from './keycloak.service';
import { AuthGuard } from "../../core/guards/auth.guard";

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService, KeycloakService, JwtStrategy, AuthGuard],
  exports: [KeycloakService]
})
export class AuthModule {}
