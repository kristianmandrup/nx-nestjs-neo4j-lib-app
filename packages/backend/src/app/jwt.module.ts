import { JwtModule } from '@nestjs/jwt';
import { AuthOptions, NEST_GRAPHQL_AUTH_OPTIONS } from '@koakh/nestjs-package-jwt-authentication-graphql';

export const jwtModule = JwtModule.registerAsync({
    useFactory: async (authModuleOptions: AuthOptions) => ({
      secret: authModuleOptions.secret,
      signOptions: {
        expiresIn: authModuleOptions.expiresIn,
      }
    }),
    inject: [NEST_GRAPHQL_AUTH_OPTIONS],
  })