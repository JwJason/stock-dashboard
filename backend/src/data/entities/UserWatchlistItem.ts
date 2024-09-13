import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class UserWatchlistItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stockSymbol: string;

  @ManyToOne(() => User, (user) => user.watchlistItems)
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;
}
