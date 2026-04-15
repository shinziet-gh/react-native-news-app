import React, { useState } from 'react'
import { useResponsive } from '../hooks/UseResponsive';
import { HStack, Box, Text, Pressable } from '@gluestack-ui/themed'

export default function NavigationBar(props: { handleClick: (arg0: string) => void; }) {    
    const [activeBtn, setActiveBtn] = useState('top-headlines');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    //Get window dimensions
    const { width, height, isMobile } = useResponsive();

    const tabs = [
        { key: 'top-headlines', label: 'Today\'s Headlines' },
        { key: 'tech', label: 'Technology' },
        { key: 'business', label: 'Business' },
        { key: 'health', label: 'Health' },
        { key: 'sports', label: 'Sports' },
    ];

    const handleTabPress = (tabKey: string) => {
        setActiveBtn(tabKey);
        props.handleClick(tabKey);
        if (isMobile) {
            setIsMenuOpen(false);
        }
    };

    return (
        <Box bg="white" width="$full">
            <HStack
                alignItems="center"
                justifyContent="space-between"
            >
                {isMobile ? (
                    <Pressable
                        px="$3"
                        py="$2"
                        bg="$gray200"
                        borderRadius="$md"
                        onPress={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <Text fontWeight="600">{isMenuOpen ? 'Close' : 'Menu'}</Text>
                    </Pressable>
                ) : null}
            </HStack>

            {isMobile ? (
                isMenuOpen ? (
                    <Box px="$2" pb="$3" bg="$gray100">
                        {tabs.map((tab) => {
                            const isActive = activeBtn === tab.key;
                            return (
                                <Pressable
                                    key={tab.key}
                                    onPress={() => handleTabPress(tab.key)}
                                    bg={isActive ? 'black' : 'transparent'}
                                    mb="$2"
                                >
                                    <Box py="$3" px="$3">
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
                    </Box>
                ) : null
            ) : (
                <HStack bg="$gray100" alignItems="center" width="$full">
                    {tabs.map((tab) => {
                        const isActive = activeBtn === tab.key;

                        return (
                            <Pressable
                                key={tab.key}
                                flex={1}
                                onPress={() => handleTabPress(tab.key)}
                                bg={isActive ? 'black' : 'transparent'}
                            >
                                <Box py="$3" alignItems="center">
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
