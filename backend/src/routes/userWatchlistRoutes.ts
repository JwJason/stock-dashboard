import { Router } from 'express';
import {createWatchlistItem, getWatchlistItems} from "../controllers/userWatchlistController";

const router = Router();

// Define routes and map them to controller functions
router.get('/users/:id/watchlist', getWatchlistItems);
router.post('/users/:id/watchlist', createWatchlistItem);

export default router;
