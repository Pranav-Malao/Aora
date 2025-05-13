import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Bookmark = () => {
  return (
    <SafeAreaView className='border border-red-500 h-20'>
      <Text className='text-2xl text-black'>Bookmark</Text>
    </SafeAreaView>
  )
}

export default Bookmark