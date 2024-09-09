import { View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useGenreStore from "../../store/useGenre";
import Header from "@/components/Header";
import { useList } from "@/hooks/useList";
import ListViewLoader from "@/components/Loader/ListViewLoader";
import FlashListColumn from "@/components/FlashListColumn";
const Page = () => {
  const { showGenre } = useGenreStore();
  const insets = useSafeAreaInsets();
  const {
    data,
    genresWithSelection,
    handleEndReached,
    isLoading,
    searchPhrase,
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
        searchPhrase={searchPhrase}
        setGenresWithSelection={setGenresWithSelection}
        genresWithSelection={genresWithSelection}
      />
      {isLoading ? (
        <ListViewLoader />
      ) : (
        <FlashListColumn
          data={data?.pages.flatMap((page) => page.results)}
          handleEndReached={handleEndReached}
          type={"shows"}
        />
      )}
    </View>
  );
};

export default Page;
