import { View } from 'react-native'
import React from 'react'
import { VideoView, useVideoPlayer } from 'expo-video';
import { StyleSheet } from 'react-native';
import { useEventListener } from 'expo';


const TrendingVideo = ({ source='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', setPlaying }: { source?: string, setPlaying: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const player = useVideoPlayer(source, player => {
    player.play();
    player.showNowPlayingNotification = true;
  });
  useEventListener(player, 'playToEnd', () => {
    setPlaying(false);
  });
  return (
    <View className='w-48 h-72 rounded-3xl my-5 mx-2'>
      <VideoView
        player={player}
        style={styles.videoView}
        allowsPictureInPicture={true}
      />
    </View>
  )
}

export default TrendingVideo;

const styles = StyleSheet.create({
  videoView: {
    width: 165,
    height: 250,
    borderRadius: 24,
  },
})