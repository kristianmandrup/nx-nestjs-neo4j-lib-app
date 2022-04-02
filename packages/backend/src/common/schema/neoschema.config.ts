import { sessionResolvers, typeDefs } from './resolvers';
import { Neo4jGraphQL } from '@neo4j/graphql';
import { configuration } from '../config';
import { orderResolvers } from './resolvers/order';

// custom Resolvers
const resolvers = {
  // require to us json scalar type
  Mutation: sessionResolvers,
  Order: orderResolvers
};

// create executable GraphQL schema from GraphQL type definitions,
// using @neo4j/graphql to autogenerate resolvers
export const neoSchema = new Neo4jGraphQL({
  typeDefs,
  config: {
    jwt: {
      secret: configuration().accessTokenJwtSecret,
    }
  },
  resolvers,
});
