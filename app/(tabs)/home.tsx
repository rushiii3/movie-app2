import useFetch from "../../hooks/useFetch";
import { withLoader } from "../../HOC/withLoader";
import MovieScreen from "../../components/Screens/HomeScreen";
import HomeScreenLoader from "../../components/Loader/HomeScreenLoader";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { hp } from "@/common/common";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import ListViewLoader from "@/components/Loader/ListViewLoader";
import FlashListColumn from "@/components/FlashListColumn";
const MoviesWithLoader = withLoader(FlashListColumn);

const HomeWithLoader = withLoader(MovieScreen);
const index = () => {
  const insets = useSafeAreaInsets();
  const tabbarheight = useBottomTabBarHeight();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [text, settext] = useState("");
  const handleChange = async (textParam: string) => {
    settext(textParam);
    debounceCall(textParam);
  };
  const debounceCall = useCallback(
    debounce((textParam) => {
      setSearchPhrase(textParam);
    }, 1000),
    []
  );

  const urls = [
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
    "https://api.themoviedb.org/3/trending/all/day?language=en-US",
  ];

  const { data: nowPlayingMovies, isLoading: nowPlayingMoviesLoading } =
    useFetch({ endpoint: urls[0], key: "nowPlayingMovies" });
  const { data: nowPlayingShows, isLoading: nowPlayingShowsLoading } = useFetch(
    { endpoint: urls[1], key: "nowPlayingShows" }
  );
  const { data: popularMovies, isLoading: popularMoviesLoading } = useFetch({
    endpoint: urls[2],
    key: "popularMovies",
  });
  const { data: popularShows, isLoading: popularShowsLoading } = useFetch({
    endpoint: urls[3],
    key: "popularShows",
  });
  const { data: topRatedMovies, isLoading: topRatedMoviesLoading } = useFetch({
    endpoint: urls[4],
    key: "topRatedMovies",
  });
  const { data: topRatedShows, isLoading: topRatedShowsLoading } = useFetch({
    endpoint: urls[5],
    key: "topRatedShows",
  });
  const { data: trendings, isLoading: trendingLoading } = useFetch({
    endpoint: urls[6],
    key: "trendings",
  });
  const Loading =
    nowPlayingMoviesLoading ||
    nowPlayingShowsLoading ||
    popularMoviesLoading ||
    popularShowsLoading ||
    topRatedMoviesLoading ||
    topRatedShowsLoading ||
    trendingLoading;

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [`All-SEarch`, searchPhrase],
    queryFn: async ({ pageParam = 1 }) => {     
      const url = `https://api.themoviedb.org/3/search/multi?query=${searchPhrase}&include_adult=true&language=en-US&page=1`;
      const { data } = await axios.get(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
        },
      });
      return data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 120000, // 2 minutes
    initialPageParam: 1,
    enabled: searchPhrase === "" ? false : true,
  });
  // Handle the end of list reached for infinite scroll
  const handleEndReached = () => {
    if (hasNextPage) fetchNextPage();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView
        style={{ flex: 1 }}
        automaticallyAdjustContentInsets={true}
        contentInsetAdjustmentBehavior="always"
        contentContainerStyle={{
          paddingBottom: tabbarheight,
          paddingTop: insets.top,
        }}
      >
        <StatusBar hidden={false} style="light" />
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              color: "white",
              fontSize: hp(5),
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            Search
          </Text>
          <View style={{ position: "relative" }}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              autoFocus={false}
              onChangeText={handleChange}
              placeholder={`Find movies and shows..`}
              placeholderTextColor="#6b7280"
              style={{
                height: 44,
                backgroundColor: "#f1f5f9",
                paddingHorizontal: 16,
                borderRadius: 12,
                fontSize: 15,
                fontWeight: "500",
                color: "#222",
                paddingLeft: 40,
              }}
              value={text}
            />
            <Ionicons
              name="search-outline"
              size={24}
              color="black"
              style={{ position: "absolute", top: 10, left: 7 }}
            />
            {text && (
              <TouchableOpacity
                style={{ position: "absolute", top: 12, right: 7 }}
                onPress={() => {
                  setSearchPhrase("");
                  settext("");
                }}
              >
                <AntDesign name="closecircleo" size={20} color="black" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {text ? (
          <MoviesWithLoader
            isLoading={isLoading}
            Loader={ListViewLoader}
            data={data?.pages.flatMap((page) => page.results)}
            handleEndReached={handleEndReached}
            type={null}
          />
        ) : (
          <HomeWithLoader
            isLoading={Loading}
            Loader={HomeScreenLoader}
            urls={urls}
            nowPlayingMovies={nowPlayingMovies}
            nowPlayingShows={nowPlayingShows}
            popularMovies={popularMovies}
            popularShows={popularShows}
            topRatedMovies={topRatedMovies}
            topRatedShows={topRatedShows}
            trendings={trendings}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
