import {ApiProperty} from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { UserCredentials, UserType } from "../types/AuthTypes";

export class LoginRequestDTO {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsEnum(UserType)
    type: UserType;
}

export class RefreshTokenRequestDTO {
    @ApiProperty()
    @IsString()
    refreshToken: string;

    @ApiProperty()
    @IsEnum(UserType)
    type: UserType
}


export class LogoutRequestDTO {
    @ApiProperty()
    @IsString()
    accessToken: string;

    @ApiProperty()
    @IsEnum(UserType)
    type: UserType
}



export class SignupRequestDTO {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsEmail()
    email: string;


    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    enabled: boolean;


    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    lastName: string

    @ApiProperty()
    @IsString()
    country: string;
}


export class KeycloakSignupRequestDTO {
    @ApiProperty()
    @IsString()
    username: string;


    @ApiProperty()
    @IsEmail()
    email: string;



    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    enabled: boolean;

    @ApiProperty()
    @IsOptional()
    attributes?: any;


    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    lastName: string

    @ApiProperty()
    credentials:UserCredentials[]
    
    constructor(dto?:Partial<KeycloakSignupRequestDTO>) {
        if (dto) {
            Object.assign(this, dto);
        }
    }

}
export class SignupParam {
    @IsEnum(UserType)
    userType: UserType;
}