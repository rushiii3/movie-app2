import { View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useGenreStore from "../../store/useGenre";
import Header from "@/components/Header";
import { useList } from "@/hooks/useList";
import ListViewLoader from "@/components/Loader/ListViewLoader";
import FlashListColumn from "@/components/FlashListColumn";
import { withLoader } from "@/HOC/withLoader";
const ShowsWithLoader = withLoader(FlashListColumn);

const Page = () => {
  const { showGenre } = useGenreStore();
  const insets = useSafeAreaInsets();
  const {
    data,
    genresWithSelection,
    handleEndReached,
    isLoading,
    setGenresWithSelection,
    setSearchPhrase,
  } = useList(showGenre, "shows");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingHorizontal: 16,
        paddingTop: insets.top + 10,
      }}
    >
      <StatusBar style="light" hidden={false} />
      <Header
        title="Shows"
        setSearchPhrase={setSearchPhrase}
        setGenresWithSelection={setGenresWithSelection}
        genresWithSelection={genresWithSelection}
      />
      <ShowsWithLoader
        isLoading={isLoading}
        Loader={ListViewLoader}
        data={data?.pages.flatMap((page) => page.results)}
        handleEndReached={handleEndReached}
        type={"shows"}
      />
    </View>
  );
};

export default Page;
