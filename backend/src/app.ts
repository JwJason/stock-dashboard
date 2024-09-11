import express, { Request, Response } from 'express';
import "reflect-metadata";

import userWatchlistRoutes from "./routes/userWatchlistRoutes";

const app = express();

app.use(express.json());
app.use(userWatchlistRoutes);

export default app;
