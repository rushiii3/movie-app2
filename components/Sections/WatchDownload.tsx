import { View, Text, TouchableOpacity } from "react-native";
import React, { FC, memo } from "react";
import { hp } from "../../common/common";
import { useOpenBrowser } from "@/hooks/useOpenBrowser";
interface WatchDownloadProps {
  id: number;
}
const WatchDownload: FC<WatchDownloadProps> = ({ id }) => {
  const { openURL } = useOpenBrowser();
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
          openURL("movie", id.toString());
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
