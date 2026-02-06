import cors from 'cors';
import express from 'express';

export const app = express();

// Parses incoming requests with JSON payloads
// and makes the data available in req.body
app.use(express.json());

// Enables Cross-Origin Resource Sharing (CORS)
// allowing requests from different origins (domains)
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
});

export default app;
