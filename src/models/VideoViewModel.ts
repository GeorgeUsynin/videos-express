import { Resolutions } from '../constants';

export type VideoViewModel = {
    /**
     * Unique video identifier
     */
    id: number;

    /**
     * Video title
     */
    title: string;

    /**
     * Video author
     */
    author: string;

    /**
     * Indicates whether the video can be downloaded
     */
    canBeDownloaded: boolean;

    /**
     * Minimum age required to watch the video.
     * null — no age restriction
     */
    minAgeRestriction: number | null;

    /**
     * Video creation date and time (ISO string)
     */
    createdAt: string;

    /**
     * Video publication date (ISO string)
     */
    publicationDate: string;

    /**
     * List of available video resolutions
     */
    availableResolutions: Resolutions[];
};
