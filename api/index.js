import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import NewsAPI from 'newsapi';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

app.get('/api/news', (req, res) => {
    newsapi.v2.everything({
        q: 'technology',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10,
    }).then((response) => {
        res.json(response);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});