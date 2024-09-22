import { View, Text, TouchableOpacity } from "react-native";
import React, { FC, memo } from "react";
import { useRouter } from "expo-router";
import { hp } from "../../common/common";
interface WatchDownloadProps {
  id: number;
  backdrop: string;
}
const WatchDownload: FC<WatchDownloadProps> = ({ id, backdrop }) => {
  const router = useRouter();
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
          router.push({
            pathname: "/player/[id]",
            params: {
              id: id,
              backdrop: backdrop,
              type: "movie",
            },
          });
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
