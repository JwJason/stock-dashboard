import express, { Request, Response } from 'express';
import "reflect-metadata";
import http from 'http';
import { WebSocket } from 'ws';

// import userRoutes from './routes/userRoutes';
// import postRoutes from './routes/postRoutes';
// import { errorHandler } from './middleware/errorMiddleware';

const app = express();

app.use(express.json());
app.get('/test', (req: Request, res: Response) => {
    res.json({
        'hello': 'world'
    });
});

// app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);

// app.use(errorHandler);

export default app;
