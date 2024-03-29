import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { KeycloakService } from "../../modules/auth/keycloak.service";
import { AuthType, UserType } from "../../modules/auth/types/AuthTypes";
import { PiService } from "../../modules/pi/pi.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private keycloakService: KeycloakService, private piService:PiService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userType = request.headers['x-user-type'] as UserType;
    const loginType = request.headers['x-auth-type'] as AuthType;
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      switch (loginType) {
        case AuthType.PI:{
          request['user'] = await this.piService.getUserInfo(token);
          request['token'] = token
          break
        }
        case AuthType.STANDARD:{
          request['user'] = await this.keycloakService.getUserInfo(token, userType);
          request['token'] = token
          break
        }
        default: {
          // TODO: remove this default block once applied across all the frontends
          request['user'] = await this.keycloakService.getUserInfo(token, userType);
          request['token'] = token
          break
        }
      }

    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}