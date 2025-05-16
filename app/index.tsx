import { ScrollView, Text, View, Image, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from '../constants';
import { CustomButton } from '@/Components';
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Index() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  // if (!isLoading && isLoggedIn) return <Redirect href="/home" />
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (isLoggedIn) {
    return <Redirect href="/home" />;
  }
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView className="bg-primary h-full">
        <ScrollView style={{ height: "100%" }}>
          <View className="w-full justify-center items-center min-h-[85vh] px-4">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[130px] h-[84px]"
            />
            <Image
              source={images.cards}
              resizeMode="contain"
              className="max-w-[380px] w-full h-[300px]"
            />
            <View className="relative mt-5">
              <Text className="text-white font-bold text-3xl text-center">
                Discover Endless Possiblities With {' '}
                <Text className="text-secondary-200">Aora</Text>
              </Text>

              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-4 right-20"
                resizeMode="contain"
              />
            </View>

            <Text className="text-sm font-pregular text-gray-100 text-center mt-7">
              Where creativity meets innovation: embark on a journey of limitless exploration with Aora
            </Text>
            <CustomButton
              title='Continue with E-mail'
              handlePress={() => router.push('/sign-in')}
              containerStyles='w-full mt-7'
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
