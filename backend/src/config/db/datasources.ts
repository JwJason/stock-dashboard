import {DataSource} from "typeorm";
import config from "../config";

export const DevDataSource = new DataSource({
    type: 'sqlite',
    database: config.db.dev.sqlitePath,
    synchronize: true,
    logging: true,
    entities: [],
});
