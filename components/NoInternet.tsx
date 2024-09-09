import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { wp } from "@/common/common";
import { useRouter } from "expo-router";

const NoInternet = () => {
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <LottieView
        source={require("../assets/animations/NoInternet.json")}
        style={{ width: "100%", aspectRatio: 1 }}
        autoPlay
        loop
      />

      <TouchableOpacity
        style={{
          backgroundColor: "white",
          width: wp(90),
          paddingVertical: 15,
          borderRadius: 15,
        }}
        onPress={() => {
          router.replace("/download");
        }}
      >
        <Text
          style={{
            color: "black",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Go to Downloads
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NoInternet;

const styles = StyleSheet.create({});
