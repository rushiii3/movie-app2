import { View, Text } from "react-native";
import React, { memo } from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { hp, wp } from "../../common/common";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const Header = ({ scrollOffset, backdrop, poster, isAdult }) => {
  console.log("render header");

  const blurhash = "L02rs+WB00of~qM{9F%M~qM{9F%M";
  const IMG_HEIGHT = hp(55);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, 0],
            [-IMG_HEIGHT, 0, 0]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  console.log();
  return (
    <View>
      <Animated.Image
        source={{
          uri: backdrop
            ? `https://image.tmdb.org/t/p/w1280${backdrop}`
            : "https://st.depositphotos.com/8521256/54557/v/600/depositphotos_545570114-stock-video-glitch-movie-clapper-icon-black.jpg",
        }}
        transition={1000}
        style={[{ height: hp(55), width: wp(100) }, imageAnimatedStyle]}
        contentFit="cover"
        cachePolicy={"memory-disk"}
        placeholder={blurhash}
        placeholderContentFit="cover"
      />
      <LinearGradient
        // Background Linear Gradient
        colors={[
          "rgba(0,0,0,0)",
          "rgba(0,0,0,0.5)",
          "rgba(0,0,0,0.6)",
          "rgba(0,0,0,0.7)",
        ]}
        style={{
          height: hp(40),
          width: wp(100),
          position: "absolute",
          bottom: 0,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
      />
      <Image
        source={{
          uri: poster
            ? `https://image.tmdb.org/t/p/w1280${poster}`
            : "https://st.depositphotos.com/8521256/54557/v/600/depositphotos_545570114-stock-video-glitch-movie-clapper-icon-black.jpg",
        }}
        transition={1000}
        style={{
          width: wp(50),
          height: hp(35),
          borderRadius: 15,
          position: "absolute",
          top: hp(30),
          left: "25%",
        }}
        contentFit="cover"
        cachePolicy={"memory-disk"}
        placeholder={blurhash}
        placeholderContentFit="cover"
      />
      {isAdult && (
        <View
          style={{
            position: "absolute",
            top: hp(60),
            right: wp(18),
            gap: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              alignItems: "center",
              backgroundColor: "red",
              justifyContent: "center",
              borderRadius: 50,
              height: hp(6),
              width: wp(14),
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              18+
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default memo(Header);
