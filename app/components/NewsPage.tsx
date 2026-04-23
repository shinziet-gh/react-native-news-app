import { Box, Pressable } from "@gluestack-ui/themed";
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { useResponsive } from '../hooks/UseResponsive';
import NewsComponent from './NewsComponent';

export default function NewsPage({ params }: Readonly<{ params: { category: string; searchQuery: string; fromDate: string; toDate: string; } }>) {

    //State variable to store news articles
    const [newsArticles, setNewsArticles] = useState([]);
    const [headlineStory, setHeadlineStory] = useState([]);

    //Get window dimensions
    const { width, height, isMobile } = useResponsive();

    useEffect(() => {
        let { category, searchQuery, fromDate, toDate } = params;
        fetchNews(category, searchQuery, fromDate, toDate);
    }, [params]);

    const fetchNews = async (category: string, searchQuery: string, fromDate: string, toDate: string) => {
        try {
            //Fetch news by category
            let apiUrl = `http://localhost:3000/api/news/category=${category}`;

            //Else, Fetch news by search query when triggered
            if (searchQuery) {
                const params = new URLSearchParams({
                    query: searchQuery,
                    from: fromDate ?? "",
                    to: toDate ?? ""
                });

                apiUrl = `http://localhost:3000/api/news/search?${params}`;
            }
            const response = await fetch(apiUrl);
            const data = await response.json();
            setHeadlineStory(data.articles[0]); //Set first article fetched as headline story
            setNewsArticles(data.articles.slice(1)); // Set the rest of articles as newsArticles

        } catch (error) {
            console.error(error);
        }
    };

    //Open URL link on new window on click
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