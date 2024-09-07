import { hp, wp } from "@/common/common";
import { View, StyleSheet } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
const MovieLoader = () => {
  return (
    <View style={styles.container}>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        visible={false}
        shimmerColors={["#171717", "#1c1c1c", "#1c1c1c"]}
        style={styles.upperBlackSection}
      />
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        visible={false}
        shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
        style={styles.shimmerLarge}
      />

      <View style={styles.innerContainer}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          visible={false}
          shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
          style={styles.shimmerMedium}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          visible={false}
          shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
          style={[styles.shimmerSmall, { width: wp(50) }]}
        />

        <View style={styles.row}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            visible={false}
            shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
            style={styles.shimmerPillSmall}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            visible={false}
            shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
            style={styles.shimmerPillMedium}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            visible={false}
            shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
            style={styles.shimmerPillTiny}
          />
        </View>

        <View style={styles.shimmerGroup}>
          <View style={styles.shimmerColumn}>
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              visible={false}
              shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
              style={styles.shimmerTiny}
            />
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              visible={false}
              shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
              style={styles.shimmerSmall}
            />
          </View>

          <View style={styles.shimmerColumn}>
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              visible={false}
              shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
              style={styles.shimmerTiny}
            />
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              visible={false}
              shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
              style={styles.shimmerSmall}
            />
          </View>

          <View style={styles.shimmerColumn}>
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              visible={false}
              shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
              style={styles.shimmerTiny}
            />
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              visible={false}
              shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
              style={styles.shimmerSmall}
            />
          </View>
        </View>

        <View style={styles.fullWidthShimmerGroup}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            visible={false}
            shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
            style={styles.shimmerMedium}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            visible={false}
            shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
            style={styles.shimmerFullWidthSmall}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            visible={false}
            shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
            style={styles.shimmerFullWidthSmall}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            visible={false}
            shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
            style={styles.shimmerFullWidthSmall}
          />
        </View>
      </View>
    </View>
  );
};

export default MovieLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  upperBlackSection: {
    height: hp(55),
    width: wp(100),
    backgroundColor: "black",
  },
  shimmerLarge: {
    width: wp(50),
    height: hp(35),
    borderRadius: 15,
    position: "absolute",
    top: hp(30),
    left: "25%",
  },
  innerContainer: {
    marginTop: hp(12),
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  shimmerMedium: {
    height: hp(3),
    borderRadius: 15,
    marginBottom: 10,
  },
  shimmerSmall: {
    height: hp(2),
    borderRadius: 15,
    width: wp(20),
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  shimmerPillSmall: {
    height: hp(2.6),
    borderRadius: 50,
    width: wp(13),
  },
  shimmerPillMedium: {
    height: hp(2.6),
    borderRadius: 50,
    width: wp(15),
  },
  shimmerPillTiny: {
    height: hp(2.6),
    borderRadius: 50,
    width: wp(10),
  },
  shimmerGroup: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
  shimmerColumn: {
    gap: 5,
  },
  shimmerTiny: {
    height: hp(1.5),
    borderRadius: 15,
    width: wp(15),
  },
  fullWidthShimmerGroup: {
    marginVertical: 15,
    gap: 15,
    width: "100%",
  },
  shimmerFullWidthSmall: {
    height: hp(2),
    borderRadius: 15,
    width: "100%",
  },
});
