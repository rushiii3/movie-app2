import React, { useEffect, useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import useFetch from "@/hooks/useFetch";
import useBookmarkStore from "@/store/useBookmarkStore";
import { Genre, TrailersResult } from "@/types";
import { withLoader } from "@/HOC/withLoader";
import DetailScreen from "@/components/Screens/DetailScreen";
import MovieLoader from "@/components/Loader/MovieLoader";
const DetailScreenwithLoader = withLoader(DetailScreen);

const Page = () => {
  const { bookmarks, addBookmark, removeBookmark, loadBookmarks } =
    useBookmarkStore();
  useEffect(() => {
    loadBookmarks();
  }, []);
  const { id, type } = useLocalSearchParams<{
    id: number;
    type: "movie" | "tv";
  }>();
  console.log(id, type);
  const { data: showdata, isLoading: showLoading } = useFetch({
    endpoint: `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
    key: type! + id + "detail",
  });
  const { data: cast, isLoading: castLoading } = useFetch({
    endpoint: `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`,
    key: type! + id + "cast",
  });
  const { data: teasers, isLoading: teaserLoading } = useFetch({
    endpoint: `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`,
    key: type! + id + "teasers",
  });
  const { data: recommendations, isLoading: recommendationsLoading } = useFetch(
    {
      endpoint: `https://api.themoviedb.org/3/${type}/${id}/recommendations?language=en-US&page=1`,
      key: type! + id + "recommendations",
    }
  );

  const checkBookmark = useMemo(
    () => bookmarks?.find((b: Genre) => Number(b.id) === Number(id)),
    [bookmarks, id]
  );

  const teasersData = useMemo(
    () =>
      teasers?.results.filter(
        (value: TrailersResult) =>
          value?.type === "Teaser" || value?.type === "Trailer"
      ),
    [id]
  );

  return (
    <DetailScreenwithLoader
    Loader={MovieLoader}
    isLoading={
      showLoading || castLoading || teaserLoading || recommendationsLoading
    }
    addBookmark={addBookmark}
    checkBookmark={checkBookmark}
    teasersData={teasersData}
    recommendations={recommendations}
    cast={cast}
    data={showdata}
    removeBookmark={removeBookmark}
    id={Number(id)}
    type={type!}
  />
  );
};

export default Page;

