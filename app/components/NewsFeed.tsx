import React from 'react'
import { Box, Pressable, Text, HStack, VStack, Image } from "@gluestack-ui/themed";
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';

export default function News() {

    const [newsSources, setNewsSources] = React.useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/news`)
        .then(response => response.json())
        .then(data => {
            setNewsSources(data.articles);
            console.log(data.articles);
        })
        .catch(error => console.error(error));
    }, []);

    const handleClick = (urlLink: string) => {
        WebBrowser.openBrowserAsync(urlLink);
    }

    return (
        <Box flex={1} px="$4">
        {newsSources.map((news, index) => (
            <Pressable
            key={news.url || index}
            onPress={() => handleClick(news.url)}
            my="$2"
            >
            <HStack
                space="md"
                p="$3"
                borderRadius="$xl"
                backgroundColor="$white"
                shadowColor="$black"
                shadowOpacity={0.1}
                shadowRadius={6}
                elevation={3}
                alignItems="center"
            >
                
                {/* LEFT IMAGE */}
                {news.urlToImage ? (
                <Image
                    source={{ uri: news.urlToImage }}
                    alt="news image"
                    style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    }}
                />
                ) : (
                <Box
                    width={80}
                    height={80}
                    borderRadius="$lg"
                    backgroundColor="$gray200"
                />
                )}

                {/* RIGHT CONTENT */}
                <VStack flex={1} space="xs">
                <Text bold fontSize="$sm" numberOfLines={2}>
                    {news.title}
                </Text>

                <Text fontSize="$xs" color="$gray600">
                    {news.author || "Unknown"} •{" "}
                    {new Date(news.publishedAt).toLocaleDateString()}
                </Text>

                <Text fontSize="$xs" color="$gray700" numberOfLines={2}>
                    {news.description}
                </Text>
                </VStack>

            </HStack>
            </Pressable>
        ))}
        </Box>
    )
}