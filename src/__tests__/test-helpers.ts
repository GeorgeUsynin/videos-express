import { app } from '../app';
import { agent } from 'supertest';
import { CreateUpdateVideoErrorViewModel } from '../models';

export const request = agent(app);

type TValues = {
    title?: boolean;
    author?: boolean;
    availableResolutions?: boolean;
    canBeDownloaded?: boolean;
    minAgeRestriction?: boolean;
    publicationDate?: boolean;
};

export const createErrorMessages = (values: TValues) => {
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = values;

    const errorsMessages: CreateUpdateVideoErrorViewModel['errorsMessages'] = [];

    if (availableResolutions) {
        errorsMessages.push({
            message: 'Available resolutions should be null or an array with at least one resolution',
            field: 'availableResolutions',
        });
    }

    if (author) {
        errorsMessages.push({
            message: 'Author is required and should be a string. Max length 20 characters',
            field: 'author',
        });
    }

    if (title) {
        errorsMessages.push({
            message: 'Title is required and should be a string. Max length 40 characters',
            field: 'title',
        });
    }

    if (canBeDownloaded) {
        errorsMessages.push({
            message: 'CanBeDownloaded is required and should be a boolean.',
            field: 'canBeDownloaded',
        });
    }

    if (minAgeRestriction) {
        errorsMessages.push({
            message: 'MinAgeRestriction is required and should be a null or a number between 1 and 18.',
            field: 'minAgeRestriction',
        });
    }

    if (publicationDate) {
        errorsMessages.push({
            message:
                'PublicationDate is required and should a string. Also should be one day longer than the creation date.',
            field: 'publicationDate',
        });
    }

    return { errorsMessages };
};
