import {Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import {UserWatchlistItem} from "./UserWatchlistItem";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => UserWatchlistItem, (watchlistItem) => watchlistItem.user)
    watchlistItems: UserWatchlistItem[]

    getWatchlistItemSymbols() {
        return this.watchlistItems.map(watchlistItem => watchlistItem.stockSymbol);
    }
}
