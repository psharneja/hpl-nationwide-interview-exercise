import { Field, InputType } from "type-graphql";

@InputType()
export class PersonPasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;

}
