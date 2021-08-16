import { Field, Mutation, ObjectType, Resolver, Arg } from "type-graphql";
import { Person } from "../entities/Person";
import { PersonPasswordInput } from "../utils/PersonPasswordInput";
import { validateRegister } from "../utils/validateRegister";
import argon2 from "argon2";
import { getConnection } from "typeorm";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class PersonResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Person, { nullable: true })
  person?: Person;
}

@Resolver(Person)
export class PersonResolver {
  @Mutation(() => PersonResponse)
  async register(
    @Arg("options") options: PersonPasswordInput
  ): Promise<PersonResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }
    const hashedPassword = await argon2.hash(options.password);
    let person;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Person)
        .values({
          username: options.username,
          password: hashedPassword,
        })
        .returning("*")
        .execute();
        person = result.raw[0];
    } catch (err) {
      if ((err.code = "23505")) {
        return {
          errors: [
            {
              field: "username",
              message: "username has already been taken",
            },
          ],
        };
      }
    }

    return { person };
  }

  @Mutation(() => PersonResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
  ): Promise<PersonResponse> {
    const person = await Person.findOne(
        {where: {username: username } }
    );
    if (!person) {
      return {
        errors: [
          {
            field: "username",
            message: "that username doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(person.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "that password didn't work",
          },
        ],
      };
    }
    return { person };
  }

}
