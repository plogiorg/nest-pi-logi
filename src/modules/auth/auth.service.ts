import { Injectable, Logger } from '@nestjs/common';

import { KeycloakService } from './keycloak.service';
import { KeycloakSignupRequestDTO, LoginRequestDTO, PiLoginRequestDTO, SignupRequestDTO } from "./dto/request";
import { UserCredentials, UserType } from "./types/AuthTypes";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import TokenEntity from "./entities/token.entity";
import { PiService } from "../pi/pi.service";
import { UnauthorizedException } from "../../core/exceptions";

type LoginResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
};

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly keycloakService: KeycloakService, private readonly _piService: PiService,   @InjectRepository(TokenEntity)
  private _tokenRepo: Repository<TokenEntity>,) {}

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

  async piNetworkLogin(data:PiLoginRequestDTO){
    try {
     const res = await this._piService.getUserInfo(data.accessToken)
      console.log({res});
    } catch (e) {
      console.log({e});
      throw new UnauthorizedException("invalid access token")
    }
     await this._tokenRepo.upsert({
       access_token: data.accessToken,
       username: data.user.username,
       userType: data.type,
       userId:data.user.uid
     }, {conflictPaths: { userId: true } })
    return this._tokenRepo.findOne({where: {userId:data.user.uid}})
  }

  async signup(data:SignupRequestDTO, type:UserType) {
    const credentials :UserCredentials[] = [{
      type:"password",
      value:data.password
    }]
    const attributes :any = {phone: data.phone, country: data.country}
    //TODO: refactor this mess
    delete data.password
    delete data.phone
    delete data.country
    const keycloakSignupRequestDTO = new KeycloakSignupRequestDTO({...data})
    keycloakSignupRequestDTO.credentials = credentials
    keycloakSignupRequestDTO.attributes = attributes
    await this.keycloakService.signup(keycloakSignupRequestDTO, type).catch((error) => {
      console.log(error.response);
      throw new UnauthorizedException(error.response);
    });
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

  async getUserDetail(id: string, type:UserType) {
    return this.keycloakService.getUserDetail(id, type).catch(error => {
      console.log({error});
      throw new UnauthorizedException();
    });
  }
}
