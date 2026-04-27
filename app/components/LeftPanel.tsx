import React from 'react'
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { useResponsive } from '../hooks/UseResponsive';
import { Button, Box, Text, HStack, VStack, Image, Pressable, Spinner } from "@gluestack-ui/themed";
import { getEnv } from '../env';

export default function LeftPanel() {
    const base_url = getEnv("BASE_URL");

    const [newsArticles, setNewsArticles] = useState<{ [key: string]: any }>({});
    const [latestNews, setLatestNews] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    //Get window dimensions
    const { width, height, isMobile } = useResponsive();

    const [isHovered, setIsHovered] = useState(false);

    //List of categories
    const categories = [
        'entertainment',
        'sports',
    ];

    const fetchNewsByCategory = async (category: string) => {
        try {
            //Set optional pageSize parameter
            const params = new URLSearchParams({
                pageSize: "2"
            });
            const apiUrl = `${base_url}/api/news/category=${category}?${params}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            setNewsArticles(prev => ({
                ...prev,
                [category]: data.articles
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchLatestNews = async () => {
        try {
            const apiUrl = `${base_url}/api/news/newest`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            setLatestNews(data.articles);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setIsLoading(true); //Show loading spinner

        categories.forEach(category => fetchNewsByCategory(category));
        fetchLatestNews();

        setIsLoading(false); //Hide loading spinner
    }, []);

    const handleClick = (urlLink: string) => {
        WebBrowser.openBrowserAsync(urlLink);
    }

    return (
        <Box gap="$12" paddingHorizontal="$12" marginTop="$6">

            {/* Latest News Content */}
            <Pressable onHoverIn={() => setIsHovered(true)} onHoverOut={() => setIsHovered(false)}>
                <Text fontWeight={isHovered ? 200 : 100} fontSize="$2xl" mb="-$6" alignSelf="flex-start">
                    Latest News &gt;
                </Text>
            </Pressable>

            {latestNews.map((news, index) => (
                <Pressable key={news.url || index} onPress={() => handleClick(news.url)}>
                    {isLoading ? (
                        <Spinner size="large" alignSelf='center' marginVertical="$9" />
                    ) : (
                        <>
                            <Image
                                source={{ uri: news.urlToImage || 'https://media.istockphoto.com/id/946051730/photo/man-reading-newspaper-high-angle-view.jpg?s=1024x1024&w=is&k=20&c=-t9Dmmxv_LqZxYrCvqOx_EHyNG6erFLamTiwOC86U3M=' }}
                                alt="news image"
                                w="$full"
                                h="$full"
                                aspectRatio={5 / 4}
                                resizeMode="contain"
                                backgroundColor='black'
                            />

                            <HStack
                                gap="$3"
                                pl="$1"
                                pb="$3"
                                position="absolute"
                                bottom="$3"
                                left="$3"
                                right="$3"
                            >
                                <VStack w="$full" gap="$3" >
                                    <Text bold color='white' fontSize="$2xl" marginRight="$12">
                                        {news.title}
                                    </Text>
                                    <Text color='white'>
                                        {news.source?.name || "Unknown"} • {" "}
                                        {news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : ''}
                                    </Text>
                                </VStack>

                            </HStack>
                        </>
                    )}
                </Pressable>
            )
            )}

            {/* News Content by Category */}
            {categories.map((category, index) => (
                <Box key={category || index}>
                    <Text fontWeight={400} fontSize="$lg" pb="$1.5" w="$full" borderBottomWidth='$1'>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Text>

                    {newsArticles[category]?.map((news: any, index: number) => (
                        <VStack
                            key={news.url || index}
                            marginVertical="$3"
                            shadowOpacity={0.1}
                            shadowRadius={6}
                            p="$3"
                            marginTop="$5"
                        >
                            <Pressable gap="$2.5" onPress={() => handleClick(news.url)}>
                                {isLoading ? (
                                    <Spinner size="large" alignSelf='center' marginVertical="$9" />
                                ) : (
                                    <>
                                        <Image
                                            source={{ uri: news.urlToImage || 'https://media.istockphoto.com/id/946051730/photo/man-reading-newspaper-high-angle-view.jpg?s=1024x1024&w=is&k=20&c=-t9Dmmxv_LqZxYrCvqOx_EHyNG6erFLamTiwOC86U3M=' }}
                                            alt="news image"
                                            w="$full"
                                            h="$full"
                                            aspectRatio={16 / 9}
                                            resizeMode="contain"
                                            backgroundColor='#525252'
                                        />
                                        <Text
                                            bold
                                            fontSize={"$xl"}
                                        >
                                            {news.title}
                                        </Text>
                                        <Text color="$gray600">
                                            {news.source?.name || "Unknown"} • {" "}
                                            {news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : ''}
                                        </Text>
                                    </>
                                )}
                            </Pressable>
                        </VStack >
                    ))}
                </Box>
            ))
            }
        </Box >
    )
}