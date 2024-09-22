import { View, Text } from "react-native";
import React, { FC, memo } from "react";
import Cards from "../Cards";
import { FlashList } from "@shopify/flash-list";
import { RecommentationsResult } from "@/types";
interface RecommendationProps {
  data: RecommentationsResult[];
  type: "movie" | "shows";
}
const Recommendation: FC<RecommendationProps> = ({ data, type }) => {
  return (
    <View style={{ marginVertical: 15, gap: 15 }}>
      <Text style={{ color: "white", fontSize: 25, fontWeight: "700" }}>
        Recommendations
      </Text>
      <FlashList
        data={data}
        renderItem={({ item, index }) => (
          <Cards
            path={item.poster_path}
            index={index}
            id={item.id}
            type={type}
            cardType="big"
          />
        )}
        estimatedItemSize={20}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(Recommendation);
