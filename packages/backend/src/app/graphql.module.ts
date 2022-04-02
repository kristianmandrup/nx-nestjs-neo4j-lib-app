import { GraphQLModule } from '@nestjs/graphql';
import { GqlContext, GqlContextPayload } from '../common/interfaces';
import { AuthService } from '@koakh/nestjs-package-jwt-authentication-graphql';
import { neo4jDriver as driver } from '../common/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationError } from 'apollo-server-core';
import { ConnectionParams } from 'subscriptions-transport-ws';
import { neoSchema, mapKeysToLowerCase } from '../common'
import {  } from '../common/utils';


export const graphQLModule = GraphQLModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService, AuthService],
    useFactory: async (configService: ConfigService, authService: AuthService) => ({
      // require to pass req for authentication
      context: ({ req, res, payload, connection }: GqlContext) => ({ req, res, payload, connection, driver: driver() } as GqlContext),
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      introspection: true,
      // TODO:
      // this enable code first
      // autoSchemaFile: 'schema.gql',
      // this enable neo4j schema first
      schema: neoSchema.schema,
      cors: {
        origin: configService.get<string>('corsOriginReactFrontend'),
        credentials: true,
      },
      subscriptions: {
        // get headers
        onConnect: (connectionParams: ConnectionParams) => {
          // convert header keys to lowercase
          const connectionParamsLowerKeys = mapKeysToLowerCase(connectionParams);
          // get authToken from authorization header
          const authToken: string = ('authorization' in connectionParamsLowerKeys)
            && connectionParamsLowerKeys.authorization.split(' ')[1];
          if (authToken) {
            // verify authToken/getJwtPayLoad
            const jwtPayload: GqlContextPayload = authService.getJwtPayLoad(authToken);
            // the user/jwtPayload object found will be available as context.currentUser/jwtPayload in your GraphQL resolvers
            return { currentUser: jwtPayload.username, jwtPayload, headers: connectionParamsLowerKeys };
          }
          throw new AuthenticationError('authToken must be provided');
        },
      },
    }),
  })