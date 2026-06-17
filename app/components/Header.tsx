import { Box, HStack, Text, VStack, Pressable } from '@gluestack-ui/themed';
import NavigationBar from './NavigationBar';
import SocialMedia from './SocialMedia';
import SearchBar from './SearchBar';
import { useResponsive } from '../hooks/UseResponsive';
import { useState } from 'react';

export default function Header({ handleTabClick, handleNavSearchEnter }: { readonly handleTabClick: (category: string) => void; readonly handleNavSearchEnter: (searchQuery: string) => void }) {
    //Get window dimensions
    const { width, height, isMobile, isTablet, isDesktop } = useResponsive();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <Box>
            {isDesktop ?
                (
                    <HStack justifyContent='space-between' alignItems='center' backgroundColor='white' px="$12" py="$2" m="$5">
                        <Text bold fontSize="$xl"> DailyNews</Text>

                        <HStack flex={1} justifyContent='space-evenly' alignItems='center'>
                            <NavigationBar handleClick={handleTabClick} isMenuOpen={isMenuOpen} />
                            <Box>
                                <SearchBar placeholder='Search News...' barWidth='$full' handleEnter={handleNavSearchEnter} />
                            </Box>
                        </HStack>
                        <Box>
                            <SocialMedia />
                        </Box>
                    </HStack>
                )
                :
                (
                    <VStack display='flex' backgroundColor='white' px="$12" py="$2" gap="$2">
                        {isMenuOpen ? (
                            <VStack>
                                <HStack justifyContent='flex-start' alignItems='center' backgroundColor='white'>
                                    <Pressable
                                        onPress={() => setIsMenuOpen(!isMenuOpen)}
                                        p="$2"
                                    >
                                        <Text fontSize="$2xl" fontWeight="700">☰</Text>
                                    </Pressable>

                                    <Box>
                                        <Text bold fontSize="$xl"> DailyNews</Text>
                                    </Box>
                                    <Box style={{ display: isMobile ? 'none' : 'flex', marginLeft: 'auto' }}>
                                        <SocialMedia />
                                    </Box>

                                </HStack>
                                <NavigationBar handleClick={handleTabClick} isMenuOpen={isMenuOpen} />

                            </VStack>
                        ) :
                            (
                                <HStack justifyContent='flex-start' alignItems='center' backgroundColor='white'>
                                    <Pressable
                                        onPress={() => setIsMenuOpen(!isMenuOpen)}
                                        p="$2"
                                    >
                                        <Text fontSize="$2xl" fontWeight="700">☰</Text>
                                    </Pressable>
                                    <Box>
                                        <Text bold fontSize="$xl"> DailyNews</Text>
                                    </Box>
                                    <Box style={{ display: isMobile ? 'none' : 'flex', marginLeft: 'auto' }}>
                                        <SocialMedia />
                                    </Box>
                                </HStack>

                            )}
                        <SearchBar placeholder='Search News...' barWidth='$full' handleEnter={handleNavSearchEnter} />


                    </VStack>

                )
            }
        </Box>
    )
}