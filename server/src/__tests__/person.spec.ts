import { Property } from "../entities/Property";
import { createConnection, getConnection } from "typeorm";
import { Person } from "../entities/Person";
import * as typeorm from "typeorm";
import { PersonResolver } from "../resolvers/person";
import argon2 from "argon2";

describe("Property Resolver Testing", function () {
  beforeEach(() => {
    return createConnection({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [Property, Person],
      synchronize: true,
      logging: false,
    });
  });

  afterEach(() => {
    let conn = getConnection();
    return conn.close();
  });

  let personResolver = new PersonResolver();
  it("should return user not existing error for non existing user", async () => {
    typeorm.BaseEntity.findOne = jest.fn().mockReturnValue(undefined);

    const result = await personResolver.login("simar", "password");
    expect(result?.errors![0].field).toBe("username");
    expect(result?.errors![0].message).toBe("that username doesn't exist");
  });

  it("should return password incorrec for wrong password", async () => {
    typeorm.BaseEntity.findOne = jest.fn().mockReturnValue({id:1});
    argon2.verify = jest.fn().mockReturnValue(false);

    const result = await personResolver.login("simar", "password");
    expect(result?.errors![0].field).toBe("password");
    expect(result?.errors![0].message).toBe("that password didn't work");
  });


  it("should return person details availabe for particular requested person longni password", async () => {
    typeorm.BaseEntity.findOne = jest.fn().mockReturnValue({_id:1});
    argon2.verify = jest.fn().mockReturnValue(true);

    const result = await personResolver.login("simar", "password");
    expect(result.person?._id).toBe(1);
  });


  it("should return error for invalid registration details", async () => {
    const result = await personResolver.register({username:"sr", password:"password"});
    expect(result?.errors![0].field).toBe("username");
  });


  it("should save the details of the new registration", async () => {
    argon2.hash = jest.fn().mockReturnValue("2345");
    typeorm.BaseEntity.createQueryBuilder = jest.fn().mockReturnValue({
        insert: jest.fn().mockReturnThis(),
        into: jest.fn().mockReturnThis(),
        values: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ _id: 1 }),
      });
    const result = await personResolver.register({username:"simar", password:"password"});
    expect(result?.errors![0].field).toBe("username");
  });

  //   it("should return empty for particular requested property id when not available", async () => {
  //     typeorm.BaseEntity.findOne = jest.fn().mockReturnValue(undefined);

  //     const propertyId = 1;
  //     const result = await propertyResolver.property(propertyId);
  //     expect(result).toBe(undefined);
  //   });

  //   it("should return all the properties availabe ", async () => {
  //     typeorm.BaseEntity.find = jest.fn().mockReturnValue([
  //       {
  //         _id: 1,
  //         title: "abc",
  //         text: "123",
  //       },
  //       {
  //         _id: 1,
  //         title: "abcd",
  //         text: "1235",
  //       },
  //     ]);

  //     const result = await propertyResolver.properties();
  //     expect(result?.length).toBe(2);
  //   });

  //   it("should return empty when no properties availabe ", async () => {
  //     typeorm.BaseEntity.find = jest.fn().mockReturnValue(undefined);

  //     const result = await propertyResolver.properties();
  //     expect(result).toBe(undefined);
  //   });

  //   it("should return id for the newly saved property", async () => {
  //     typeorm.BaseEntity.create = jest.fn().mockReturnValue({
  //       save: jest.fn().mockResolvedValue({ _id: 1 }),
  //     });

  //     const result = await propertyResolver.createProperty({
  //       title: "hello",
  //       text: "hello helllo",
  //       creator_id: 1,
  //       imageUrl: "https://images.google.com/123",
  //     });
  //     expect(result?._id).toBe(1);
  //   });

  //   it("should return null for wrong property id ", async () => {
  //     typeorm.BaseEntity.findOne = jest.fn().mockReturnValue(undefined);

  //     const result = await propertyResolver.editProperty(1, "qwertt", "someUrl");
  //     expect(result).toBe(null);
  //   });

  //   it("should return false for wrong undefined title ", async () => {
  //     typeorm.BaseEntity.findOne = jest.fn().mockReturnValue(1);

  //     const result = await propertyResolver.editProperty(1, "undefined", "someUrl");
  //     expect(result).toBe(false);
  //   });

  //   it("should return false for error in updating value ", async () => {
  //     typeorm.BaseEntity.findOne = jest.fn().mockReturnValue(1);
  //     typeorm.BaseEntity.update = jest.fn().mockReturnValue(undefined);

  //     const result = await propertyResolver.editProperty(1, "asdf", "someUrl");
  //     expect(result).toBe(false);
  //   });

  //   it("should return true for updated successfully ", async () => {
  //     typeorm.BaseEntity.findOne = jest.fn().mockReturnValue(1);
  //     typeorm.BaseEntity.update = jest.fn().mockReturnValue(1);

  //     const result = await propertyResolver.editProperty(1, "asdf", "someUrl");
  //     expect(result).toBe(true);
  //   });
});
