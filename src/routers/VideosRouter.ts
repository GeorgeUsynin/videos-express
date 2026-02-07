import { Router } from 'express';
import * as RequestHandlers from './VideosRequestHandlers';

export const VideosRouter = Router();

const VideosController = {
    getAllVideos: RequestHandlers.getAllVideosHandler,
    getVideoById: RequestHandlers.getVideoByIdHandler,
    createVideo: RequestHandlers.createVideoHandler,
    updateVideo: RequestHandlers.updateVideoHandler,
    deleteVideo: RequestHandlers.deleteVideoByIdHandler,
};

VideosRouter.get('/', VideosController.getAllVideos);
VideosRouter.get('/:id', VideosController.getVideoById);
VideosRouter.post('/', VideosController.createVideo);
VideosRouter.put('/:id', VideosController.updateVideo);
VideosRouter.delete('/:id', VideosController.deleteVideo);
