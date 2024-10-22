import React from "react";
import { View, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import WebView from "react-native-webview";

const Page = () => {
  const router = useRouter();
  const { id, type } = useLocalSearchParams();
  console.log(type);
  
  const playBackUrl = `https://vidbinge.dev/embed/${type}/${id}`;
  return (
    <View style={{flex:1}}>
      <StatusBar hidden={true} />
      <WebView
        style={{flex:1}}
        originWhitelist={["*"]}
        source={{ uri: playBackUrl }}
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
    </View>
  );
};

export default Page