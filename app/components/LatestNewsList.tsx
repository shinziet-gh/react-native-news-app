import { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button, Box, Text, HStack, VStack, Image, Pressable, Spinner } from "@gluestack-ui/themed";
import { Articles } from '../articles';
import { getArticles } from '../getArticles';
import { getEnv } from '../env';
import { LoadingSpinner } from "./LoadingSpinner";
import { useResponsive } from '../hooks/UseResponsive';
import NotFound from './NotFound';

export default function RecentNewsList() {
    const base_url = getEnv("BASE_URL");
    const { width, height, isMobile, isTablet, isDesktop } = useResponsive();

    const [latestNews, setLatestNews] = useState<typeof Articles[]>([]);
    // Loading spinner state
    const [isLoading, setIsLoading] = useState(true);

    const fetchLatestNews = async () => {
        try {
            const apiUrl = `${base_url}/api/news/newest`;

            const articles = await getArticles(apiUrl);
            setLatestNews(articles);
            setIsLoading(false); //Hide loading spinner

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setIsLoading(true); //Show loading spinner

        fetchLatestNews();
    }, []);


    const handleClick = (urlLink: string) => {
        WebBrowser.openBrowserAsync(urlLink);
    }

    return (
        <Box>
            <Text fontWeight={400} fontSize="$lg" pb="$1.5" w="$full" borderBottomWidth='$1'>
                Latest News
            </Text>

            <Box>
                {!isLoading && latestNews.length == 0 ? (
                    <NotFound />

                ) : (
                    latestNews.map((news, index) => (
                        <Pressable key={news.url || index} onPress={() => {
                            if (news?.url) {
                                handleClick(news.url)
                            }
                        }}
                        >
                            {isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <Box
                                    marginVertical="$3"
                                    shadowOpacity={0.1}
                                    shadowRadius={6}
                                    marginTop="$5"
                                >
                                    <Image
                                        source={{ uri: news.urlToImage || 'https://media.istockphoto.com/id/946051730/photo/man-reading-newspaper-high-angle-view.jpg?s=1024x1024&w=is&k=20&c=-t9Dmmxv_LqZxYrCvqOx_EHyNG6erFLamTiwOC86U3M=' }}
                                        alt="news image"
                                        w="$full"
                                        h="$full"
                                        aspectRatio={5 / 3}
                                        resizeMode="contain"
                                        backgroundColor='black'
                                    />

                                    <HStack
                                        position="absolute"
                                        bottom="$0"
                                        left="$0"
                                        right="$0"
                                    >
                                        <VStack w="$full" p="$3" backgroundColor="rgba(255,255,255,0.8)">
                                            <Text
                                                bold
                                                fontSize={width > 1024 && width < 1400 ? "$md" : "$xl"}
                                                marginRight="$12"
                                            >
                                                {news.title}
                                            </Text>
                                            <Text
                                                fontSize={width > 1024 && width < 1400 ? "$sm" : "$md"}
                                            >
                                                {news.source?.name || "Unknown"} • {" "}
                                                {news.publishedAt ? new Date(news.publishedAt).toLocaleDateString("en-GB") : ''}
                                            </Text>
                                        </VStack>

                                    </HStack>
                                </Box>
                            )}
                        </Pressable>
                    ))

                )}
            </Box>
        </Box>
    )
}