import { Router } from "express";
import { getPrices } from "../controllers/userPricesController";

const router = Router();

router.get("/users/:id/prices", getPrices);

export default router;
