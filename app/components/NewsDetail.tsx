import React from 'react'
import { Button, Box, Text, HStack, VStack, Image } from "@gluestack-ui/themed";
import { useResponsive } from '../hooks/UseResponsive';
import { Articles } from "../articles"
import { LoadingSpinner } from './LoadingSpinner';
import { buttonWidth, fontSizes } from './styles/styles';

export default function NewsDetail({ news, isHeadlineStory, isLoading }: Readonly<{ news: Articles; isHeadlineStory: boolean, isLoading: boolean }>) {
    const { width, height, isMobile, isTablet, isDesktop } = useResponsive();

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
                <LoadingSpinner />
            ) : (
                <>
                    {/* LEFT IMAGE */}
                    <Box flex={isHeadlineStory ? 2 : 1}>
                        <Image
                            source={{ uri: news?.urlToImage || 'https://media.istockphoto.com/id/946051730/photo/man-reading-newspaper-high-angle-view.jpg?s=1024x1024&w=is&k=20&c=-t9Dmmxv_LqZxYrCvqOx_EHyNG6erFLamTiwOC86U3M=' }}
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
                            fontSize={
                                isMobile ? "$2xl" :
                                    isTablet ? "$3xl" : "$4xl"
                            }
                        >
                            {news?.title || ""}
                        </Text>

                        <Text fontSize={
                            isMobile ? "$xl" :
                                isTablet ? "$2xl" : "$3xl"

                        } color="$gray600">
                            {news?.source?.name || "Unknown"} • {" "}
                            {news?.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : ''}
                        </Text>

                        <Text
                            color="$gray700"
                            numberOfLines={2}
                            style={{ opacity: isHeadlineStory ? 0.9 : 1 }}
                            display={isHeadlineStory ? 'none' : 'flex'}
                            fontSize={
                                isMobile ? "$2xl" :
                                    isTablet ? "$3xl" : "$4xl"
                            }
                        >
                            {news?.description || ""}
                        </Text>

                        {/* READ MORE BUTTON */}
                        <Button size="lg" w={
                            isMobile ? "$3/5" :
                                isTablet ? "$1/3" : "$1/2"

                        } alignSelf="flex-end" marginTop={'auto'} bg="black" >
                            <Text color='white'>Read More</Text>
                        </Button>
                    </VStack>
                </>
            )
            }
        </HStack >
    )
}
