import React from "react";
import { Tabs, useRouter } from "expo-router";
import Bookmark from "../../assets/svg/Bookmark";
import HomeSvg from "../../assets/svg/HomeSvg";
import MovieSvg from "../../assets/svg/MovieSvg";
import SeriesSvg from "../../assets/svg/SeriesSvg";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
        tabBarStyle: {
          backgroundColor: "black", // Set background color to transparent
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <HomeSvg height={size} width={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="movies"
        options={{
          title: "Movies",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MovieSvg height={size} width={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="series"
        options={{
          title: "Series",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <SeriesSvg height={size} width={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="watchlater"
        options={{
          title: "Watch Later",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Bookmark height={size} width={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="detail/[id]"
        options={{
          href: null,
          headerShown: true,
          // orientation: "portrait_up",
          headerTransparent: true,
          headerTitle: "",
          // headerBackTitleVisible: false,
          // headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={router.back}
              style={{ marginRight: "auto", marginLeft: 20 }}
            >
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 50,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="chevron-back" size={24} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
};
export default Page;
