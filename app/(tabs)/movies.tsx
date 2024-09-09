import { View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ListViewLoader from "@/components/Loader/ListViewLoader";
import { useList } from "@/hooks/useList";
import Header from "@/components/Header";
import useGenreStore from "@/store/useGenre";
import FlashListColumn from "@/components/FlashListColumn";

const Page = () => {
  const insets = useSafeAreaInsets();
  const { movieGenre } = useGenreStore();
  const {
    data,
    genresWithSelection,
    handleEndReached,
    isLoading,
    setGenresWithSelection,
    setSearchPhrase,
  } = useList(movieGenre, "movie");
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
        title="Movies"
        setSearchPhrase={setSearchPhrase}
        setGenresWithSelection={setGenresWithSelection}
        genresWithSelection={genresWithSelection}
      />
      {isLoading ? (
        <ListViewLoader />
      ) : (
        <FlashListColumn
          data={data?.pages.flatMap((page) => page.results)}
          handleEndReached={handleEndReached}
          type={"movie"}
        />
      )}
    </View>
  );
};

export default Page;
