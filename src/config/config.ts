import { DataSource } from "typeorm"
import { User } from "../entity/User"

const myDataSource = new DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "graphqlts", 
    username: "backend",
    password: "backend",
    entities: [User],
    migrations: ["migration/*.ts"],
    synchronize: true,
    logging: false,
})

export default myDataSource