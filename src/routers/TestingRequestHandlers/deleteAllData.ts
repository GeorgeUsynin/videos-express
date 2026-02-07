import { type Request, type Response } from 'express';
import { db } from '../../db';
import { HTTP_STATUS_CODES } from '../../constants';

export const deleteAllData = (req: Request, res: Response) => {
    db.videos = [];

    res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT_204);
};
