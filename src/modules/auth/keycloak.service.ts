import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import CONFIG from "../../config";
import { LoginResponse, UserInfoResponse, UserListResponse, UserType } from "./types/AuthTypes";
import { KeycloakSignupRequestDTO } from "./dto/request";


@Injectable()
export class KeycloakService {
  private readonly baseURL: string;

  constructor(
    private readonly httpService: HttpService,
  ) {
    this.baseURL = CONFIG.KEYCLOAK.BASE_URL;
  }

  private getRealmConfiguration(type:UserType){
    switch (type) {
      case UserType.ADMIN:
        return CONFIG.KEYCLOAK.ADMIN
      case UserType.PROVIDER:
        return CONFIG.KEYCLOAK.PROVIDER
      case UserType.USER:
        return CONFIG.KEYCLOAK.USER
      default:
        return CONFIG.KEYCLOAK.USER
    }
  }

  async login(username: string, password: string, type:UserType): Promise<LoginResponse> {
    const realmConfig = this.getRealmConfiguration(type)
    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.baseURL}/realms/${realmConfig.REALM}/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: realmConfig.CLIENT_ID,
          client_secret: realmConfig.CLIENT_SECRET,
          grant_type: "password",
          scope: "openid",
          username,
          password,
        }),
      ),
    );
    return data;
  }

  private async getAdminToken(type:UserType){
    const realmConfig = this.getRealmConfiguration(type)
    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.baseURL}/realms/${realmConfig.REALM}/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: "admin-cli",
          client_secret: realmConfig.ADMIN_CLI_SECRET,
          grant_type: "client_credentials",
        }),
      ),
    );
    return data;
  }
  async signup(keycloakSignupRequestDTO:KeycloakSignupRequestDTO, type:UserType): Promise<any> {
    const realmConfig = this.getRealmConfiguration(type)
    const token = await this.getAdminToken(type)
    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.baseURL}/admin/realms/${realmConfig.REALM}/users`,
        {
          ...keycloakSignupRequestDTO,
          enabled:true
        },
        {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token.access_token}`}}
      ),
    );

    return data;
  }

  async getUserDetail(id:string, type:UserType): Promise<any> {
    try {
      const realmConfig = this.getRealmConfiguration(type)
      const token = await this.getAdminToken(type)
      const { data } = await firstValueFrom(
        this.httpService.get(
          `${this.baseURL}/admin/realms/${realmConfig.REALM}/users/${id}`,
          {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token.access_token}`}}
        ),
      )

      return data;
    } catch (e) {
      console.log({e});
    }
  }

  async getUserInfo(accessToken: string, type:UserType): Promise<UserInfoResponse> {
    const realmConfig = this.getRealmConfiguration(type)
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.baseURL}/realms/${realmConfig.REALM}/protocol/openid-connect/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
    );
    return data;
  }

  async getUsers(accessToken: string): Promise<UserListResponse[]> {
    const allUsers: UserListResponse[] = [];

    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.baseURL}/admin/realms/${CONFIG.KEYCLOAK.ADMIN.REALM}/users`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
    );
    return data;
  }

  async getAllUsers(accessToken:string): Promise<UserListResponse[]> {
    try {
      const allUsers: UserListResponse[] = [];
      const { BASE_URL, ...realmConfigs } =  CONFIG.KEYCLOAK
      // Iterate through each realm configuration and fetch users
      for (const realmConfigKey of Object.keys(realmConfigs)) {
        const realmConfig = realmConfigs[realmConfigKey];
        const realmName = realmConfig.REALM
        if(realmName){
          const users = await this.getUsersForRealm(realmName, accessToken, realmConfigKey);
          if(users)
          allUsers.push(...users);
        }
      }

      return allUsers;
    } catch (error) {
      throw error;
    }
  }

  private async getUsersForRealm(realm: string, accessToken:string, userType:string): Promise<any> {
    const usersUrl = `${this.baseURL}/admin/realms/${realm}/users`;
      const { data } = await firstValueFrom(
        this.httpService.get(
          usersUrl,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        ),
      );
    return data.map((user) => {
      user.type = userType.toLowerCase();
      return user;
    });


  }

  async refreshToken(refreshToken: string, type:UserType): Promise<LoginResponse> {
    const realmConfig = this.getRealmConfiguration(type)
    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.baseURL}/realms/${realmConfig.REALM}/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: realmConfig.CLIENT_ID,
          client_secret: realmConfig.CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      ),
    );

    return data;
  }


  async logout(refreshToken: string, type:UserType) {
    const realmConfig = this.getRealmConfiguration(type)
    await firstValueFrom(
      this.httpService.post(
        `${this.baseURL}/realms/${realmConfig.REALM}/protocol/openid-connect/logout`,
        new URLSearchParams({
          client_id: realmConfig.CLIENT_ID,
          client_secret: realmConfig.CLIENT_SECRET,
          refresh_token: refreshToken,
        }),
      ),
    );
  }
}
