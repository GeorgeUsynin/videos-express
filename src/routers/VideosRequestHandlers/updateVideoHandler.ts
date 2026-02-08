import { type Response } from 'express';
import { RequestWithParamsAndBody } from '../../types';
import { CreateUpdateVideoErrorViewModel, UpdateVideoInputModel, URIParamsVideoModel } from '../../models';
import { db } from '../../db';
import { HTTP_STATUS_CODES, Resolutions, MAX_LENGTH_CONSTRAINTS, AGE_CONSTRAINTS } from '../../constants';

const validate = (video: UpdateVideoInputModel & { createdAt: string }): CreateUpdateVideoErrorViewModel => {
    const errorsMessages: CreateUpdateVideoErrorViewModel['errorsMessages'] = [];

    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate, createdAt } =
        video;

    const isValidAvailableResolutions =
        Array.isArray(availableResolutions) &&
        availableResolutions.length > 0 &&
        availableResolutions.every(resolution => Object.values(Resolutions).includes(resolution));

    const isValidTitle =
        typeof title === 'string' && Boolean(title.trim()) && title.trim().length <= MAX_LENGTH_CONSTRAINTS.title;

    const isValidAuthor =
        typeof author === 'string' && Boolean(author.trim()) && author.trim().length <= MAX_LENGTH_CONSTRAINTS.author;

    const isValidCanBeDownloaded = typeof canBeDownloaded === 'boolean';

    const isValidMinAgeRestriction =
        minAgeRestriction === null ||
        (typeof minAgeRestriction === 'number' &&
            minAgeRestriction >= AGE_CONSTRAINTS.min &&
            minAgeRestriction <= AGE_CONSTRAINTS.max);

    const isValidPublicationDate = Date.parse(publicationDate) - Date.parse(createdAt) >= 24 * 60 * 60 * 1000;

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

    if (!isValidCanBeDownloaded) {
        errorsMessages.push({
            message: 'CanBeDownloaded is required and should be a boolean.',
            field: 'canBeDownloaded',
        });
    }

    if (!isValidMinAgeRestriction) {
        errorsMessages.push({
            message: 'MinAgeRestriction is required and should be a null or a number between 1 and 18.',
            field: 'minAgeRestriction',
        });
    }

    if (!isValidPublicationDate) {
        errorsMessages.push({
            message:
                'PublicationDate is required and should a string. Also should be one day longer than the creation date.',
            field: 'publicationDate',
        });
    }

    return { errorsMessages: errorsMessages.length > 0 ? errorsMessages : null };
};

export const updateVideoHandler = (
    req: RequestWithParamsAndBody<URIParamsVideoModel, UpdateVideoInputModel>,
    res: Response<CreateUpdateVideoErrorViewModel>
) => {
    const payload = req.body;
    const id = +req.params.id;
    const foundVideo = db.videos.find(video => video.id === id);

    if (!foundVideo) {
        res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND_404);
        return;
    }

    const errors: CreateUpdateVideoErrorViewModel = validate({ ...payload, createdAt: foundVideo.createdAt });

    if (errors.errorsMessages) {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST_400).send(errors);
        return;
    }

    for (let i = 0; i < db.videos.length; i++) {
        if (db.videos[i].id === id) {
            db.videos.splice(i, 1, { ...db.videos[i], ...payload });
            break;
        }
    }

    res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT_204);
};
