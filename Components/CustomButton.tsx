import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({
  title = "Custom Button",
  handlePress,
  containerStyles = '',
  textStyles = '',
  isLoading,
}: {
  title?: string
  handlePress: () => void
  containerStyles?: string
  isLoading?: boolean
  textStyles?: string
}) => {
  return (
    <TouchableOpacity className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton