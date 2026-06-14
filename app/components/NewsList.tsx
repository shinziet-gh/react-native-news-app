import { Box, Pressable } from "@gluestack-ui/themed";
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { useResponsive } from '../hooks/UseResponsive';
import NewsDetail from './NewsDetail';
import { getEnv } from "../env";
import { Articles } from "../articles";
import { getArticles } from "../getArticles";

export default function NewsPage({ params }: Readonly<{ params: { category: string; searchQuery: string; fromDate: string; toDate: string; } }>) {
    const base_url = getEnv("BASE_URL");

    //State variable to store news articles
    const [newsArticles, setNewsArticles] = useState<Articles[] | null>([]);
    const [headlineStory, setHeadlineStory] = useState<Articles | null>(null);

    //Get window dimensions
    const { width, height, isMobile } = useResponsive();

    useEffect(() => {
        let { category, searchQuery, fromDate, toDate } = params;

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
            <NewsDetail news={headlineStory} isHeadlineStory={true} />

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
                    <NewsDetail news={news} isHeadlineStory={false} />
                </Pressable>
            ))}
        </Box>
    )
}