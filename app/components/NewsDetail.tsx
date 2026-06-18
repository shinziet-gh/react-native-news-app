import React from 'react'
import { Button, Box, Text, HStack, VStack, Image } from "@gluestack-ui/themed";
import { useResponsive } from '../hooks/UseResponsive';
import { Articles } from "../articles"
import { LoadingSpinner } from './LoadingSpinner';

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
                            fontSize={isMobile ? "$lg" : isTablet ? "$xl" : "$2xl"}
                        >
                            {news?.title || ""}
                        </Text>

                        <Text
                            color="#9CA3AF"
                            fontSize={isMobile ? "$sm" : isTablet ? "$md" : "$xl"}
                            fontWeight="$medium"
                        >
                            {news?.source?.name || "Unknown"}
                            <Text
                                color="#9CA3AF"
                                fontSize={isMobile ? "$sm" : isTablet ? "$md" : "$xl"}
                            >
                                {" "}• {news?.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : ''}
                            </Text>
                        </Text>

                        <Text
                            color="$gray700"
                            numberOfLines={3}
                            ellipsizeMode="clip"
                            isTruncated={true}
                            fontSize={isMobile ? "$xs" : "$sm"}
                        >
                            {news?.description || ""}
                        </Text>

                        {/* READ MORE BUTTON */}
                        <Button size={isMobile || isTablet ? "md" : "lg"}
                            alignSelf="flex-end" marginTop={'auto'} bg="black" >
                            <Text
                                color='white'
                                fontSize={isMobile ? "$sm" : "$md"}
                            >
                                Read More</Text>
                        </Button>
                    </VStack>
                </>
            )
            }
        </HStack >
    )
}
