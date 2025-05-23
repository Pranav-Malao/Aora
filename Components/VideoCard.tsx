import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import VideoCardVideo from './VideoCardVideo'

interface VideoCardProps {
  video: { title: string, thumbnail: string, video: string, creator: { username: string, avatar: string } }
}
const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } } }: VideoCardProps) => {
  const [play, setPlay] = useState(false);
  return (
    <View className='items-center px-4 mb-14'>
      <View className='flex-row gap-3 items-start'>
        <View className='justify-center items-center flex-row flex-1'>
          <View className='w-[46px] h-[46px] rounded-lg bg-black-100 border border-secondary justify-center items-center p-0.5'>
            <Image source={{ uri: avatar }} className='w-full h-full rounded-md' resizeMode='cover' />
          </View>

          <View className='justify-center flex-1 ml-3 gap-y-1'>
            <Text className='text-white font-psemibold text-sm' numberOfLines={1}>{title}</Text>
            <Text className='text-gray-100 font-pmedium text-xs' numberOfLines={1}>{username}</Text>
          </View>
        </View>

        <View className='pt-2 w-10 h-10 items-center'>
          <TouchableOpacity
            onPress={() => setPlay(!play)}
          >
            <Image source={icons.menu} className='w-5 h-5' resizeMode='contain' />
          </TouchableOpacity>

        </View>
      </View>

      {play ? (
        <VideoCardVideo
          // source={video} !!!!!! baad me chalu kar dena
          setPlaying={setPlay}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setPlay(true)} className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
          activeOpacity={0.7}
        >
          <Image source={{ uri: thumbnail }} className='w-full h-full rounded-xl mt-3' resizeMode='cover' />
          <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain' />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default VideoCard