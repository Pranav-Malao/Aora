import { View, Text } from 'react-native'
import React from 'react'
import { CustomButton } from '@/Components'
import { signOut } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";


const Profile = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  return (
    <View>
      <CustomButton
        title='logout'
        handlePress={() => {
          const handleSignOut = async () => {
            try {
              await signOut();
              router.push('/sign-in');
              setUser(null);
              setIsLoggedIn(false);
            } catch (error) {
              console.log(error);
            }
          }
          handleSignOut();
        }}
        containerStyles='w-[50%] mt-7'
      />
    </View>
  )
}

export default Profile