import {Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import {UserWatchlistItem} from "./UserWatchlistItem";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => UserWatchlistItem, (watchlistItem) => watchlistItem.user, {eager: true, cascade: true})
    watchlistItems: UserWatchlistItem[]

    public getWatchlistItemSymbols(): string[] {
        return this.watchlistItems.map(watchlistItem => watchlistItem.stockSymbol);
    }
}
