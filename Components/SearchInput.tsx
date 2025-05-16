import { View, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { icons } from '@/constants';
import { usePathname, router } from 'expo-router';

const SearchInput = ({ initialValue }: { initialValue?: string }) => {
  const pathName = usePathname();
  const [query, setQuery] = useState(initialValue || '');
  return (
    <View className='w-full border-2 border-black-200 h-16 pl-4 bg-black-100 rounded-2xl focus:border-secondary items-center mt-2 flex-row space-x-4'>
      <TextInput
        className='text-base font-pregular mt-0.5 text-white flex-1'
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor={"#CDCDE0"}
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        className='p-4'
        activeOpacity={0.5}
        disabled={!query}
        onPress={
          () => {
            if (!query) {
              return;
            }
            if (pathName.startsWith('/search')) {
              router.setParams({ searchQuery: query });
            } else {
              router.push({
                pathname: "/search/[searchQuery]",
                params: { searchQuery: query },
              });
            }
          }
        }
      >
        <Image source={icons.search} className='w-6 h-6' resizeMode='contain' />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput