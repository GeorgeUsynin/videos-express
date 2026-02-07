import { type Response } from 'express';
import { RequestWithBody } from '../../types';
import { CreateUpdateVideoErrorViewModel, CreateVideoInputModel, VideoViewModel } from '../../models';
import { db } from '../../db';
import { HTTP_STATUS_CODES, Resolutions, MAX_LENGTH_CONSTRAINTS } from '../../constants';

const validate = (video: CreateVideoInputModel): CreateUpdateVideoErrorViewModel => {
    const errorsMessages: CreateUpdateVideoErrorViewModel['errorsMessages'] = [];

    const { title, author, availableResolutions } = video;

    const isValidAvailableResolutions =
        Array.isArray(availableResolutions) &&
        availableResolutions.length > 0 &&
        availableResolutions.every(resolution => Object.values(Resolutions).includes(resolution));

    const isValidTitle =
        typeof title === 'string' && Boolean(title.trim()) && title.trim().length <= MAX_LENGTH_CONSTRAINTS.title;

    const isValidAuthor =
        typeof author === 'string' && Boolean(author.trim()) && author.trim().length <= MAX_LENGTH_CONSTRAINTS.author;

    if (!isValidAvailableResolutions) {
        errorsMessages.push({
            message: 'Available resolutions should be null or an array with at least one resolution',
            field: 'availableResolutions',
        });
    }

    if (!isValidAuthor) {
        errorsMessages.push({
            message: 'Author is required and should be a string. Max length 20 characters',
            field: 'author',
        });
    }

    if (!isValidTitle) {
        errorsMessages.push({
            message: 'Title is required and should be a string. Max length 40 characters',
            field: 'title',
        });
    }

    return { errorsMessages: errorsMessages.length > 0 ? errorsMessages : null };
};

const mapRequestedPayloadToViewModel = (payload: CreateVideoInputModel): VideoViewModel => {
    const { title, author, availableResolutions } = payload;

    const today = new Date();
    const nextDay = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    const createdVideo: VideoViewModel = {
        id: +today,
        title,
        author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: today.toISOString(),
        publicationDate: nextDay.toISOString(),
        availableResolutions,
    };

    return createdVideo;
};

export const createVideoHandler = (
    req: RequestWithBody<CreateVideoInputModel>,
    res: Response<VideoViewModel | CreateUpdateVideoErrorViewModel>
) => {
    const payload = req.body;
    const errors: CreateUpdateVideoErrorViewModel = validate(payload);

    if (errors.errorsMessages) {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST_400).send(errors);
        return;
    }

    const createdVideo = mapRequestedPayloadToViewModel(payload);

    db.videos.push(createdVideo);

    res.status(HTTP_STATUS_CODES.CREATED_201).send(createdVideo);
};
