import { FlatList, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchInput } from '@/Components'
import EmptyState from '@/Components/EmptyState'
import { searchPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/Components/VideoCard'
import { useLocalSearchParams } from 'expo-router'
const Search = () => {
  const { searchQuery } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(searchQuery));

  useEffect(() => {
    refetch();
  }, [searchQuery])

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts} // elements to render
        keyExtractor={(item) => item.$id.toString()} // unique key for each element
        renderItem={({ item }) => ( // explains react-N what to render
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search results for
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              {searchQuery}
            </Text>
            <View className='mt-6 mb-8'>
              <SearchInput initialValue={searchQuery.toString()} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No videos found'
            subtitle='No videos found for this query'
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search;