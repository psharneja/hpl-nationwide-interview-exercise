import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, BaseEntity, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Property } from "./Property";

@ObjectType()
@Entity()
export class Person extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn()
    _id!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
    
    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column({ unique: true})
    username!: string;

    @Column({type: 'text'})
    password!: string;

    @OneToMany(() => Property, property => property.creator)
    properties: Property[]

}