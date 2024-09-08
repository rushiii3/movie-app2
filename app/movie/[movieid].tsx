import React, { useEffect,  } from "react";
import {useLocalSearchParams } from "expo-router";
import useFetch from "../../hooks/useFetch";
import useBookmarkStore from "../../store/useBookmarkStore";
import { withLoader } from "../../HOC/withLoader";
import MovieScreen from "../../components/Screens/MovieScreen";
const MovieScreenwithLoader = withLoader(MovieScreen);
import { type ErrorBoundaryProps } from 'expo-router';
import { View, Text } from "react-native";
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text>{error.message}</Text>
      <Text onPress={retry}>Try Again?</Text>
    </View>
  );
}
const Page = () => {
  const { bookmarks, addBookmark, removeBookmark, loadBookmarks } =
    useBookmarkStore();
  const { movieid } = useLocalSearchParams();

  const { data: moviedata, isLoading: movieLoading } = useFetch({
    endpoint: `https://api.themoviedb.org/3/movie/${movieid}`,
    key: movieid + "movie",
  });
  const { data: cast, isLoading: castLoading } = useFetch({
    endpoint: `https://api.themoviedb.org/3/movie/${movieid}/credits?language=en-US`,
    key: movieid + "cast",
  });
  const { data: teasers, isLoading: teaserLoading } = useFetch({
    endpoint: `https://api.themoviedb.org/3/movie/${movieid}/videos?language=en-US`,
    key: movieid + "teasers",
  });
  const { data: recommendations, isLoading: recommendationsLoading } = useFetch(
    {
      endpoint: `https://api.themoviedb.org/3/movie/${movieid}/recommendations?language=en-US&page=1`,
      key: movieid + "recommendations",
    }
  );
  const teasersData = teasers?.results.filter(
    (value) => value?.type === "Teaser" || value?.type === "Trailer"
  );
  const checkBookmark = bookmarks?.find((b) => b?.id === movieid);
  
  return (
    <MovieScreenwithLoader
      isLoading={movieLoading|| castLoading || teaserLoading || recommendationsLoading}
      moviedata={moviedata}
      recommendations={recommendations}
      cast={cast}
      teasersData={teasersData}
      movieid={movieid}
      checkBookmark={checkBookmark}
      addBookmark={addBookmark}
      removeBookmark={removeBookmark}
    />
  );
};

export default Page;