import { View, Text, FlatList, ListRenderItemInfo } from "react-native";
import React, { FC, memo } from "react";
import { Genre as GenrePropss } from "@/types";

interface GenreProps {
  data: GenrePropss[];
}
const Genre: FC<GenreProps> = ({ data }) => {
  return (
    data.length > 0 && (
      <View style={{ marginVertical: 15, flex: 1, alignItems: "center" }}>
        <FlatList
          data={data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          alwaysBounceHorizontal={true}
          contentContainerStyle={{ columnGap: 15 }}
          renderItem={({ item }: ListRenderItemInfo<GenrePropss>) => (
            <View
              style={{
                borderWidth: 1,
                borderColor: "white",
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 15,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              <Text style={{ color: "white", fontWeight: "500" }}>
                {item.name}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    )
  );
};

export default memo(Genre);
