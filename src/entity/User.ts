import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm"

// This is the ORM for how sort and create the database
@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column({type: String})
    first_name: string

    @Column({type: String})
    last_name: string

    @Column({ unique: true})
    email: string

    @Column({type: String})
    description: string

    @Column({type: String})
    created_at: string

    @Column({type: String})
    updated_at: string
}