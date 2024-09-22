import { TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { hp, wp } from "../common/common";
import Animated, {
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
interface CardsProps {
  path: string;
  index: number;
  type: "movie" | "shows";
  id: number;
  cardType: "big" | "small";
}
const Cards = ({ path, index, type, id, cardType }: CardsProps) => {
  const blurhash = "L02rs+WB00of~qM{9F%M~qM{9F%M";
  const router = useRouter();

  return (
    <Animated.View
      entering={
        cardType === "big"
          ? FadeInRight.duration(600).delay(200 * index)
          : FadeInDown.duration(600).delay(200 * index)
      }
      style={{ flex: 1 }}
    >
      <TouchableOpacity
        style={[cardType === "big" ? styles.Bigcard : styles.SmallCard]}
        onPress={() => {
          if (type === "movie") {
            router.push({
              pathname: "/movie/[movieid]",
              params: {
                movieid: id,
              },
            });
          } else {
            router.push({
              pathname: "/shows/[showid]",
              params: {
                showid: id,
              },
            });
          }
        }}
      >
        <Image
          source={{
            uri: path
              ? `https://image.tmdb.org/t/p/w1280${path}`
              : "https://st.depositphotos.com/8521256/54557/v/600/depositphotos_545570114-stock-video-glitch-movie-clapper-icon-black.jpg",
          }}
          transition={1000}
          style={[
            cardType === "big" ? styles.BigCardimage : styles.SmallCardImage,
          ]}
          contentFit="cover"
          cachePolicy={"memory-disk"}
          placeholder={blurhash}
          placeholderContentFit="cover"
        />
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  Bigcard: {
    backgroundColor: "black",
    borderRadius: 15,
    width: wp(50),
    height: hp(35),
    alignItems: "center",
    position: "relative",
    marginHorizontal: 10,
  },
  SmallCard: {
    flex: 1,
    flexDirection: "column",
    margin: 6,
    borderRadius: 15,
  },
  BigCardimage: {
    flex: 1,
    width: wp(50),
    height: hp(35),
    borderRadius: 15,
  },
  SmallCardImage: {
    justifyContent: "center",
    alignItems: "center",
    height: 270,
    borderRadius: 15,
  },
});
export default Cards;
