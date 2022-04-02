import { neo4jDriver as driver } from '../../config/neo4j.config';
import { OGM } from "@neo4j/graphql-ogm";
import { constants as c } from '../constants';
import { typeDefs } from './type-defs';

const ogm = new OGM({ typeDefs, driver: driver() });
export const User = ogm.model(c.graphTypes.USER);
