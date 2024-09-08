import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { hp, wp } from "@/common/common";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const FeedShimmer = () => {
  return (
    <>
      <View style={styles.feedContainer}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          visible={false}
          shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
          style={styles.largeShimmer}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          visible={false}
          shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
          style={styles.smallShimmer}
        />
      </View>
      <View style={styles.rowContainer}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          visible={false}
          shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
          style={styles.imageShimmer}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          visible={false}
          shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
          style={styles.imageShimmer}
        />
      </View>
    </>
  );
};

const HomeScreenLoader = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.titleContainer}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          visible={false}
          shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
          style={styles.titleShimmer}
        />
      </View>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        visible={false}
        shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
        style={styles.bannerShimmer}
      />
      <FeedShimmer />
      <FeedShimmer />
    </SafeAreaView>
  );
};

export default HomeScreenLoader;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  titleContainer: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  titleShimmer: {
    width: wp(40),
    height: hp(3),
    borderRadius: 15,
  },
  bannerShimmer: {
    width: "95%",
    height: hp(25),
    borderRadius: 15,
    marginHorizontal: "auto",
    marginBottom: 30,
  },
  feedContainer: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
  },
  largeShimmer: {
    width: wp(55),
    height: hp(3),
    borderRadius: 15,
  },
  smallShimmer: {
    width: wp(15),
    height: hp(3),
    borderRadius: 15,
  },
  rowContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    width: "100%",
    overflow: "hidden",
    paddingVertical: 20,
  },
  imageShimmer: {
    width: wp(50),
    height: hp(35),
    borderRadius: 15,
  },
});
