export enum UserType {
  ADMIN = 'admin',
  PROVIDER = 'provider',
  USER = 'user'
}

export enum AuthType {
  PI = 'pi',
  STANDARD = 'standard',
}

export type LoginResponse = {
  access_token: string;
  scope: string;
  refresh_token: string;
  token_type: string;
  session_state: string;
  "not-before-policy": number;
  refresh_expires_in: number;
  expires_in: number;
};

export type UserInfoResponse = {
  sub?: string;
  uid:string;
  email_verified: boolean;
  preferred_username: string;
};

export type UserListResponse = {
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


export class UserCredentials {
  type: string;
  value: string
}