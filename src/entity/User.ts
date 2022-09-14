import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ObjectIdColumn } from "typeorm"

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID

    @Column("text")
    first_name: string

    @Column("text")
    last_name: string

    @Column("text")
    email: string
}