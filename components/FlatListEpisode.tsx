import React, { useCallback } from "react";
import { useRouter } from "expo-router";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { Image } from "expo-image";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Season } from "@/types";
interface SeasonProps {
  data: Season[];
  season_id: number;
  showid: string;
}
const FlatListEpisode = ({ data, season_id, showid }: SeasonProps) => {
  const blurhash = "L02rs+WB00of~qM{9F%M~qM{9F%M";
  const router = useRouter();
  const render = useCallback(
    ({ item }: ListRenderItemInfo<Season>) => {
      return (
        <View style={styles.productCard}>
          <Image
            source={{
              uri: item.still_path
                ? `https://image.tmdb.org/t/p/w1280${item.still_path}`
                : "https://st.depositphotos.com/8521256/54557/v/600/depositphotos_545570114-stock-video-glitch-movie-clapper-icon-black.jpg",
            }}
            transition={100}
            style={styles.productImage}
            contentFit="cover"
            cachePolicy={"memory-disk"}
            placeholder={blurhash}
            placeholderContentFit="cover"
          />

          <View style={styles.productInfo}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  marginBottom: 4,
                  color: "white",
                }}
              >
                Episode {item?.episode_number}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  marginBottom: 4,
                  color: "#4caf50",
                }}
              >
                {item?.runtime} min
              </Text>
            </View>

            <Text style={styles.productName}>{item?.name}</Text>
            <View
              style={{
                marginTop: "auto",
                flexDirection: "row",
                gap: 20,
                justifyContent: "space-between",
                paddingRight: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/player/[id]",
                    params: {
                      id: `${showid}?s=${season_id}&e=${item?.episode_number}`,
                      backdrop: item.still_path,
                      type: "tv",
                    },
                  });
                }}
              >
                <FontAwesome5 name="play" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    },
    [showid, season_id]
  );

  return (
    <FlashList
      data={data}
      renderItem={render}
      estimatedItemSize={Dimensions.get("window").height}
      contentContainerStyle={{
        backgroundColor: "black",
        paddingHorizontal: 20,
        paddingTop: 5,
      }}
      contentInsetAdjustmentBehavior="always"
    />
  );
};

export default FlatListEpisode;

const styles = StyleSheet.create({
  productCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "white",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginBottom: 20,
  },
  productImage: {
    width: 190,
    height: 120,
    marginRight: 16,
    borderRadius: 15,
  },
  productInfo: {
    flex: 1,
    marginTop: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "white",
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4caf50",
    textAlign: "left",
  },
});