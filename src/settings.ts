import 'dotenv/config';

export const SETTINGS = {
    PORT: process.env.PORT || 3001,
    PATH: {
        VIDEOS: '/videos',
        TESTING: '/testing',
    },
};
