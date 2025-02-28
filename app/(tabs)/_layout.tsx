import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import type { ImageSourcePropType } from 'react-native';
import { icons } from '../../constants';
import { StatusBar } from 'expo-status-bar';
type tabIconProps = {
  icon: ImageSourcePropType,
  color: string,
  name: string,
  focused: boolean
}
const TabIcon = ({ icon, color, name, focused }: tabIconProps) => {
  return (
    <View className='items-center gap-2'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
        accessibilityRole="image" // Add accessibility role
        accessible={true} // Add accessible prop
        aria-label={name}
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
        style={{ color: color }}
      >{name}</Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <StatusBar style="light" backgroundColor="#161622" />

      <Tabs screenOptions={{
        tabBarIconStyle: { width: 65 },
        tabBarActiveTintColor: '#ffa001',
        tabBarInactiveTintColor: '#cdcde0',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 15,
          backgroundColor: '#161622',
          borderTopWidth: 1,
          height: 65,
        },
      }}>
        <Tabs.Screen
          name='home'
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name='Home'
                icon={icons.home}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='create'
          options={{
            title: "Create",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name='Create'
                icon={icons.plus}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='bookmark'
          options={{
            title: "bookmark",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name='Bookmark'
                icon={icons.bookmark}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name='Profile'
                icon={icons.profile}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout