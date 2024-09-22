import { View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import useFetch from "../../hooks/useFetch";
import SeasonLoader from "@/components/Loader/SeasonLoader";
import { withLoader } from "@/HOC/withLoader";
import FlatListEpisode from "@/components/FlatListEpisode";

const SeasonLoaderFlatList = withLoader(FlatListEpisode);
const Page = () => {
  const {
    season_id = "",
    name = "",
    showid = "",
  } = useLocalSearchParams<{
    season_id: string;
    name: string;
    showid: string;
  }>();
  const key = showid + season_id + "episode";

  const { data: episodes, isLoading } = useFetch({
    endpoint: `https://api.themoviedb.org/3/tv/${showid}/season/${season_id}?language=en-US`,
    key: key,
  });

  return (
    <>
      <Stack.Screen options={{ title: name }} />
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <SeasonLoaderFlatList
          Loader={SeasonLoader}
          isLoading={isLoading}
          data={episodes?.episodes}
          showid={showid}
          season_id={Number(season_id)}
        />
      </View>
    </>
  );
};

export default Page;
