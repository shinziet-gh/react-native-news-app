import React from 'react'
import { Button, Box, Text, HStack, VStack, Image, Spinner } from "@gluestack-ui/themed";
import { useResponsive } from '../hooks/UseResponsive';

export default function NewsComponent({ news, isHeadlineStory, isLoading }: Readonly<{ news: object; isHeadlineStory: boolean, isLoading: boolean }>) {
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
            justifyContent='center'
        >
            {isLoading ? (
                <Spinner size="large" alignSelf='center' marginVertical="$16" />
            ) : (
                <>
                    {/* LEFT IMAGE */}
                    <Box flex={isHeadlineStory ? 2 : 1} style={{ display: isLoading ? 'none' : 'flex' }}>
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
                            fontSize={isHeadlineStory ? "$3xl" : "$xl"}
                        >
                            {news.title || ""}
                        </Text>

                        <Text fontSize={isHeadlineStory ? "$xl" : "$lg"} color="$gray600">
                            {news.source?.name || "Unknown"} • {" "}
                            {news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : ''}
                        </Text>

                        <Text
                            color="$gray700"
                            numberOfLines={2}
                            style={{ opacity: isHeadlineStory ? 0.9 : 1 }}
                            display={isHeadlineStory ? 'none' : 'flex'}
                        >
                            {news.description || ""}
                        </Text>

                        {/* READ MORE BUTTON */}
                        <Button size="lg" w={isHeadlineStory ? "$3/5" : "$1/3"} alignSelf="flex-end" marginTop={'auto'} bg="black" >
                            <Text color='white'>Read More</Text>
                        </Button>
                    </VStack>
                </>
            )}
        </HStack >
    )
}
