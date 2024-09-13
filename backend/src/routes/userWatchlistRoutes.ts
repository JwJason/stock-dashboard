import { Router } from "express";
import {
  createWatchlistItem,
  getWatchlistItems,
} from "../controllers/userWatchlistController";

const router = Router();

router.get("/users/:id/watchlist", getWatchlistItems);
router.post("/users/:id/watchlist", createWatchlistItem);

export default router;
