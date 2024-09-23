import React from "react";
import { Tabs } from "expo-router";
import Bookmark from "../../assets/svg/Bookmark";
import HomeSvg from "../../assets/svg/HomeSvg";
import MovieSvg from "../../assets/svg/MovieSvg";
import SeriesSvg from "../../assets/svg/SeriesSvg";

const Page = () => {
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
          title: "Home",
          headerShown:false,
          tabBarIcon: ({ size, color }) => (
            <HomeSvg height={size} width={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="movies"
        options={{
          title: "Movies",
          headerShown:false,
          tabBarIcon: ({ size, color }) => (
            <MovieSvg height={size} width={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="series"
        options={{
          title: "Series",
          headerShown:false,
          tabBarIcon: ({ size, color }) => (
            <SeriesSvg height={size} width={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="watchlater"
        options={{
          title: "Watch Later",
          headerShown:false,
          tabBarIcon: ({ size, color }) => (
            <Bookmark height={size} width={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Page;