import React, {useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";
import { useLocalSearchParams, useRouter } from "expo-router";
import WebView from "react-native-webview";

const Page = () => {
  useEffect(() => {
    async function setOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }
    setOrientation();
  }, []);
  const router = useRouter(); 
   const { id, backdrop, type } = useLocalSearchParams();
   console.log(id);
   return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <WebView
      style={styles.container}
      originWhitelist={['*']}
      source={{ uri: `https://vidsrc.cc/v2/embed/${type}/${id}` }}
      allowsFullscreenVideo={true}
      startInLoadingState={true}
      allowsInlineMediaPlayback={true}
      allowsPictureInPictureMediaPlayback={true}
      allowsAirPlayForMediaPlayback={true}
      allowsBackForwardNavigationGestures={true}
      onTouchCancel={() => {router.back()}}
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
