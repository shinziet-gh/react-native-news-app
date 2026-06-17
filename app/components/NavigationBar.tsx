import React, { useEffect, useState } from 'react'
import { useResponsive } from '../hooks/UseResponsive';
import { HStack, VStack, Box, Text, Pressable } from '@gluestack-ui/themed'

export default function NavigationBar({ handleClick, updateHeader }: { handleClick: (arg0: string) => void; updateHeader: (arg0: boolean) => void }) {
    const [activeBtn, setActiveBtn] = useState('general');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        updateHeader(isMenuOpen)

    }, [isMenuOpen])

    //Get window dimensions
    const { width, height, isMobile, isTablet, isDesktop } = useResponsive();

    //Navigation tabs for different news categories
    const tabs = [
        { key: 'general', label: 'Top News' },
        { key: 'business', label: 'Business' },
        { key: 'health', label: 'Health' },
        { key: 'science', label: 'Science' },
        { key: 'technology', label: 'Technology' },
    ];

    //Pass category to parent via callback prop
    const handleTabPress = (tabKey: string) => {
        setActiveBtn(tabKey);
        handleClick(tabKey);
        if (isMobile || isTablet) {
            setIsMenuOpen(false);
        }
    };

    const showButton = isMobile || isTablet;

    return (
        <Box>
            {showButton ? (
                <VStack space="sm">
                    {/* Menu Button */}
                    <HStack alignItems="center" justifyContent="space-between" px="$4" py="$3">
                        <Pressable
                            onPress={() => setIsMenuOpen(!isMenuOpen)}
                            p="$2"
                        >
                            <Text fontSize="$2xl" fontWeight="700">☰</Text>
                        </Pressable>
                    </HStack>

                    {/* Tablet/Mobile Mode */}
                    {isMenuOpen && (
                        <VStack
                            backgroundColor="white"
                            borderBottomWidth={1}
                            borderColor="#eee"
                            padding="$4"
                            style={{
                                position: 'relative',
                                top: 0,
                                left: 0,
                                right: 0,
                                zIndex: 9999,
                                width: width * 0.9
                            }}
                        >
                            <HStack justifyContent="flex-end" pb="$2">
                                <Pressable onPress={() => setIsMenuOpen(false)} p="$2">
                                    <Text fontSize="$2xl" fontWeight="700">✕</Text>
                                </Pressable>
                            </HStack>

                            {tabs.map((tab) => {
                                const isActive = activeBtn === tab.key;
                                return (
                                    <Pressable
                                        key={tab.key}
                                        onPress={() => handleTabPress(tab.key)}
                                        bg={isActive ? 'black' : 'transparent'}
                                        borderRadius="$sm"
                                        px="$4"
                                        width="$full"
                                    >
                                        <Box py="$3" alignItems="flex-start">
                                            <Text
                                                color={isActive ? 'white' : '$coolGray600'}
                                                fontWeight={isActive ? '600' : '400'}
                                            >
                                                {tab.label}
                                            </Text>
                                        </Box>
                                    </Pressable>
                                );
                            })}
                        </VStack>
                    )}
                </VStack>
            ) : (
                /* Desktop Mode */
                <HStack alignItems="center" justifyContent='space-around' px="$4" py="$2">
                    {tabs.map((tab) => {
                        const isActive = activeBtn === tab.key;
                        return (
                            <Pressable
                                key={tab.key}
                                onPress={() => handleTabPress(tab.key)}
                                bg={isActive ? 'black' : 'transparent'}
                                borderRadius="$sm"
                                px="$5"
                            >
                                <Box py="$4" alignItems="center">
                                    <Text
                                        color={isActive ? 'white' : '$coolGray600'}
                                        fontWeight={isActive ? '600' : '400'}
                                    >
                                        {tab.label}
                                    </Text>
                                </Box>
                            </Pressable>
                        );
                    })}
                </HStack>
            )}
        </Box>
    )
}