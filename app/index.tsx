import React, { useState } from 'react'
import { View, ScrollView } from "react-native";
import NavigationBar from './components/NavBar';
import SocialMedia from './components/SocialMedia';
import TV from './components/Favourites';
import NewsFeed from './components/NewsFeed';

export default function Index() {

  const [media, setMedia] = useState(<NewsFeed/>);
  const handleClick = (mode: string) => {

    if (mode === 'newspage') {
      setMedia(<NewsFeed/>);
    }
    else if (mode === 'favpage') {
      setMedia(<TV/>);
    }
}

  return (
    <View style={{ flex: 1 }}>
      <NavigationBar handleClick={handleClick}/>
      <ScrollView>
        {media}
      </ScrollView>
      <SocialMedia />
    </View>
  )
}