import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { icons } from '@/constants';

interface FormFieldProps {
  title?: string;
  value?: string;
  placeholder?: string;
  handleChangeText?: (e: string) => void;
}

const SearchInput = ({ title, value, handleChangeText }: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (

    <View className='w-full border-2 border-black-200 h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center mt-2 flex-row space-x-4'>
      <TextInput
        className='text-base font-pregular mt-0.5 text-white flex-1'
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor={"#7b7b8b"}
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />

      <TouchableOpacity>
        <Image source={icons.search} className='w-6 h-6' resizeMode='contain'/>
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput