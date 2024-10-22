import { TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { ErrorBoundaryProps, Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useGenreStore from "../store/useGenre";
import useFetch from "../hooks/useFetch";
import Error from "@/components/Error";
import NetworkProvider from "@/Provider/NetworkProvider";

const queryClient = new QueryClient();
const InitialLayout = () => {
  const {setMovieGenre, setShowGenre } = useGenreStore();
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
  return (
    <Stack screenOptions={{animation:"slide_from_right"}}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, orientation: "portrait_up" }}
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
export function ErrorBoundary({ retry, error }: ErrorBoundaryProps) {
  return <Error retry={retry} error={error}  />;
}
const PageLayout = () => {
  return (
    <NetworkProvider>
    <QueryClientProvider client={queryClient}>
      <InitialLayout />
    </QueryClientProvider>
    </NetworkProvider>
  );
};

export default PageLayout;
