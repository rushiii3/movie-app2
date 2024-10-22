import { Dimensions, Text, View } from "react-native";
import React from "react";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { hp } from "@/common/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Cards from "./Cards";

type Data = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type: "tv" | 'movie'
};

type FlashListColumnProps = {
  data: any[] | undefined;
  handleEndReached: () => void;
  type: "movie" | "tv" | null;
};

const FlashListColumn: React.FC<FlashListColumnProps> = ({
  data,
  handleEndReached,
  type,
}) => {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item, index }: ListRenderItemInfo<Data>) => {
    return (
      <Cards
        type={type ? type : item?.media_type }
        index={index}
        path={item.poster_path}
        cardType="small"
        id={item.id}
      />
    );
  };

  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      data={data}
      numColumns={2}
      automaticallyAdjustContentInsets
      contentContainerStyle={{
        paddingBottom: insets.bottom + 20,
        paddingTop: 10,
      }}
      renderItem={renderItem}
      contentInsetAdjustmentBehavior="always"
      estimatedItemSize={Dimensions.get("window").height}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.6}
      ListEmptyComponent={
        <View
          style={{
            height: hp(65),
            backgroundColor: "black",
            width: "100%",
            marginTop: 10,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: "white",
              textAlign: "center",
            }}
          >
            No match found.
            {/* Uncomment and provide condition */}
            {/* {searchPhrase ? "No movies match your search." : "No movies match the selected genre."} */}
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "200",
              color: "white",
              textAlign: "center",
            }}
          >
            Please try different keywords.
            {/* Uncomment and provide condition */}
            {/* {searchPhrase ? "Please try different keywords." : "Please explore other genres or refine your selection."} */}
          </Text>
        </View>
      }
    />
  );
};

export default FlashListColumn;
