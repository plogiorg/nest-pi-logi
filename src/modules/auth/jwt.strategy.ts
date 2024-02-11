import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import CONFIG from "../../config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: CONFIG.KEYCLOAK.ADMIN.CLIENT_SECRET,
    });
  }

  async validate(payload: any) {
    /**
     * This can be obtained via req.user in the Controllers
     * This is where we validate that the user is valid and delimit the payload returned to req.user
     */
    return { userId: payload.sub };
  }
}
