import { type Request, type Response } from 'express';
import { URIParamsVideoModel } from '../../models';
import { db } from '../../db';
import { HTTP_STATUS_CODES } from '../../constants';

export const deleteVideoByIdHandler = (req: Request<URIParamsVideoModel>, res: Response) => {
    const id = +req.params.id;

    const foundVideo = db.videos.find(video => video.id === id);

    if (!foundVideo) {
        res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND_404);
        return;
    }

    res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT_204);
};
