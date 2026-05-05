import { Box, Pressable } from "@gluestack-ui/themed";
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { useResponsive } from '../hooks/UseResponsive';
import NewsComponent from './NewsComponent';
import { getEnv } from "../env";

export default function NewsPage({ params }: Readonly<{ params: { category: string; searchQuery: string; fromDate: string; toDate: string; } }>) {
    const base_url = getEnv("BASE_URL");

    //State variable to store news articles
    const [newsArticles, setNewsArticles] = useState([]);
    const [headlineStory, setHeadlineStory] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    //Get window dimensions
    const { width, height, isMobile } = useResponsive();

    useEffect(() => {
        let { category, searchQuery, fromDate, toDate } = params;

        setIsLoading(true); //Show loading spinner

        fetchNews(category, searchQuery, fromDate, toDate);

    }, [params]);

    const fetchNews = async (category: string, searchQuery: string, fromDate: string, toDate: string) => {
        try {
            //Fetch news by category
            let apiUrl = `${base_url}/api/news/category=${category}`;

            //Else, Fetch news by search query when triggered
            if (searchQuery) {
                const params = new URLSearchParams({
                    query: searchQuery,
                    from: fromDate ?? "",
                    to: toDate ?? ""
                });

                apiUrl = `${base_url}/api/news/search?${params}`;
            }
            const response = await fetch(apiUrl);
            const data = await response.json();
            setHeadlineStory(data.articles[0]); //Set first article fetched as headline story
            setNewsArticles(data.articles.slice(1)); // Set the rest of articles as newsArticles

            setIsLoading(false); //Hide loading spinner

            //Use unknown type for fetched data, then cast to object type if the articles property is contained inside data.
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data: unknown) => {
                    if (hasArticles(data)) {
                        console.log("articles", data.articles);
                    }
                });
            function hasArticles(data: any): data is { articles: object } {
                return "articles" in data;
            }
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
            <NewsComponent news={headlineStory} isHeadlineStory={true} isLoading={isLoading} />

            {newsArticles.map((news, index) => (
                <Pressable
                    key={news.url || index}
                    onPress={() => handleClick(news.url)}
                    my="$4"
                    marginBottom={0}
                >
                    <NewsComponent news={news} isHeadlineStory={false} isLoading={isLoading} />
                </Pressable>
            ))}
        </Box>
    )
}