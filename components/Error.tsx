import { Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { wp } from "@/common/common";
import { ErrorBoundaryProps } from "expo-router";

const Error = ({ retry }: ErrorBoundaryProps) => {
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
        source={require("../assets/animations/animation.json")}
        style={{ width: "100%", aspectRatio: 1 }}
        autoPlay
        loop
      />

      {/* <Text>{error.message}</Text> */}
      <TouchableOpacity
        onPress={retry}
        style={{
          backgroundColor: "white",
          width: wp(90),
          paddingVertical: 15,
          borderRadius: 15,
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
          Try Again?
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Error;
