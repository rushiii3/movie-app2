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
import { Casts, Recommentations, Shows, TrailersResult } from "@/types";

interface ShowScreenProps {
  showdata: Shows;
  recommendations: Recommentations;
  cast: Casts;
  teasersData: TrailersResult[];
  showid: number;
  checkBookmark: boolean;
  addBookmark: (bookmark: {
    id: number;
    poster_path: string;
    type: "movie" | "shows";
  }) => void;
  removeBookmark: (movieid: number) => void;
}

const ShowScreen = ({
  addBookmark,
  checkBookmark,
  teasersData,
  recommendations,
  cast,
  showdata,
  removeBookmark,
  showid,
}: ShowScreenProps) => {
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
                    id: showid,
                    poster_path: showdata?.poster_path,
                    type: "shows",
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
                onPress={() => removeBookmark(showid)}
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
          backdrop={showdata?.backdrop_path}
          poster={showdata?.poster_path}
          isAdult={showdata?.adult}
        />
        <View style={{ marginTop: hp(12), flex: 1, paddingHorizontal: 20 }}>
          {/* title and subtitle */}
          <TitleTagline
            title={showdata?.name ? showdata?.name : showdata?.original_name}
            tagline={showdata?.tagline}
          />
          {/* genres */}
          <Genre data={showdata?.genres} />
          {/* duration and length */}
          <ShortInfo
            status={showdata?.status}
            languages={showdata?.spoken_languages}
            release_date={showdata?.first_air_date}
            duration={undefined}
          />
          {/* overview */}
          <Overview data={showdata?.overview} />
          {/* Seasons */}
          <Seasons data={showdata?.seasons} showid={showid} />
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

export default memo(ShowScreen);
