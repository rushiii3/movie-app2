import {
  View,
  Text,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  ActivityIndicator,
} from "react-native";
import React, { FC, memo, useCallback } from "react";
import { TrailersResult } from "@/types";
import WebView from "react-native-webview";

interface VideoTrailerProps {
  data: TrailersResult[] | [];
}

const VideoTrailer: FC<VideoTrailerProps> = ({ data }) => {
  const screenWidth = Dimensions.get("screen").width;
  const margin = 12;
  const cardSize = { width: screenWidth - 24 * 2, height: 220 };
  const render = useCallback(({ item }: ListRenderItemInfo<TrailersResult>) => {
    return (
      <View
        style={{
          width: cardSize.width,
          height: cardSize.height,
          marginRight: margin,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <WebView
          source={{
            uri: `https://www.youtube.com/embed/${item?.key}?si=${item?.key}`,
          }}
          style={{ height: "100%", width: "100%", backgroundColor:"black" }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color="#3235fd"
              size="large"
              style={{
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            />
          )}
        />
      </View>
    );
  },[]);
  return (
    data?.length > 0 && (
      <View style={{ marginVertical: 15, gap: 15, flex: 1 }} id="trailer">
        <Text style={{ color: "white", fontSize: 25, fontWeight: "700" }}>
          Trailers
        </Text>
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            renderItem={render}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) =>
              item.id ? item.id.toString() : Math.random().toString()
            }
            pagingEnabled={true}
            snapToAlignment="start"
            decelerationRate="normal"
            disableIntervalMomentum
          />
        </View>
      </View>
    )
  );
};

export default memo(VideoTrailer);
