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

            // Update memory cache
            // this.cache.set(`user_stock_symbols_${userId}`, symbols);
        } catch (error) {
            console.error('Error updating user watchlist:', error);
            throw error;
        }
    }

    async getUserWatchlist(userId: number): Promise<string[]> {
        try {
            // Try to get from cache first
            // const cachedSymbols = this.cache.get(`user_watchlist_${userId}`);
            // if (cachedSymbols) {
            //     return cachedSymbols;
            // }

            // If not in cache, query the database
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error('User not found');
            }

            // Update cache with fetched data
            // this.cache.set(`user_stock_symbols_${userId}`, user.stockSymbols);

            return user.watchlistItems.map(watchlistItem => watchlistItem.stockSymbol);
        } catch (error) {
            console.error('Error retrieving user watchlist:', error);
            throw error;
        }
    }
}

export default UserWatchlistService;
