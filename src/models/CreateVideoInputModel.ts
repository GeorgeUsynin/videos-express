import { Resolutions } from '../constants';

export type CreateVideoInputModel = {
    /**
     * Video title
     */
    title: string;

    /**
     * Video author
     */
    author: string;

    /**
     * List of available video resolutions
     */
    availableResolutions: Resolutions[];
};
