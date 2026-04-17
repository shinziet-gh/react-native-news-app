import React from 'react'
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { useResponsive } from '../hooks/UseResponsive';
import { Button, Box, Text, HStack, VStack, Image } from "@gluestack-ui/themed";

export default function LeftPanel() {

    const [newsArticles, setNewsArticles] = useState<{ [key: string]: any }>({});

    //Get window dimensions
    const { width, height, isMobile } = useResponsive();

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

    useEffect(() => {
        categories.forEach(category => fetchNewsByCategory(category));

        console.log(newsArticles); // Log articles for the first category
    }, []);

    const handleClick = (urlLink: string) => {
        WebBrowser.openBrowserAsync(urlLink);
    }

    return (
        <Box>
            {categories.map((category, index) => (
                <Box key={index} m="$10" p="$5" shadowOpacity={0.1} shadowRadius={6}>
                    <Text bold fontSize="$lg" color='gray'>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Text>
                    {newsArticles[category]?.map((news: any, index: number) => (
                        <VStack key={news.url || index} onPress={() => handleClick(news.url)} mb="$12" mt="$5" gap="$3">
                            <Image
                                source={{ uri: news.urlToImage || 'https://media.istockphoto.com/id/946051730/photo/man-reading-newspaper-high-angle-view.jpg?s=1024x1024&w=is&k=20&c=-t9Dmmxv_LqZxYrCvqOx_EHyNG6erFLamTiwOC86U3M=' }}
                                alt="news image"
                                w="$full"
                                h="$full"
                                aspectRatio={16 / 9}
                                resizeMode="cover"
                            />

                            <Text color="$gray600">
                                {news.source?.name || "Unknown"} • {" "}
                                {news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : ''}
                            </Text>
                            <Text
                                bold
                                fontSize={"$2xl"}
                            >
                                {news.title}
                            </Text>
                        </VStack >
                    ))}
                </Box>
            ))}
        </Box>
    )
}