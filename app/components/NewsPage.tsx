import React from 'react'
import { Box, Pressable } from "@gluestack-ui/themed";
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { useResponsive } from '../hooks/UseResponsive';
import NewsComponent from './NewsComponent';

export default function NewsPage({ category }: { category: string }) {

    //Const state to store news articles
    const [newsArticles, setNewsArticles] = useState([]);
    const [headlineStory, setHeadlineStory] = useState([]);

    //Get window dimensions
    const { width, height, isMobile } = useResponsive();

    //Async function to fetch news articles based on the category
    const fetchNews = async () => {
        try {
            console.log('Category:', category);
            const apiUrl = category ? `http://localhost:3000/api/news:category=${category}` : 'http://localhost:3000/api/news/top-headlines';
            const response = await fetch(apiUrl);
            const data = await response.json();
            setHeadlineStory(data.articles[0]);
            setNewsArticles(data.articles.slice(1)); // Set the rest of the articles as newsArticles
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNews();
        console.log('Fetched news articles:', newsArticles);
        console.log('Fetched headline story:', headlineStory);
    }, [category]); // Call useEffect whenever the category changes

    const handleClick = (urlLink: string) => {
        WebBrowser.openBrowserAsync(urlLink);
    }

    return (
        <Box px="$4">
            <NewsComponent news={headlineStory} isHeadlineStory={true} />
            {newsArticles.map((news, index) => (
                <Pressable
                    key={news.url || index}
                    onPress={() => handleClick(news.url)}
                    my="$4"
                    marginBottom={0}
                >
                    <NewsComponent news={news} isHeadlineStory={false} />
                </Pressable>
            ))}
        </Box>
    )
}