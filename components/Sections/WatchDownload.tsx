import { View, Text, TouchableOpacity } from "react-native";
import React, { FC, memo } from "react";
import { hp } from "../../common/common";
import { router } from "expo-router";
interface WatchDownloadProps {
  id: number;
}
const WatchDownload: FC<WatchDownloadProps> = ({ id }) => {
  return (
    <View style={{ marginVertical: 15, gap: 15 }}>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          height: hp(5),
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          // openURL("movie", id.toString());
          router.push({
            pathname: 'player/[id]',
            params: {
              id: id,
              type: "movie"
            }
          })
        }}
      >
        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
          Watch Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(WatchDownload);
