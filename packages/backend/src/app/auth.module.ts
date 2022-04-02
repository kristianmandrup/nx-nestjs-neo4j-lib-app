import { AuthModule } from '@koakh/nestjs-package-jwt-authentication-graphql';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '../app.module';
import { constants as userConstants, UserModule, UserService } from '../domains/user';

export const authModule = AuthModule.registerAsync({
    imports: [AppModule, UserModule],
    inject: [ConfigService, UserService],
    useFactory: async (configService: ConfigService, userService: UserService) => ({
      secret: configService.get<string>('accessTokenJwtSecret'),
      expiresIn: configService.get<string>('accessTokenExpiresIn'),
      refreshTokenJwtSecret: configService.get<string>('refreshTokenJwtSecret'),
      refreshTokenExpiresIn: configService.get<string>('refreshTokenExpiresIn'),
      adminUserPayload: userConstants.adminCurrentUser,
      userService,
    }),
  })