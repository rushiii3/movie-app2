import { View } from "react-native";
import React from "react";
import { Tabs, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import FlashListColumn from "@/components/FlashListColumn";
import ListViewLoader from "@/components/Loader/ListViewLoader";
const Page = () => {
  const { name, url, type } = useLocalSearchParams<{
    name: string;
    url: string;
    type: "movie" | "shows";
  }>();
  const rename = name?.split(" ").concat("Extra").join("");
  const urlNew = new URL(url!);
  urlNew.searchParams.delete("page");
  const newUrlString = urlNew.toString();
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [rename],
    queryFn: async ({ pageParam = 1 }) => {
      const fetchUrl = `${newUrlString}&page=${pageParam}`;
      const res = await axios.get(fetchUrl, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
        },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      if (lastPage.page < lastPage.total_pages) {
        return nextPage;
      } else {
        console.log("No more pages");
        return undefined;
      }
    },
    staleTime: 120000, // 2 minutes
    initialPageParam: 1,
  });

  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar hidden={false} animated />
      <Tabs.Screen options={{ headerTitle: name }} />
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          paddingHorizontal: 16,
          paddingTop: insets.top,
        }}
      >
        {isLoading ? (
          <View style={{ paddingTop: insets.top + 30 }}>
            <ListViewLoader />
          </View>
        ) : (
          <FlashListColumn
            data={data?.pages.flatMap((page) => page.results)}
            handleEndReached={handleEndReached}
            type={type!}
          />
        )}
      </View>
    </>
  );
};

export default Page;
