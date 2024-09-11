import {DataSource} from "typeorm";
import config from "../config";
import {User} from "../../data/entities/User";
import {UserWatchlistItem} from "../../data/entities/UserWatchlistItem";
import {AddInitialTables1726088117917} from "../../data/migrations/1726088117917-AddInitialTables";
import {AddUserSeedData1726090192425} from "../../data/migrations/1726090192425-AddUserSeedData";

export const DevDataSource = new DataSource({
    type: 'sqlite',
    database: config.db.dev.sqlitePath,
    synchronize: true, // TODO - Absolutely do not use on prod!
    logging: true,
    entities: [User, UserWatchlistItem],
    migrations: [AddInitialTables1726088117917,AddUserSeedData1726090192425,],
});
