import { Box } from "@gluestack-ui/themed";
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

    // Loading spinner state
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

    return (
        <Box px="$4">
            <NewsDetail news={headlineStory} isHeadlineStory={true} isLoading={isLoading} />

            {newsArticles?.map((news, index) => (
                <Box
                    key={news?.url || index}
                    my="$4"
                    marginBottom={0}
                >
                    <NewsDetail news={news} isHeadlineStory={false} isLoading={isLoading} />
                </Box>
            ))}
        </Box>
    )
}