import { Property } from "../entities/Property";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  Resolver,
  Query
} from "type-graphql";

@InputType()
class PropertyInput {
  @Field()
  title: string;

  @Field()
  text: string;

  @Field()
  creator_id: number;

}


@Resolver(Property)
export class PropertyResolver {

  @Query(() => Property, { nullable: true })
  post(@Arg("id") id: number): Promise<Property | undefined> {
    return Property.findOne(id);
  }

  @Mutation(() => Property, {nullable: true})
  async createProperty(
    @Arg("input") input: PropertyInput,
  ): Promise<Property | null> {
     return  Property.create({
      ...input,
      creator_id: input.creator_id,
    }).save();

  }


  @Query(() => [Property])
  properties(): Promise<Property[]> {
    return Property.find();
  }
}