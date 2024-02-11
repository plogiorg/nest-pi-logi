import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { KeycloakService } from './keycloak.service';
import { LoginRequestDTO } from "./dto/request";
import { UserType } from "./types/AuthTypes";

type LoginResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
};

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly keycloakService: KeycloakService) {}

  async login(data:LoginRequestDTO): Promise<LoginResponse> {
    const { access_token, expires_in, refresh_token, refresh_expires_in } =
      await this.keycloakService.login(data.username, data.password, data.type).catch(({response}) => {
        throw new UnauthorizedException(response?.data?.error_description || "");
      });

    return {
      access_token,
      refresh_token,
      expires_in,
      refresh_expires_in,
    };
  }

  async getProfile(accessToken: string, type:UserType) {
    this.logger.log('Getting user profile...');
    return this.keycloakService.getUserInfo(accessToken, type).catch((error) => {
      throw new UnauthorizedException();
    });
  }

  async getUsers(accessToken: string) {
    this.logger.log('Getting user list...');
    const users = await this.keycloakService.getAllUsers(accessToken).catch((error) => {
      console.log({error});
      throw new UnauthorizedException();
    });
    return users.map((user =>({
      id: user.sub,
      username: user.username,
      name: user.name,
      email: user.email,
      type: user.type,
      active: user.enabled,
      phone: user.attributes?.phone?.[0] || '',
      country: user.attributes?.country?.[0] || '' ,
      street: user.attributes?.street?.[0] || ''
    })))
  }


  async refreshToken(refreshToken: string, type:UserType): Promise<LoginResponse> {
    const { access_token, expires_in, refresh_token, refresh_expires_in } =
      await this.keycloakService.refreshToken(refreshToken, type).catch(() => {
        throw new UnauthorizedException();
      });

    return {
      access_token,
      refresh_token,
      expires_in,
      refresh_expires_in,
    };
  }

  async logout(refreshToken: string, type:UserType) {
    await this.keycloakService.logout(refreshToken, type).catch(() => {
      throw new UnauthorizedException();
    });
  }
}
