import { Injectable } from '@nestjs/common';
import { OGM } from "@neo4j/graphql-ogm";
import { neo4jDriver as driver } from '../../config';
import { typeDefs } from '../../schema';

// const ogm = new OGM({ typeDefs, driver });
// const User = ogm.model("User");

@Injectable()
export class OgmService {
  private ogm: OGM;

  constructor() {
    this.ogm = new OGM({ typeDefs, driver: driver() });
  }

  // TODO: use enum
  getModel(model: string) {
    return this.ogm.model(model);
  }
}
