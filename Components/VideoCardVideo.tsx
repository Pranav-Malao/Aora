import { View } from 'react-native'
import React from 'react'
import { VideoView, useVideoPlayer } from 'expo-video';
import { StyleSheet } from 'react-native';
import { useEventListener } from 'expo';


const VideoCardVideo = ({ source='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', setPlaying }: { source?: string, setPlaying: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const player = useVideoPlayer(source, player => {
    player.play();
    player.showNowPlayingNotification = true;
  });
  useEventListener(player, 'playToEnd', () => {
    setPlaying(false);
  });
  return (
    <View className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'>
      <VideoView
        player={player}
        style={styles.videoView}
        allowsPictureInPicture={true}
      />
    </View>
  )
}

export default VideoCardVideo;

const styles = StyleSheet.create({
  videoView: {
    width: 365,
    height: 210,
    borderRadius: 11,
  },
})