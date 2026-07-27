import React, { useEffect, useState } from 'react'
import { useResponsive } from '../hooks/UseResponsive';
import { HStack, VStack, Box, Text, Pressable } from '@gluestack-ui/themed'
import { NewsCategory } from '../articles';

export default function NavigationBar({ handleClick, isMenuOpen }: { handleClick: (arg0: string) => void; isMenuOpen: boolean }) {
    const [activeBtn, setActiveBtn] = useState('top');

    //Get window dimensions
    const { width, height, isMobile, isTablet, isDesktop } = useResponsive();

    //Navigation tabs for different news categories
    const tabs = NewsCategory.options.map((category: string) => ({
        key: category,
        label: category == 'top' ? 'Top News' : category.charAt(0).toUpperCase() + category.slice(1)
    }));

    //Pass category to parent via callback prop
    const handleTabPress = (tabKey: string) => {
        setActiveBtn(tabKey);
        handleClick(tabKey);
    };

    return (
        <Box>
            {/* Tablet or Mobile View */}
            {isMenuOpen && (isTablet || isMobile) ? (
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

            ) : (
                /* Desktop View */
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