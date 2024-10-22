import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import Cards from "./Cards";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { hp } from "../common/common";
import {
  NowPlayingMoviesResult,
  NowPlayingShowsResult,
  PopularMoviesResult,
  PopularShowsResult,
  TopRatedMoviesResult,
  TopRatedShowsResult,
} from "@/types";
interface FeedsProps {
  title: string;
  type: "movie" | "tv";
  data:
    | TopRatedMoviesResult[]
    | TopRatedShowsResult[]
    | NowPlayingMoviesResult[]
    | NowPlayingShowsResult[]
    | PopularMoviesResult[]
    | PopularShowsResult[];
  url: string;
}
const Feeds = ({ title, type, data, url }: FeedsProps) => {
  const router = useRouter();

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => {
            router.push({
              pathname: "/view/[name]",
              params: {
                name: title,
                type: type,
                url: url,
              },
            });
          }}
        >
          <Text style={styles.viewAllText}>View All</Text>
          <Entypo name="chevron-small-right" size={23} color="red" />
        </TouchableOpacity>
      </View>
      <FlashList
        data={data}
        renderItem={({
          item,
          index,
        }: ListRenderItemInfo<
          | TopRatedMoviesResult
          | TopRatedShowsResult
          | NowPlayingMoviesResult
          | NowPlayingShowsResult
          | PopularMoviesResult
          | PopularShowsResult
        >) => (
          <Cards
            path={item.poster_path!}
            index={index}
            id={item.id}
            type={type}
            cardType="big"
          />
        )}
        estimatedItemSize={Dimensions.get("window").width}
        horizontal
        contentContainerStyle={styles.flashListContent}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 30,
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
  },
  title: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "white",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: "500",
    color: "red",
  },
  flashListContent: {
    paddingVertical: 20,
    backgroundColor: "black",
  },
});

export default Feeds;
