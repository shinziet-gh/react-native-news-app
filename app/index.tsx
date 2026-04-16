import React, { useState } from 'react'
import { View, ScrollView, useWindowDimensions } from "react-native";
import NavigationBar from './components/NavigationBar';
import SocialMedia from './components/SocialMedia';
import NewsPage from './components/NewsPage';
import { useResponsive } from './hooks/UseResponsive';
import SearchBar from './components/SearchBar';
import { Box, HStack, Text } from '@gluestack-ui/themed';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';

export default function Index() {

  //Get window dimensions
  const { width, height, isMobile } = useResponsive();

  //Const state to track the selected news category
  const [page, setPage] = useState("");
  const handleClick = (category: string) => {
    setPage(category === 'top-headlines' ? "" : category);

    console.log('Selected category:', page);
  }

  return (
    <View style={{ flex: 1 }}>
      {/* NAVIGATION BAR */}
      <HStack justifyContent='space-evenly' backgroundColor='white' px="$12" py="$2" m="$5" alignItems='center'>
        <Box style={{ flex: 1, display: isMobile ? 'none' : 'flex' }}>
          <Text bold fontSize="$xl"> DailyNews</Text>
        </Box>
        <Box style={{ flex: 1 }}>
          <NavigationBar handleClick={handleClick} />
        </Box>
        <Box style={{ flex: 1, display: isMobile ? 'none' : 'flex' }}>
          <SearchBar />
        </Box>
        <Box style={{ flex: 1, display: isMobile ? 'none' : 'flex' }} alignItems='flex-end'>
          <SocialMedia />
        </Box>
      </HStack>

      {/* MAIN CONTENT */}
      <ScrollView style={{ flex: 1 }}>
        <HStack px="$5">
          <Box style={{ flex: 1, display: isMobile ? 'none' : 'flex', backgroundColor: "white" }}>
            <LeftPanel />
          </Box>
          <Box style={{ flex: 2 }}>
            <NewsPage category={page} />
          </Box>
          <Box style={{ flex: 1, display: isMobile ? 'none' : 'flex', backgroundColor: "white" }}>
            <RightPanel />
          </Box>
        </HStack>
      </ScrollView>

    </View>
  )
}