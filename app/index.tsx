import React, { useState } from 'react'
import { Box, HStack, Text } from '@gluestack-ui/themed';
import { View, ScrollView } from "react-native";
import { useResponsive } from './hooks/UseResponsive';
import NavigationBar from './components/NavigationBar';
import SocialMedia from './components/SocialMedia';
import SearchBar from './components/SearchBar';
import NewsList from './components/NewsList';
import SideNews from './components/SideNews';
import CalendarForm from './components/CalendarForm';
import { ErrorBoundary } from './components/ErrorBoundary';
import Header from './components/Header';

export default function Index() {

  //Get window dimensions
  const { width, height, isMobile, isTablet, isDesktop } = useResponsive();

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
        fromDate: searchParams["fromDate"] || "",
        toDate: searchParams["toDate"] || ""
      });

    console.log('From:', searchParams["fromDate"]);
    console.log('To:', searchParams["toDate"]);
  }

  return (
    <View style={{ flex: 1 }}>
      {/* NAVIGATION BAR */}
      <Box position='relative' top={0}>
        <Header handleTabClick={handleTabClick} handleNavSearchEnter={handleNavSearchEnter}></Header>
      </Box>

      <ScrollView>
        <HStack px="$5">
          {/* SIDE NEWS */}
          <Box
            width={width * 0.3}
            display={isTablet || isMobile ? 'none' : 'flex'}
            shadowOpacity={0.1}
            shadowRadius={6}
            backgroundColor='white'
          >
            <SideNews />
          </Box>

          {/* HEADLINE NEWS */}
          <Box width={isTablet || isMobile ? width * 0.7 : width}>
            <ErrorBoundary>
              <NewsList params={params} />
            </ErrorBoundary>
          </Box>
        </HStack>
      </ScrollView>

      {/* FILTER FORM */}
      <Box
        width={isTablet ? width * 0.3 : 'auto'}
        display={isMobile ? 'none' : 'flex'}
        position='absolute'
        top={isTablet || isMobile ? '40%' : '20%'}
        right="$1"

      >
        <CalendarForm handleParams={handleSearchParams} />
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
    </View >
  )
}