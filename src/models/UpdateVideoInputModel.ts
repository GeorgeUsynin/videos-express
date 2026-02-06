import { Resolutions } from '../constants';

export type UpdateVideoInputModel = {
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

    /**
     * Indicates whether the video can be downloaded
     */
    canBeDownloaded: true;

    /**
     * Minimum age required to watch the video.
     * null — no age restriction
     */
    minAgeRestriction: number | null;

    /**
     * Video publication date (ISO string)
     */
    publicationDate: string;
};
