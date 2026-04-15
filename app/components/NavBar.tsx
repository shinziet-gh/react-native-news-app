import React, { useState } from 'react'
import { HStack, Box, Text, Pressable } from '@gluestack-ui/themed'

export default function NavigationBar(props: { handleClick: (arg0: string) => void; }) {    
    
    const [activeBtn, setActiveBtn] = useState('newsfeed');

    const tabs = [
    { key: 'top-headlines', label: 'Top News' },
    { key: 'tech', label: 'Technology' },
    { key: 'business', label: 'Business' },
    { key: 'health', label: 'Health' },
    { key: 'sports', label: 'Sports' },
    ];

    return (
        <HStack
        bg="$gray100"
        px="$3"
        py="$2"
        borderRadius="$xl"
        alignItems="center"
        width="$full"
        >
        {tabs.map((tab) => {
            const isActive = activeBtn === tab.key;

            return (
            <Pressable
                key={tab.key}
                flex={1}
                onPress={() => {
                setActiveBtn(tab.key);
                props.handleClick(tab.key);
                }}
                borderRadius="$lg"
                bg={isActive ? '#0077E6' : 'transparent'}
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
    )
}