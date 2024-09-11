import {HttpError} from "http-errors";
import { Response } from 'express';

export const handleError = (err: any, res: Response) => {
    const errorMessage = (err instanceof Error ? err.message : 'Unknown error');
    const errorStatus = (err instanceof HttpError ? err.status : 500);
    return res.status(errorStatus).json({
        "error": {
            "message": errorMessage
        }
    });
};
