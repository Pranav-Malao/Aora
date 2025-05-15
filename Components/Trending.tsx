import { View, Text, FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { icons } from '@/constants';

interface Post {
  $id: string;
  thumbnail: string;
}

interface Props {
  posts: Array<Post>;
}

const zoomIn = {
  0: {
    scale: 1,
  },
  1: {
    scale: 1.1,
  },
};
const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 1,
  },
};

const TrendingItem = ({ activeItem, item }: { activeItem: string, item: Post }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className='mr-5'
      // @ts-expect-error
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={400}
      useNativeDriver={true}
    >
      {play ? (
        <Text>Playing</Text>
      ) : (
        <TouchableOpacity
          onPress={() => setPlay(true)}
          className='relative justify-center items-center'
          activeOpacity={0.7}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className='w-48 h-72 rounded-3xl my-5 mx-2 overflow-hidden shadow-lg shadow-black/40' resizeMode='cover'
          />
          <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain' />
        </TouchableOpacity>
      )}

    </Animatable.View>
  )
}

const Trending = ({ posts }: Props) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.$id);

  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) { // ek se zyada items hai tab
      setActiveItem(viewableItems[0].key); // jo viewable hai (view me dikh raha hai) usko active item bana do jisse vo zoom ho jaye
    }
  };
  return (
    <View>
      <FlatList
        data={posts.toReversed()}
        keyExtractor={(item) => item?.$id}
        renderItem={({ item }) => (
          <TrendingItem activeItem={activeItem} item={item} />
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 70,
          minimumViewTime: 100,
        }}
        // contentOffset={{ x: 170, y: 0 }}
        horizontal
      />
    </View>
  );
};

export default Trending;