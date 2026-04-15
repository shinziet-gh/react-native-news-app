import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import NewsAPI from 'newsapi';

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();
const port = 3000;

app.use(cors());

// Initialize News API key from environment variable
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

//To query /v2/everything for technology
app.get('/api/news:category=tech', (req, res) => {
    newsapi.v2.everything({
        q: 'technology',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10,
    }).then((response) => {
        res.json(response);
    });
});

//To query /v2/everything for business
app.get('/api/news:category=business', (req, res) => {
    newsapi.v2.everything({
        q: 'business',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10,
    }).then((response) => {
        res.json(response);
    });
});

//To query /v2/everything for health
app.get('/api/news:category=health', (req, res) => {
    newsapi.v2.everything({
        q: 'health',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10,
    }).then((response) => {
        res.json(response);
    });
});

//To query /v2/everything for sports
app.get('/api/news:category=sports', (req, res) => {
    newsapi.v2.everything({
        q: 'sports',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10,
    }).then((response) => {
        res.json(response);
    });
});

//Get top headlines
app.get('/api/news/top-headlines', (req, res) => {
    newsapi.v2.topHeadlines({
    language: 'en',
    }).then(response => {
    console.log(response);
    res.json(response);
    });
});

// Run the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});