import React, { useState } from 'react'
import { useResponsive } from '../hooks/UseResponsive';
import { HStack, Box, Text, Pressable } from '@gluestack-ui/themed'

export default function NavigationBar(props: Readonly<{ handleClick: (arg0: string) => void; }>) {
    const [activeBtn, setActiveBtn] = useState('top-headlines');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    //Get window dimensions
    const { width, height, isMobile } = useResponsive();

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
        props.handleClick(tabKey);
        if (isMobile) {
            setIsMenuOpen(false);
        }
    };

    return (
        <HStack alignItems="center" width="$full">
            {tabs.map((tab) => {
                const isActive = activeBtn === tab.key;
                return (
                    <Pressable
                        key={tab.key}
                        flex={1}
                        onPress={() => handleTabPress(tab.key)}
                        bg={isActive ? 'black' : 'transparent'}
                        borderRadius="$sm"
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
    )
}
