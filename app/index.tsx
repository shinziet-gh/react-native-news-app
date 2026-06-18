import React, { useState } from 'react'
import { Box, HStack, Text } from '@gluestack-ui/themed';
import { View, ScrollView } from "react-native";
import { useResponsive } from './hooks/UseResponsive';
import Header from './components/Header';
import NewsList from './components/NewsList';
import SideNews from './components/SideNews';
import SideDrawer from './components/SideDrawer';
import { ErrorBoundary } from './components/ErrorBoundary';

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
      {/* HEADER */}
      <Header handleTabClick={handleTabClick} handleNavSearchEnter={handleNavSearchEnter}></Header>

      <View style={{ flex: 1, position: "relative" }}>
        <ScrollView>
          <HStack px="$5" py="$5">
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
            <Box width={isDesktop ? width * 0.5 : isTablet ? width * 0.7 : width * 0.95}>
              <ErrorBoundary>
                <NewsList params={params} />
              </ErrorBoundary>
            </Box>
          </HStack>
        </ScrollView>

        {/* FILTER FORM */}
        <SideDrawer handleParams={handleSearchParams} />
      </View>

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