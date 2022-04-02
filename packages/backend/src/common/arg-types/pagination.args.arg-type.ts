import { Max, Min } from 'class-validator';
import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(_type => Int)
  @Min(0)
  skip;
  
  @Field(_type => Int)
  @Min(1)
  @Max(50)
  take: number = 25;
}
