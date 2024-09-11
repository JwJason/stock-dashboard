import { Router } from 'express';
import {createUserWatchlistItem, getUserWatchlist} from "../controllers/userWatchlistController";

const router = Router();

// Define routes and map them to controller functions
router.get('/users/:id/watchlist', getUserWatchlist);
router.post('/users/:id/watchlist', createUserWatchlistItem);

export default router;
