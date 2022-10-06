import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm"

// This is the ORM for how sort and create the database
@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column({type: "string"})
    first_name: string

    @Column({type: "string"})
    last_name: string

    @Column({ unique: true})
    email: string

    @Column({type: "string"})
    description: string

    @Column({type: "string"})
    password: string

    @Column({type: "string"})
    created_at: string

    @Column({type: "string"})
    updated_at: string
    
    jwt: string
}