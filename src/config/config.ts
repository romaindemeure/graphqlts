import { DataSource } from "typeorm";
import { User } from '../entity/User';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 3232,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})