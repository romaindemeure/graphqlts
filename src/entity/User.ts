import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm"

// This is the ORM for how sort and create the database
@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    email: string

    @Column()
    description: string

    @Column()
    created_at: string

    @Column()
    updated_at: string
}