import { Body, HttpCode, HttpStatus, Param, Request, UseGuards, ValidationPipe } from "@nestjs/common";
import { Controller, Get, Post } from "src/core/decorators";

import { AuthService } from "./auth.service";
import {
  LoginRequestDTO,
  LogoutRequestDTO,
  RefreshTokenRequestDTO,
  SignupParam,
  SignupRequestDTO,
} from "./dto/request";
import { AuthGuard } from "../../core/guards/auth.guard";
import { UserInfoResponse } from "./types/AuthTypes";


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
    return this.authService.login(body);
  }


  @Post({
    path: "/:userType/signup/",
    description: "",
    model: SignupRequestDTO,
  })
  signup(@Body() body: SignupRequestDTO, @Param() params: SignupParam) {
    console.log({ params });
    return this.authService.signup(body, params.userType);
  }

  @UseGuards(AuthGuard)
  @Get({
    path: "/me",
    description: "",
    model: null,
  })
  getProfile(@Request() req: Request & {user:UserInfoResponse}) {
    return req.user
  }

  @Post({
    path: "/refresh",
    description: "",
    model: null,
  })
  @HttpCode(HttpStatus.OK)
  refreshToken(@Body() body: RefreshTokenRequestDTO) {
    const { refreshToken, type} = body;
    return this.authService.refreshToken(refreshToken, type);
  }

  @Post({
    path: "/logout",
    description: "",
    model: null,
  })
  @HttpCode(HttpStatus.OK)
  async logout(@Body() data: LogoutRequestDTO) {
    await this.authService.logout(data.accessToken, data.type);
  }

  @UseGuards(AuthGuard)
  @Get({
    path: "/users",
    description: "",
    model: null,
  })
  @HttpCode(HttpStatus.OK)
  async getUsers(@Request() req: Request & {token:string}) {
    const users = await this.authService.getUsers(req.token);
    return { users }
  }
}
