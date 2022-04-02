import { readFile } from '../../config';

const schemaGraphqlFilePath = 'schema.graphql';
// load GraphQL type definitions from schema.graphql file
export const typeDefs = readFile(schemaGraphqlFilePath).toString('utf-8');
