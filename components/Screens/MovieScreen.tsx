import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Bookmark from "@/assets/svg/Bookmark";
import BookmarkFill from "@/assets/svg/BookmarFill";
import { StatusBar } from "expo-status-bar";
import Cast from "../Sections/Cast";
import Header from "../Sections/Header";
import Genre from "../Sections/Genre";
import Overview from "../Sections/Overview";
import Recommendation from "../Sections/Recommendation";
import TitleTagline from "../Sections/TitleTagline";
import ShortInfo from "../Sections/ShortInfo";
import VideoTrailer from "../Sections/VideoTrailer";
import WatchDownload from "../Sections/WatchDownload";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";
import { hp } from "@/common/common";
import { AnimatedScrollView } from "react-native-reanimated/lib/typescript/reanimated2/component/ScrollView";
import { Casts, Movie, Recommentations, TrailersResult } from "@/types";

interface MovieScreenProps {
  moviedata: Movie;
  recommendations: Recommentations;
  cast: Casts;
  teasersData: TrailersResult[];
  movieid: number;
  checkBookmark: boolean;
  addBookmark: (bookmark: {
    id: number;
    poster_path: string;
    type: "movie";
  }) => void;
  removeBookmark: (movieid: number) => void;
}
const MovieScreen = ({
  moviedata,
  recommendations,
  cast,
  teasersData,
  movieid,
  checkBookmark,
  addBookmark,
  removeBookmark,
}: MovieScreenProps) => {  
  const insets = useSafeAreaInsets();
  const scrollViewRef = useAnimatedRef<AnimatedScrollView>();
  const scrollOffset = useScrollViewOffset(scrollViewRef);
  return (
    <Animated.ScrollView
      style={{ flex: 1, backgroundColor: "black" }}
      ref={scrollViewRef}
      scrollEventThrottle={16}
    >
      <Stack.Screen
        options={{
          headerRight: () =>
            !checkBookmark ? (
              <TouchableOpacity
                onPress={() => {
                  addBookmark({
                    id: movieid,
                    poster_path: moviedata?.poster_path,
                    type: "movie",
                  });
                }}
                style={{ marginRight: "auto" }}
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
                  <Bookmark height={24} width={24} color={"white"} />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => removeBookmark(movieid)}
                style={{ marginRight: "auto" }}
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
                  <BookmarkFill height={24} width={24} color={"white"} />
                </View>
              </TouchableOpacity>
            ),
        }}
      />

      <StatusBar style="light" />

      <View style={{ paddingBottom: insets.bottom }}>
        <Header
          scrollOffset={scrollOffset}
          backdrop={moviedata?.backdrop_path}
          poster={moviedata?.poster_path}
          isAdult={moviedata?.adult}
        />
        <View style={{ marginTop: hp(12), flex: 1, paddingHorizontal: 20 }}>
          {/* title and subtitle */}
          <TitleTagline
            title={
              moviedata?.title ? moviedata?.title : moviedata?.original_title
            }
            tagline={moviedata?.tagline}
          />
          {/* genres */}
          <Genre data={moviedata?.genres} />
          {/* duration and length */}
          <ShortInfo
            duration={moviedata?.runtime}
            languages={moviedata?.spoken_languages}
            release_date={moviedata?.release_date}
            status={undefined}
          />
          {/* overview */}
          <Overview data={moviedata?.overview} />
          {/* watch and download now */}
          <WatchDownload id={movieid} />
          {/* cast */}
          <Cast data={cast?.cast} />
          {/* Videos & Trailers */}
          <VideoTrailer data={teasersData} />
          {/*  Recommendations */}
          {recommendations?.results.length !== 0 && (
            <Recommendation data={recommendations?.results} type={"movie"} />
          )}
        </View>
      </View>
    </Animated.ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({});
