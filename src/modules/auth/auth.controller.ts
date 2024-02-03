import { HttpCode, HttpStatus } from '@nestjs/common';
import {
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Controller, Get, Post, Put } from "src/core/decorators";

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import {CreateServiceTypeResponseDTO} from "../services/dto/response";
import {LoginRequestDTO} from "./dto/request";


type RefreshTokenRequestBody = {
  refresh_token: string;
};

type LogoutRequestBody = {
  refresh_token: string;
};

@Controller({
  group: "Auth",
  path: "/auth",
  version: "1",
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post({
    path: "/login",
    description: "",
    model: LoginRequestDTO,
  })
  @HttpCode(HttpStatus.OK)
  login(@Body() body: LoginRequestDTO) {
    const { username, password } = body;
    return this.authService.login(username, password);
  }

  // @UseGuards(JwtAuthGuard)
  @Get({
    path: "/me",
    description: "",
    model: null,
  })
  getProfile(@Request() req: Request) {
    const { authorization } = req.headers as any;
    console.log({authorization})
    const [, accessToken] = authorization.split(' ');

    return this.authService.getProfile(accessToken);
  }

  @Post({
    path: "/refresh",
    description: "",
    model: null,
  })
  @HttpCode(HttpStatus.OK)
  refreshToken(@Body() body: RefreshTokenRequestBody) {
    const { refresh_token: refreshToken } = body;

    return this.authService.refreshToken(refreshToken);
  }

  @Post({
    path: "/logout",
    description: "",
    model: null,
  })
  @HttpCode(HttpStatus.OK)
  async logout(@Body() body: LogoutRequestBody) {
    const { refresh_token: refreshToken } = body;
    await this.authService.logout(refreshToken);
  }

  @Get({
    path: "/users",
    description: "",
    model: null,
  })
  @HttpCode(HttpStatus.OK)
  async getUsers(@Request() req: Request) {
    const { authorization } = req.headers as any;
    const [, accessToken] = authorization.split(' ');
    await this.authService.getUsers(accessToken);
  }
}
