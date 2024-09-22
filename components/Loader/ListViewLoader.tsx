import { View, StyleSheet, SafeAreaView } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ListViewLoader = () => {
  return (
    <SafeAreaView style={styles.container}>
      {[...Array(6)].map((_, index) => (
        <ShimmerPlaceHolder
          key={index}
          LinearGradient={LinearGradient}
          visible={false}
          shimmerColors={["#3a3a3a", "#3f3f3f", "#4a4a4a"]}
          style={styles.imageShimmer}
        />
      ))}
    </SafeAreaView>
  );
};

export default ListViewLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageShimmer: {
    width: "46%",  // Adjust the width for two columns with some space between
    height: 270,
    margin: 6,
    borderRadius: 15,
  },
});
