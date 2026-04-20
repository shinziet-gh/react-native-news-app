import React from 'react'
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { useResponsive } from '../hooks/UseResponsive';
import { Button, Box, Text, HStack, VStack, Image, Pressable } from "@gluestack-ui/themed";

export default function LeftPanel() {

    const [newsArticles, setNewsArticles] = useState<{ [key: string]: any }>({});
    const [latestNews, setLatestNews] = useState([]);

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
            const apiUrl = `http://localhost:3000/api/news/category=${category}`;
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
            const apiUrl = `http://localhost:3000/api/news/newest`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            setLatestNews(data.articles);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        //categories.forEach(category => fetchNewsByCategory(category));
        //fetchLatestNews();
    }, []);

    const handleClick = (urlLink: string) => {
        WebBrowser.openBrowserAsync(urlLink);
    }

    return (
        <Box gap="$12" paddingHorizontal="$12" marginTop="$8">

            {/* Latest News Content */}
            <Pressable onHoverIn={() => setIsHovered(true)} onHoverOut={() => setIsHovered(false)}>
                <Text fontWeight={isHovered ? 200 : 100} fontSize="$2xl" mb="-$6" alignSelf="flex-start">
                    Latest News &gt;
                </Text>
            </Pressable>

            {latestNews.map((news, index) => (
                <Pressable key={news.url || index} onPress={() => handleClick(news.url)}>
                    <Image
                        source={{ uri: news.urlToImage || 'https://media.istockphoto.com/id/946051730/photo/man-reading-newspaper-high-angle-view.jpg?s=1024x1024&w=is&k=20&c=-t9Dmmxv_LqZxYrCvqOx_EHyNG6erFLamTiwOC86U3M=' }}
                        alt="news image"
                        w="$full"
                        h="$full"
                        aspectRatio={3 / 3}
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
                </Pressable>
            )
            )}

            {/* News Content by Category */}
            {categories.map((category, index) => (
                <Box key={category || index}>
                    <Text color="$black" letterSpacing="$xl" pb="$1.5" w="$full" borderBottomWidth='$1'>
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
                                    fontSize={"$2xl"}
                                >
                                    {news.title}
                                </Text>
                                <Text color="$gray600">
                                    {news.source?.name || "Unknown"} • {" "}
                                    {news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : ''}
                                </Text>
                            </Pressable>
                        </VStack >
                    ))}
                </Box>
            ))
            }
        </Box >
    )
}