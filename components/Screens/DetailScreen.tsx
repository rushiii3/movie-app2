import { TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Stack } from "expo-router";
import { hp } from "../../common/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import TitleTagline from "../../components/Sections/TitleTagline";
import Genre from "../../components/Sections/Genre";
import Overview from "../../components/Sections/Overview";
import Cast from "../../components/Sections/Cast";
import VideoTrailer from "../../components/Sections/VideoTrailer";
import Recommendation from "../../components/Sections/Recommendation";
import Header from "../../components/Sections/Header";
import ShortInfo from "../../components/Sections/ShortInfo";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";
import Seasons from "../../components/Sections/Seasons";
import Bookmark from "../../assets/svg/Bookmark";
import BookmarkFill from "../../assets/svg/BookmarFill";
import { AnimatedScrollView } from "react-native-reanimated/lib/typescript/reanimated2/component/ScrollView";
import { Casts, Movie, Recommentations, Shows, TrailersResult } from "@/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import WatchDownload from "../Sections/WatchDownload";

interface ShowScreenProps {
  data: Shows | Movie;
  recommendations: Recommentations;
  cast: Casts;
  teasersData: TrailersResult[];
  id: number;
  checkBookmark: boolean;
  addBookmark: (bookmark: {
    id: number;
    poster_path: string;
    type: "movie" | "tv";
  }) => void;
  type: "movie" | "tv";
  removeBookmark: (id: number) => void;
}

const DetailScreen = ({
  addBookmark,
  checkBookmark,
  teasersData,
  recommendations,
  cast,
  data,
  removeBookmark,
  id,
  type,
}: ShowScreenProps) => {
  const tabbarheight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useAnimatedRef<AnimatedScrollView>();
  const scrollOffset = useScrollViewOffset(scrollViewRef);
  return (
    <Animated.ScrollView
      style={{ flex: 1, backgroundColor: "black" }}
      ref={scrollViewRef}
      scrollEventThrottle={16}
      automaticallyAdjustContentInsets={true}
      contentInsetAdjustmentBehavior="always"
      contentContainerStyle={{
        paddingBottom: tabbarheight,
      }}
    >
      <Stack.Screen
        options={{
          headerRight: () =>
            !checkBookmark ? (
              <TouchableOpacity
                onPress={() => {
                  addBookmark({
                    id: id,
                    poster_path: data?.poster_path,
                    type: type,
                  });
                }}
                style={{ marginLeft: "auto", marginRight: 20 }}
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
                onPress={() => removeBookmark(id)}
                style={{ marginLeft: "auto", marginRight: 20 }}
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
          backdrop={data?.backdrop_path}
          poster={data?.poster_path}
          isAdult={data?.adult}
        />
        <View style={{ marginTop: hp(12), flex: 1, paddingHorizontal: 20 }}>
          {/* title and subtitle */}
          <TitleTagline
            title={
              type === "movie"
                ? (data as Movie)?.title || (data as Movie)?.original_title
                : (data as Shows)?.name || (data as Shows)?.original_name
            }
            tagline={data?.tagline}
          />
          {/* genres */}
          <Genre data={data?.genres} />
          {/* duration and length */}
          <ShortInfo
            languages={data?.spoken_languages}
            release_date={
              type === "movie"
                ? (data as Movie)?.release_date
                : (data as Shows)?.first_air_date
            }
            duration={type === "movie" ? (data as Movie)?.runtime : undefined}
            status={type === "tv" ? data?.status : undefined}
          />
          {/* overview */}
          <Overview data={data?.overview} />
          {/* download */}

          {type === "movie" && <WatchDownload id={id} />}
          {/* Seasons */}
          {type === "tv" && (
            <Seasons data={(data as Shows)?.seasons} showid={id} />
          )}
          {/* cast */}
          <Cast data={cast?.cast} />
          {/* Videos & Trailers */}
          <VideoTrailer data={teasersData} />
          {/*  Recommendations */}
          <Recommendation data={recommendations?.results} type={"shows"} />
        </View>
      </View>
    </Animated.ScrollView>
  );
};

export default memo(DetailScreen);
