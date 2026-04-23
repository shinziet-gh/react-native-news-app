import React, { useState } from 'react'
import { View, ScrollView } from "react-native";
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

  //State variable to store the selected news category
  const [params, setParams] = useState({ category: "general", searchQuery: "", fromDate: "", toDate: "" });

  //Set category on tab click
  const handleTabClick = (category: string) => {
    setParams(
      {
        category: category,
        searchQuery: params["searchQuery"] || "",
        fromDate: params["fromDate"] || "",
        toDate: params["toDate"] || ""
      });

    console.log('Selected category:', category);
  }

  //Update search query when enter key on navigation search bar is pressed
  const handleNavSearchEnter = (searchQuery: string) => {
    setParams(
      {
        category: params["category"],
        searchQuery: searchQuery,
        fromDate: params["fromDate"] || "",
        toDate: params["toDate"] || ""
      });

    console.log('Search query:', searchQuery);
  }

  //Update from and to date when search button is clicked
  const handleSearchParams = (searchParams: { searchQuery: string; fromDate: string; toDate: string; }) => {
    setParams(
      {
        category: params["category"],
        searchQuery: searchParams["searchQuery"] || "",
        fromDate: params["fromDate"] || "",
        toDate: params["toDate"] || ""
      });

    console.log('From:', searchParams["fromDate"]);
    console.log('To:', searchParams["toDate"]);
  }

  return (
    <View style={{ flex: 1 }}>
      {/* NAVIGATION BAR */}
      <HStack justifyContent='space-evenly' backgroundColor='white' px="$12" py="$2" m="$5" alignItems='center'>
        <Box style={{ flex: 1, display: isMobile ? 'none' : 'flex' }}>
          <Text bold fontSize="$xl"> DailyNews</Text>
        </Box>
        <Box style={{ flex: 1 }}>
          <NavigationBar handleClick={handleTabClick} />
        </Box>
        <Box style={{ flex: 1, display: isMobile ? 'none' : 'flex' }}>
          <SearchBar placeholder='Search News...' barWidth='$1/2' handleEnter={handleNavSearchEnter} />
        </Box>
        <Box style={{ flex: 1, display: isMobile ? 'none' : 'flex' }} alignItems='flex-end'>
          <SocialMedia />
        </Box>
      </HStack>

      <ScrollView>
        <HStack px="$5">
          {/* LEFT CONTAINER */}
          <Box
            width="$1/4"
            display={isMobile ? 'none' : 'flex'}
            shadowOpacity={0.1}
            shadowRadius={6}
            backgroundColor='white'
          >
            <LeftPanel />
          </Box>
          {/* MIDDLE CONTAINER */}
          <Box width={isMobile ? "$full" : "$2/4"}>
            <NewsPage params={params} />
          </Box>
        </HStack>
      </ScrollView>

      {/* RIGHT CONTAINER */}
      <Box
        width="$1/4"
        display={isMobile ? 'none' : 'flex'}
        position='absolute'
        top="20%"
        right={20}
      >
        <RightPanel handleParams={handleSearchParams} />
      </Box>

      {/* FOOTER */}
      <View
        style={{
          backgroundColor: 'black',
          height: height * 0.05,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: 20
        }}>
        <Text fontSize="$sm" color="white">© 2026 DailyNews. All rights reserved.</Text>
      </View>
    </View>
  )
}