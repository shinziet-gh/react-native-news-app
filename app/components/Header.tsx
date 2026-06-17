import { Box, HStack, Text, VStack } from '@gluestack-ui/themed';
import NavigationBar from './NavigationBar';
import SocialMedia from './SocialMedia';
import SearchBar from './SearchBar';
import { useResponsive } from '../hooks/UseResponsive';
import { useState } from 'react';

export default function Header({ handleTabClick, handleNavSearchEnter }: { readonly handleTabClick: (category: string) => void; readonly handleNavSearchEnter: (searchQuery: string) => void }) {
    //Get window dimensions
    const { width, height, isMobile, isTablet, isDesktop } = useResponsive();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const handleClick = (isOpen: boolean) => {
        setIsMenuOpen(isOpen)
    }


    return (
        <Box>
            {isDesktop ?
                (
                    <HStack justifyContent='space-between' alignItems='center' backgroundColor='white' px="$12" py="$2" m="$5">
                        <Box style={{ display: isMobile ? 'none' : 'flex' }} >
                            <Text bold fontSize="$xl"> DailyNews</Text>
                        </Box>

                        <HStack flex={1} justifyContent='space-evenly' alignItems='center'>
                            <NavigationBar handleClick={handleTabClick} updateHeader={handleClick} />
                            <Box>
                                <SearchBar placeholder='Search News...' barWidth='$full' handleEnter={handleNavSearchEnter} />
                            </Box>
                        </HStack>
                        <Box style={{ display: isMobile ? 'none' : 'flex' }}>
                            <SocialMedia />
                        </Box>
                    </HStack>
                )
                :
                (
                    <VStack display='flex' backgroundColor='white' px="$12" py="$2" gap="$2">
                        {isMenuOpen ? (
                            <HStack justifyContent='space-between' backgroundColor='white'>
                                <NavigationBar handleClick={handleTabClick} updateHeader={handleClick} />
                            </HStack>
                        ) :
                            (
                                <HStack justifyContent='space-between' alignItems='center' backgroundColor='white'>
                                    <NavigationBar handleClick={handleTabClick} updateHeader={handleClick} />

                                    <HStack flex={1} justifyContent='space-evenly' alignItems='center'>
                                        <Box style={{ display: isMobile ? 'none' : 'flex' }} >
                                            <Text bold fontSize="$xl"> DailyNews</Text>
                                        </Box>
                                    </HStack>
                                    <Box style={{ display: isMobile ? 'none' : 'flex' }}>
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