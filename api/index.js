import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import NewsAPI from 'newsapi';

//Load environment variables
dotenv.config();

//Create an Express application
const app = express();
const port = 3000;

app.use(cors());

//Get date 7 days ago
const today = new Date();
const sevenDaysAgo = new Date(today);
sevenDaysAgo.setDate(today.getDate() - 7);
const fromDate = sevenDaysAgo.toISOString().split('T')[0];
const toDate = today.toISOString().split('T')[0];

//News Sources
const newsSources = [
    'the-guardian',
    'the-wall-street-journal',
    'the-new-york-times',
    'al-jazeera-english',
    'google-news',
    'time',
    'the-economist',
    'financial-times',
];

// Initialize News API key from environment variable
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

//To query /v2/top-headlines for technology
app.get('/api/news:category=tech', (req, res) => {
    newsapi.v2.topHeadlines({
        country: 'us',
        category: 'technology',
        pageSize: 10,
    }).then((response) => {
        res.json(response);
    });
});

//To query /v2/top-headlines for business
app.get('/api/news:category=business', (req, res) => {
    newsapi.v2.topHeadlines({
        country: 'us',
        category: 'business',
        pageSize: 10,
    }).then((response) => {
        res.json(response);
    });
});

//To query /v2/top-headlines for health
app.get('/api/news:category=health', (req, res) => {
    newsapi.v2.topHeadlines({
        country: 'us',
        category: 'health',
        pageSize: 10,
    }).then((response) => {
        res.json(response);
    });
});

//To query /v2/top-headlines for sports
app.get('/api/news:category=sports', (req, res) => {
    newsapi.v2.topHeadlines({
        country: 'us',
        category: 'sports',
        pageSize: 10,
    }).then((response) => {
        res.json(response);
    });
});

//To query /v2/top-headlines by popularity
app.get('/api/news/top-headlines', (req, res) => {
    newsapi.v2.topHeadlines({
    country: 'us',
    pageSize: 10,
    }).then(response => {
    console.log(response);
    res.json(response);
    });
});

//To query /v2/everything by published date
app.get('/api/news/latest', (req, res) => {
    newsapi.v2.everything({
    language: 'en',
    sources: newsSources.join(','),
    pageSize: 10,
    sortBy: 'publishedAt',
    from: fromDate,
    to: toDate,
    }).then(response => {
    console.log(response);
    res.json(response);
    });
});

// Run the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});