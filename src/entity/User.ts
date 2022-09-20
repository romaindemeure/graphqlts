import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm"

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