import { View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { ErrorBoundaryProps, Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useGenreStore from "../store/useGenre";
import useFetch from "../hooks/useFetch";
import Error from "@/components/Error";
const queryClient = new QueryClient();
const InitialLayout = () => {
  const { movieGenre, setMovieGenre, setShowGenre } = useGenreStore();
  const router = useRouter();
  const movieGenresResponse = useFetch({
    endpoint: "https://api.themoviedb.org/3/genre/movie/list?language=en",
    key: "movieGenre",
  });

  const showGenresResponse = useFetch({
    endpoint: "https://api.themoviedb.org/3/genre/tv/list?language=en",
    key: "showGenre",
  });

  useEffect(() => {
    if (movieGenresResponse.data) {
      setMovieGenre(movieGenresResponse.data);
    }
  }, [movieGenresResponse.data]);

  useEffect(() => {
    if (showGenresResponse.data) {
      setShowGenre(showGenresResponse.data);
    }
  }, [showGenresResponse.data]);
  // useEffect(() => {
  // router.push({
  //   pathname:"/player/[id]"
  // })
  // }, [])

  return (
    <Stack screenOptions={{animation:"slide_from_right"}}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, orientation: "portrait_up" }}
      />
      <Stack.Screen
        name="player/[id]"
        options={{ headerShown: false, orientation: "landscape" }}
      />
      <Stack.Screen
        name="movie/[movieid]"
        options={{
          headerShown: true,
          orientation: "portrait_up",
          headerTransparent: true,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={router.back}
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
                <Ionicons name="chevron-back" size={24} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="shows/[showid]"
        options={{
          headerShown: true,
          orientation: "portrait_up",
          headerTransparent: true,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={router.back}
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
                <Ionicons name="chevron-back" size={24} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="episodes/[season_id]"
        options={{
          orientation: "portrait_up",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="chevron-back" size={27} color={"white"} />
            </TouchableOpacity>
          ),
          headerLargeTitle: true,
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <Stack.Screen
        name="view/[name]"
        options={{
          orientation: "portrait_up",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={"white"} />
            </TouchableOpacity>
          ),
          headerLargeTitle: true,
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
    </Stack>
  );
};
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return <Error retry={retry} />;
}
const PageLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <InitialLayout />
    </QueryClientProvider>
  );
};

export default PageLayout;
