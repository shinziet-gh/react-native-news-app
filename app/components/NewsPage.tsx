import { Box, Pressable } from "@gluestack-ui/themed";
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { useResponsive } from '../hooks/UseResponsive';
import NewsComponent from './NewsComponent';
import { getEnv } from "../env";
import { Articles } from "../articles";
import { getArticles } from "../getArticles";

export default function NewsPage({ params }: Readonly<{ params: { category: string; searchQuery: string; fromDate: string; toDate: string; } }>) {
    const base_url = getEnv("BASE_URL");

    //State variable to store news articles
    const [newsArticles, setNewsArticles] = useState<Articles[] | null>([]);
    const [headlineStory, setHeadlineStory] = useState<Articles | null>(null);

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

            const articles = await getArticles(apiUrl);
            setHeadlineStory(articles[0]);
            setNewsArticles(articles?.slice(1));


            setIsLoading(false); //Hide loading spinner
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

            {newsArticles?.map((news, index) => (
                <Pressable
                    key={news?.url || index}
                    onPress={() => {
                        if (news?.url) {
                            handleClick(news.url);
                        }
                    }}
                    my="$4"
                    marginBottom={0}
                >
                    <NewsComponent news={news} isHeadlineStory={false} isLoading={isLoading} />
                </Pressable>
            ))}
        </Box>
    )
}