import React from 'react'
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { useResponsive } from '../hooks/UseResponsive';
import { Button, Box, Text, HStack, VStack, Image, Pressable, Spinner } from "@gluestack-ui/themed";
import { getEnv } from '../env';
import { Articles } from '../articles';
import { getArticles } from '../getArticles';

export default function CategoryNewsList() {
    const base_url = getEnv("BASE_URL");

    const [newsArticles, setNewsArticles] = useState<{ [key: string]: Articles[] }>({});

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

            const articles = await getArticles(apiUrl);
            setNewsArticles(prev => ({
                ...prev,
                [category]: articles
            }));


        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        categories.forEach(category => fetchNewsByCategory(category));

    }, []);

    const handleClick = (urlLink: string) => {
        WebBrowser.openBrowserAsync(urlLink);
    }

    return (
        <>

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
                            <Pressable gap="$2.5" onPress={() => {
                                if (news?.url) {
                                    handleClick(news.url)
                                }
                            }}>
                                <Image
                                    source={{ uri: news?.urlToImage || 'https://media.istockphoto.com/id/946051730/photo/man-reading-newspaper-high-angle-view.jpg?s=1024x1024&w=is&k=20&c=-t9Dmmxv_LqZxYrCvqOx_EHyNG6erFLamTiwOC86U3M=' }}
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
                                    {news?.title}
                                </Text>
                                <Text color="$gray600">
                                    {news?.source?.name || "Unknown"} • {" "}
                                    {news?.publishedAt ? new Date(news?.publishedAt).toLocaleDateString() : ''}
                                </Text>
                            </Pressable>
                        </VStack >
                    ))}
                </Box>
            ))
            }
        </ >
    )
}