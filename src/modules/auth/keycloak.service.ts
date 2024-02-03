import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import CONFIG from "../../config";

type LoginResponse = {
  access_token: string;
  scope: string;
  refresh_token: string;
  token_type: string;
  session_state: string;
  "not-before-policy": number;
  refresh_expires_in: number;
  expires_in: number;
};

type UserInfoResponse = {
  sub: string;
  email_verified: boolean;
  preferred_username: string;
};

type UserListResponse = {
  sub: string,
  createdTimestamp: number,
  username: string,
  name: string,
  type: string,
  enabled: boolean,
  email: boolean,
  phoneNumber: string,
  address: string,
  attributes: {
    phone: string[],
    country: string[],
    street: string[],
  },
};

@Injectable()
export class KeycloakService {
  private readonly baseURL: string;
  private readonly realm: string;
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor(
    private readonly httpService: HttpService,
  ) {
    this.baseURL = CONFIG.KEYCLOAK.BASE_URL;
    this.realm = CONFIG.KEYCLOAK.REALM;
    this.clientId = CONFIG.KEYCLOAK.CLIENT_ID;
    this.clientSecret = CONFIG.KEYCLOAK.CLIENT_SECRET;
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.baseURL}/realms/${this.realm}/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: "password",
          scope: "openid",
          username,
          password,
        }),
      ),
    );
    return data;

  }

  async signup(username: string, password: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.baseURL}/realms/${this.realm}/protocol/openid-connect/registrations`,
        {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          username,
          password,
          grant_type: "password",
        },
      ),
    );

    return data;
  }

  async getUserInfo(accessToken: string): Promise<UserInfoResponse> {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.baseURL}/realms/${this.realm}/protocol/openid-connect/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
    );
    console.log({ data });
    return data;
  }

  async getUsers(accessToken: string): Promise<UserListResponse[]> {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.baseURL}/admin/realms/${this.realm}/users`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
    );
    return data;
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.baseURL}/realms/${this.realm}/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      ),
    );

    return data;
  }


  async logout(refreshToken: string) {
    await firstValueFrom(
      this.httpService.post(
        `${this.baseURL}/realms/${this.realm}/protocol/openid-connect/logout`,
        new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: refreshToken,
        }),
      ),
    );
  }
}
