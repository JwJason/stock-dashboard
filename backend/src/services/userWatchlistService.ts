import { EntityManager, Repository } from 'typeorm';
import memoryCache, { CacheClass } from 'memory-cache';
import {User} from "../data/entities/User";
import {UserWatchlistItem} from "../data/entities/UserWatchlistItem";

class UserWatchlistService {
    private userRepository: Repository<User>;
    private cache: CacheClass<string, string[]>;

    constructor(private entityManager: EntityManager) {
        this.userRepository = this.entityManager.getRepository(User);
        this.cache = new memoryCache.Cache();
    }

    async addToUserWatchlist(userId: number, stockSymbol: string): Promise<void> {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error('User not found');
            }

            const watchlistItem = new UserWatchlistItem();
            watchlistItem.stockSymbol = stockSymbol;
            user.watchlistItems.push(watchlistItem);
            await this.userRepository.save(user);

            this.cache.put(`user_watchlist_${userId}`, user.getWatchlistItemSymbols());
        } catch (error) {
            console.error('Error updating user watchlist:', error);
            throw error;
        }
    }

    async getUserWatchlist(userId: number): Promise<string[]> {
        try {
            const cachedWatchlist = this.cache.get(`user_watchlist_${userId}`);
            if (cachedWatchlist) {
                return cachedWatchlist;
            }

            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error('User not found');
            }

            this.cache.put(`user_watchlist_${userId}`, user.getWatchlistItemSymbols());

            return user.getWatchlistItemSymbols();
        } catch (error) {
            console.error('Error retrieving user watchlist:', error);
            throw error;
        }
    }
}

export default UserWatchlistService;
