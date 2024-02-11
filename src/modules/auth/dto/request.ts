import {ApiProperty} from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { UserType } from "../types/AuthTypes";

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