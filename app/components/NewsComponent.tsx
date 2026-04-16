import React from 'react'
import { Button, Box, Text, HStack, VStack, Image } from "@gluestack-ui/themed";
import { useResponsive } from '../hooks/UseResponsive';

export default function NewsComponent({ news, isHeadlineStory }: { news: object; isHeadlineStory: boolean }) {
    //Get window dimensions
    const { width, height, isMobile } = useResponsive();

    return (
        <HStack
            space="md"
            p="$3"
            backgroundColor="$white"
            shadowColor="$black"
            shadowOpacity={0.1}
            shadowRadius={6}
        >
            {/* LEFT IMAGE */}
            <Box flex={isHeadlineStory ? 2 : 1}>
                <Image
                    source={{ uri: news.urlToImage || 'https://media.istockphoto.com/id/946051730/photo/man-reading-newspaper-high-angle-view.jpg?s=1024x1024&w=is&k=20&c=-t9Dmmxv_LqZxYrCvqOx_EHyNG6erFLamTiwOC86U3M=' }}
                    alt="news image"
                    w="$full"
                    h="$full"
                    aspectRatio={16 / 9}
                    resizeMode="cover"
                />
            </Box>

            {/* TITLE AND DESCRIPTION */}
            <VStack flex={1} alignSelf="stretch" px="$3" py="$3" space='xl' justifyContent='flex-start' >
                <Text
                    bold
                    fontSize={isHeadlineStory ? "$4xl" : "$2xl"}
                >
                    {news.title}
                </Text>

                <Text fontSize={isHeadlineStory ? "$2xl" : "$xl"} color="$gray600">
                    {news.source?.name || "Unknown"} • {" "}
                    {news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : ''}
                </Text>

                <Text
                    fontSize={isHeadlineStory ? "$2xl" : "$lg"}
                    color="$gray700"
                    numberOfLines={isHeadlineStory ? 4 : 2}
                    style={{ opacity: isHeadlineStory ? 0.9 : 1 }}
                    display={isHeadlineStory ? 'none' : 'flex'}
                >
                    {news.description}
                </Text>

                {/* READ MORE BUTTON */}
                <Button size="lg" w={isHeadlineStory ? "$2/5" : "$1/4"} alignSelf="flex-end" marginTop={'auto'} bg="black" >
                    <Text color='white'>Read More</Text>
                </Button>
            </VStack>
        </HStack >
    )
}
