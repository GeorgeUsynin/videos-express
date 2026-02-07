import { type Request, type Response } from 'express';
import { URIParamsVideoModel, VideoViewModel } from '../../models';
import { db } from '../../db';
import { HTTP_STATUS_CODES } from '../../constants';

export const getVideoByIdHandler = (req: Request<URIParamsVideoModel>, res: Response<VideoViewModel>) => {
    const id = +req.params.id;

    const foundVideo = db.videos.find(video => video.id === id);

    if (!foundVideo) {
        res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND_404);
        return;
    }

    res.status(HTTP_STATUS_CODES.OK_200).send(foundVideo);
};
