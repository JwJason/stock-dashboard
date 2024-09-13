import express from "express";
import "reflect-metadata";

import userWatchlistRoutes from "./routes/userWatchlistRoutes";
import corsOptions from "./config/cors";
import cors from "cors";
import userPricesRoutes from "./routes/userPricesRoutes";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(userPricesRoutes);
app.use(userWatchlistRoutes);

export default app;
