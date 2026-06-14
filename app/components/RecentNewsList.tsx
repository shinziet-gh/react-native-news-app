import { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button, Box, Text, HStack, VStack, Image, Pressable, Spinner } from "@gluestack-ui/themed";
import { Articles } from '../articles';
import { getArticles } from '../getArticles';
import { getEnv } from '../env';


export default function RecentNewsList() {
    const base_url = getEnv("BASE_URL");
    const [latestNews, setLatestNews] = useState<Articles[]>([]);

    const fetchLatestNews = async () => {
        try {
            const apiUrl = `${base_url}/api/news/newest`;

            const articles = await getArticles(apiUrl);
            setLatestNews(articles);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {

        fetchLatestNews();
    }, []);


    const handleClick = (urlLink: string) => {
        WebBrowser.openBrowserAsync(urlLink);
    }


    return (
        <>
            {latestNews.map((news, index) => (
                <Pressable key={news.url || index} onPress={() => {
                    if (news?.url) {
                        handleClick(news.url)
                    }
                }}
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
                        gap="$3"
                        position="absolute"
                        bottom="$0"
                        left="$0"
                        right="$0"

                    >
                        <VStack w="$full" p="$3" gap="$3" backgroundColor="rgba(255,255,255,0.8)">
                            <Text bold fontSize="$xl" marginRight="$12">
                                {news.title}
                            </Text>
                            <Text>
                                {news.source?.name || "Unknown"} • {" "}
                                {news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : ''}
                            </Text>
                        </VStack>

                    </HStack>
                </Pressable>
            ))}
        </>
    )
}