import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, BaseEntity, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Person } from "./Person";

@ObjectType()
@Entity()
export class Property extends BaseEntity {

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
    @Column()
    title!: string;

    @Field()
    @Column()
    text!: string;
    
    @Field()
    @Column()
    creator_id: number;
  
    @ManyToOne(() => Person, (person) => person.properties)
    creator: Person;

}