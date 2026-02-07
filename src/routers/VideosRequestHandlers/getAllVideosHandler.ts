import { type Request, type Response } from 'express';
import { VideoViewModel } from '../../models';
import { db } from '../../db';
import { HTTP_STATUS_CODES } from '../../constants';

export const getAllVideosHandler = (req: Request, res: Response<VideoViewModel[]>) => {
    const allVideos = db.videos;

    res.status(HTTP_STATUS_CODES.OK_200).send(allVideos);
};
