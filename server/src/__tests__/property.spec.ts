import { Property } from "../entities/Property";
import { createConnection, getConnection } from "typeorm";
import { PropertyResolver } from "./../resolvers/property";
import { Person } from "../entities/Person";
import * as typeorm from "typeorm";

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

  let propertyResolver = new PropertyResolver();
  it("should return all the details availabe for particular requested property id", async () => {
    typeorm.BaseEntity.findOne = jest.fn().mockReturnValue({
      _id: 1,
      title: "abc",
      text: "123",
    });

    const propertyId = 1;
    const result = await propertyResolver.property(propertyId);
    expect(result?._id).toBe(propertyId);
  });

  it("should return empty for particular requested property id when not available", async () => {
    typeorm.BaseEntity.findOne = jest.fn().mockReturnValue(undefined);

    const propertyId = 1;
    const result = await propertyResolver.property(propertyId);
    expect(result).toBe(undefined);
  });

  it("should return all the properties availabe ", async () => {
    typeorm.BaseEntity.find = jest.fn().mockReturnValue([
      {
        _id: 1,
        title: "abc",
        text: "123",
      },
      {
        _id: 1,
        title: "abcd",
        text: "1235",
      },
    ]);

    const result = await propertyResolver.properties();
    expect(result?.length).toBe(2);
  });

  it("should return empty when no properties availabe ", async () => {
    typeorm.BaseEntity.find = jest.fn().mockReturnValue(undefined);

    const result = await propertyResolver.properties();
    expect(result).toBe(undefined);
  });

  it("should return id for the newly saved property", async () => {
    typeorm.BaseEntity.create = jest.fn().mockReturnValue({
      save: jest.fn().mockResolvedValue({ _id: 1 }),
    });

    const result = await propertyResolver.createProperty({
      title: "hello",
      text: "hello helllo",
      creator_id: 1,
      imageUrl: "https://images.google.com/123",
    });
    expect(result?._id).toBe(1);
  });

  it("should return null for wrong property id ", async () => {
    typeorm.BaseEntity.findOne = jest.fn().mockReturnValue(undefined);

    const result = await propertyResolver.editProperty(1, "qwertt", "someUrl");
    expect(result).toBe(null);
  });

  it("should return false for wrong undefined title ", async () => {
    typeorm.BaseEntity.findOne = jest.fn().mockReturnValue(1);

    const result = await propertyResolver.editProperty(1, "undefined", "someUrl");
    expect(result).toBe(false);
  });

  it("should return false for error in updating value ", async () => {
    typeorm.BaseEntity.findOne = jest.fn().mockReturnValue(1);
    typeorm.BaseEntity.update = jest.fn().mockReturnValue(undefined);

    const result = await propertyResolver.editProperty(1, "asdf", "someUrl");
    expect(result).toBe(false);
  });

  it("should return true for updated successfully ", async () => {
    typeorm.BaseEntity.findOne = jest.fn().mockReturnValue(1);
    typeorm.BaseEntity.update = jest.fn().mockReturnValue(1);

    const result = await propertyResolver.editProperty(1, "asdf", "someUrl");
    expect(result).toBe(true);
  });
});
