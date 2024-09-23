import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import WebView from "react-native-webview";
import { Image } from "expo-image";

const Page = () => {
  const router = useRouter();
  const { id, backdrop, type } = useLocalSearchParams();
  const PlayBackUrl = `https://vidsrc.cc/v2/embed/${type}/${id}`;
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <WebView
        style={styles.container}
        originWhitelist={["*"]}
        source={{ uri: PlayBackUrl }}
        allowsFullscreenVideo={true}
        startInLoadingState={true}
        allowsInlineMediaPlayback={true}
        allowsPictureInPictureMediaPlayback={true}
        allowsAirPlayForMediaPlayback={true}
        allowsBackForwardNavigationGestures={true}
        onTouchCancel={() => {
          router.back();
        }}
        javaScriptCanOpenWindowsAutomatically={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default Page;
