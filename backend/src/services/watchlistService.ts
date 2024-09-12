import { EntityManager, Repository } from 'typeorm';
import memoryCache, { CacheClass } from 'memory-cache';
import {User} from "../data/entities/User";
import {UserWatchlistItem} from "../data/entities/UserWatchlistItem";
import createHttpError from "http-errors";
import {getDataSource} from "../config/db/db";

const cachePrefix = 'user_watchlist_';

/**
 * Service for interacting with the user's stock watchlist data.
 */
export class WatchlistService {
    private userRepository: Repository<User>;
    private cache: CacheClass<string, string[]>;

    constructor(private entityManager: EntityManager) {
        this.userRepository = this.entityManager.getRepository(User);
        this.cache = new memoryCache.Cache();
    }

    public async addToWatchlist(userId: number, stockSymbol: string): Promise<string[]> {
        const cachePath = `${cachePrefix}${userId}`;

        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new createHttpError.NotFound('User not found');
            }

            const watchlistItem = new UserWatchlistItem();
            watchlistItem.stockSymbol = stockSymbol;
            user.watchlistItems.push(watchlistItem);
            await this.userRepository.save(user);

            this.cache.put(cachePath, user.getWatchlistItemSymbols());

            return user.getWatchlistItemSymbols();
        } catch (err) {
            console.error('Error updating user watchlist:', err);
            throw err;
        }
    }

    public async getWatchlist(userId: number): Promise<string[]> {
        const cachePath = `${cachePrefix}${userId}`;

        try {
            const cachedWatchlist = this.cache.get(cachePath);
            if (cachedWatchlist) {
                return cachedWatchlist;
            }

            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new createHttpError.NotFound('User not found');
            }

            this.cache.put(cachePath, user.getWatchlistItemSymbols());

            return user.getWatchlistItemSymbols();
        } catch (err) {
            console.error('Error retrieving user watchlist:', err);
            throw err;
        }
    }
}

export const watchlistService = new WatchlistService(getDataSource().manager);
