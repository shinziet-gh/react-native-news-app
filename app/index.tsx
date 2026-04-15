import React, { useState } from 'react'
import { View, ScrollView } from "react-native";
import NavigationBar from './components/NavBar';
import SocialMedia from './components/SocialMedia';
import NewsPage from './components/NewsPage';

export default function Index() {

  const [page, setPage] = useState("");
  const handleClick = (category: string) => {
    setPage(category === 'top-headlines' ? "" : category);

    console.log('Selected category:', page);
}

  return (
    <View style={{ flex: 1 }}>
      <NavigationBar handleClick={handleClick}/>
      <ScrollView>
        <NewsPage category={page}/>
      </ScrollView>
      <SocialMedia />
    </View>
  )
}