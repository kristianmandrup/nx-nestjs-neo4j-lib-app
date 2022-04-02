import { JwtModule } from '@nestjs/jwt';
import { configModule, jwtModule, authModule, graphQLModule } from './app';
import { AuthController } from '@koakh/nestjs-package-jwt-authentication-graphql';
import { Global, Module } from '@nestjs/common';
import { UserService } from './domains';
import { OgmService } from './common/modules/ogm/ogm.service';

@Global()
@Module({
  imports: [
    configModule,
    jwtModule,
    authModule,
    graphQLModule,
  ],
  providers: [
    // TODO: remove
    UserService,
    OgmService,
  ],
  exports: [
    // if we export here JwtModule, we don't need the duplicated code in auth.module
    // TODO: remove
    JwtModule,
    // TODO: remove
    UserService,
    OgmService,
  ],
  controllers: [
    AuthController
  ],
})

export class AppModule { }
