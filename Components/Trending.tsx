import { View, Text, FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import * as Animatable from 'react-native-animatable';
import { icons } from '@/constants';

interface Post {
  $id: number;
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
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }: { activeItem: number, item: Post }) => {
  const [play, setPlay] = useState(false);
  console.log(activeItem);
  return (
    <Animatable.View
      className='mr-5'
      // animation={activeItem === item.$id ? zoomIn: ''}
      duration={500}
    >
      { play ? (
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
  const [activeItem, setActiveItem] = useState(posts[0].$id);

  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
      console.log(viewableItems[0].key);
    }
  };
  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => (
          <TrendingItem activeItem={activeItem} item={item} />
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 70
        }}
        // contentOffset={{x: 170, y: 0}}
        horizontal
      />
    </View>
  );
};

export default Trending;