import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HorizontalTransaction from "../HorizontalTransaction";
import Feeds from "../Feeds";
const HomeScreen = ({
  urls,
  nowPlayingMovies,
  nowPlayingShows,
  popularMovies,
  popularShows,
  topRatedMovies,
  topRatedShows,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView
        style={{ flex: 1 }}
        automaticallyAdjustContentInsets={true}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20,
        }}
      >
        <StatusBar hidden={false} style="light" />
        {/* trending */}
        <HorizontalTransaction />
        {/* now playing movies */}
        <Feeds
          title={"Now Playing Movies"}
          data={nowPlayingMovies?.results}
          type={"movie"}
          url={urls[0]}
        />
        {/* now playing shows */}
        <Feeds
          title={"Now Playing Shows"}
          data={nowPlayingShows?.results}
          type={"shows"}
          url={urls[1]}
        />
        {/* popular movies */}
        <Feeds
          title={"Popular Movies"}
          data={popularMovies?.results}
          type={"movie"}
          url={urls[2]}
        />

        {/* popular shows */}
        <Feeds
          title={"Popular Shows"}
          data={popularShows?.results}
          type={"shows"}
          url={urls[3]}
        />
        {/* top rated movies */}
        <Feeds
          title={"Top Rated Movies"}
          data={topRatedMovies?.results}
          type={"movie"}
          url={urls[4]}
        />
        {/* top rated shows */}
        <Feeds
          title={"Top Rated Shows"}
          data={topRatedShows?.results}
          type={"shows"}
          url={urls[5]}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
