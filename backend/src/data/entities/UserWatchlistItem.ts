import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import {User} from "./User";

@Entity()
export class UserWatchlistItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    stockSymbol: string

    @ManyToOne(() => User, (user) => user.watchlistItems)
    user: User
}
