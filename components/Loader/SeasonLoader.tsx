import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { hp, wp } from "@/common/common";
const EpisodeLoader = () => {
  return (
    <View style={styles.episodeCard}>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        visible={false}
        shimmerColors={["#171717", "#1c1c1c", "#1c1c1c"]}
        style={styles.episodeImage}
      />
      <View style={styles.episodeInfo}>
        <View style={styles.titleRow}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            visible={false}
            shimmerColors={["#171717", "#1c1c1c", "#1c1c1c"]}
            style={styles.titlePlaceholder}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            visible={false}
            shimmerColors={["#171717", "#1c1c1c", "#1c1c1c"]}
            style={styles.subtitlePlaceholder}
          />
        </View>

        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          visible={false}
          shimmerColors={["#171717", "#1c1c1c", "#1c1c1c"]}
          style={styles.descriptionPlaceholder}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          visible={false}
          shimmerColors={["#171717", "#1c1c1c", "#1c1c1c"]}
          style={styles.additionalInfoPlaceholder}
        />
        <View style={styles.actionRow}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            visible={false}
            shimmerColors={["#171717", "#1c1c1c", "#1c1c1c"]}
            style={styles.iconPlaceholder}
          />
        </View>
      </View>
    </View>
  );
};

const SeasonLoader = () => {
  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: 20, paddingTop:5 }}>
        {Array.from({ length: 10 }).map((_value, index) => (
          <EpisodeLoader key={index} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default SeasonLoader;

const styles = StyleSheet.create({
  episodeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "white",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginBottom: 20,
  },
  episodeImage: {
    width: 190,
    height: 120,
    marginRight: 16,
    borderRadius: 15,
  },
  episodeInfo: {
    flex: 1,
    marginTop: 5,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    alignItems: "center",
  },
  titlePlaceholder: {
    height: hp(1.5),
    borderRadius: 15,
    width: wp(20),
  },
  subtitlePlaceholder: {
    height: hp(1.5),
    borderRadius: 15,
    width: wp(15),
  },
  descriptionPlaceholder: {
    height: hp(2),
    borderRadius: 15,
    width: "100%",
  },
  additionalInfoPlaceholder: {
    height: hp(2),
    borderRadius: 15,
    width: wp(30),
    marginTop: 5,
  },
  actionRow: {
    marginTop: "auto",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    paddingRight: 15,
  },
  iconPlaceholder: {
    height: 30,
    borderRadius: 15,
    width: 30,
  },
});
