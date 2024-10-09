import React from "react";
import { View, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import WebView from "react-native-webview";

const Page = () => {
  const router = useRouter();
  const { id, backdrop, type } = useLocalSearchParams();
  const PlayBackUrl = `https://vidsrc.to/embed/${type}/${id}`;
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <SafeAreaView style={{flex:1}}>
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
          limitsNavigationsToAppBoundDomains={true}
        />
      </SafeAreaView>
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
