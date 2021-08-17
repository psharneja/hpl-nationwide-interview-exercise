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

  @Field()
  imageUrl: string;

}


@Resolver(Property)
export class PropertyResolver {

  @Query(() => Property, { nullable: true })
  property(@Arg("id") id: number): Promise<Property | undefined> {
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


  @Query(() => [Property], {nullable: true})
  properties(): Promise<Property[] | undefined> {
    return Property.find();
  }

  @Mutation(() => Boolean, { nullable: true })
  async editProperty(
    @Arg("id") _id: number,
    @Arg("title", () => String) title: string,
    @Arg("imageUrl", () => String) imageUrl: string
  ): Promise<Boolean | null> {
    const property = await Property.findOne(_id);
    if (!property) {
      return null;
    }
    let updated;
    if (title !== "undefined") {
      updated = await Property.update({ _id }, { imageUrl, title });
    }
    if(typeof updated !== 'undefined'){
      return true;
    }
    return false;
  }
}