import { Entity, Column, ObjectID, ObjectIdColumn } from "typeorm"

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    email: string
}