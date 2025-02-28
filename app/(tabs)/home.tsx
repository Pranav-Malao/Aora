import { FlatList, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '@/context/GlobalProvider'
import { images } from '@/constants'
const Home = () => {
  // const { user, isLoading } = useGlobalContext();
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={[{ $id: 1 }, { $id: 2 }, { $id: 3 }]} // elements to render
        keyExtractor={(item) => item.$id.toString()} // unique key for each element
        renderItem={({ item }) => ( // explains react-N what to render
          <Text className='text-3xl text-white'>{item.$id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6 border-2">
            <View className="flex flex-row justify-between items-start mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  JSMastery
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-7 h-7 border-2 border-white"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Home