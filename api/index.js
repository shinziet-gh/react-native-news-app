import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
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

// Initialize News API key from environment variable
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

app.get('/', (req, res) => {
    res.json("Test endpoint working.")
})

app.get('/test', (req, res) => {
    res.json("Hello world")
})

//To query /v2/top-headlines by category
app.get('/api/news/category=:category', async (req, res) => {
    const category = req.params.category;
    const pageSize = req.query.pageSize;

    newsapi.v2.topHeadlines({
        category: category || "general",
        language: 'en',
        pageSize: pageSize || 10,
    }).then(response => {
        console.log(response);
        res.json(response);
    });
});

//To query /v2/everything by published date
app.get('/api/news/newest', async (req, res) => {
    newsapi.v2.everything({
        language: 'en',
        pageSize: 2,
        sortBy: 'publishedAt',
        sources: 'wired, cnn, nbc-news',
    }).then(response => {
        console.log(response);
        res.json(response);
    })
});

//To query /v2/everything by search query AND/OR dates
app.get('/api/news/search', async (req, res) => {
    const { query, from, to } = req.query;

    newsapi.v2.everything({
        language: 'en',
        q: query,
        fromDate: from || fromDate,
        toDate: to || toDate,
        pageSize: 10,
        sortBy: 'relevancy',
    }).then((response) => {
        res.json(response);
    });
});

// Run the server
if (process.env.NODE_ENV != "production") {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

// Export the Express app
export default app;