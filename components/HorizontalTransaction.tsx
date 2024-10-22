import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { hp, wp } from "../common/common";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import useGenreStore from "../store/useGenre";
import { useMemo } from "react";
import { Genre, Trending, TrendingResult } from "@/types";
import { CarouselRenderItemInfo } from "react-native-reanimated-carousel/lib/typescript/types";
import BackImage from "@/assets/images/back.jpg";

interface HorizontalTransactionProps {
  data: Trending;
}
const HorizontalTransaction = ({ data }: HorizontalTransactionProps) => {
  const { showGenre, movieGenre } = useGenreStore();
  const router = useRouter();
  const renderItem = ({ item }: CarouselRenderItemInfo<TrendingResult>) => {
    const itemGenres = useMemo(() => {
      if (!item?.genre_ids) return ""; // Hook should not be inside a condition
      const genreList =
        item?.media_type === "movie" ? movieGenre?.genres : showGenre?.genres;
      return item?.genre_ids
        .map((genreId: number) => {
          const genre = genreList?.find((g: Genre) => g.id === genreId);
          return genre ? genre.name : "";
        })
        .filter(Boolean)
        .join(" | ");
    }, [
      item?.genre_ids,
      item?.media_type,
      movieGenre?.genres,
      showGenre?.genres,
    ]);

    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: item?.backdrop_path
              ? `https://www.themoviedb.org/t/p/w1280${item?.backdrop_path}`
              : BackImage,
          }}
          transition={1000}
          style={styles.image}
          contentFit="cover"
          cachePolicy={"memory-disk"}
          placeholder={BackImage}
          placeholderContentFit="cover"
        />
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {               
            router.push({
              pathname: "/detail/[id]",
              params: {
                id: Number(item?.id),
                type: item?.media_type 
              },
            });
          }}
        >
          <Text style={styles.title}>{item?.name || item?.title}</Text>
          {itemGenres && <Text style={styles.genres}>{itemGenres}</Text>}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <View
        style={{
          marginBottom: 20,
          paddingHorizontal: 15,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: hp(3),
            fontWeight: "bold",
            color: "white",
            marginTop: 10,
          }}
        >
          Trending
        </Text>
      </View>
      <Carousel
        loop // Enables infinite looping of the carousel
        width={wp(100)} // Width of each item in the carousel
        height={hp(25)} // Height of the carousel
        data={data.results} // Data to be rendered in the carousel
        autoPlay // Automatically starts playing the carouse
        style={{
          width: "100%",
          height: hp(25),
          alignItems: "center",
          justifyContent: "center",
        }}
        pagingEnabled
        scrollAnimationDuration={2000} // Duration of the scrolling animation// Callback function triggered when an item is snapped to
        renderItem={renderItem} // Function to render each item in the carousel
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 25,
    marginHorizontal: 20,
    position: "relative",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 25,
  },
  gradient: {
    height: "25%",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  touchable: {
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    left: 10,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: "left",
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  genres: {
    textAlign: "left",
    fontSize: 14,
    fontWeight: "300",
    color: "white",
  },
});
export default HorizontalTransaction;
