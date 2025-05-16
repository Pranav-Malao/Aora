import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { icons } from '@/constants';

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (e: string) => void;
  otherStyles?: string;
}

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles }: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`w-full space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium ml-1 mr-auto'>
        {title}
      </Text>
      <View className='w-full border-2 border-black-200 h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center mt-2 flex-row'>
        <TextInput
          className='flex-1 text-base font-psemibold text-white w-full'
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === 'Password' && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6'
            resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField