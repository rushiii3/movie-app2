import MovieLoader from "@/components/Loader/MovieLoader";
import ShowScreen from "@/components/Screens/ShowScreen";
import { withLoader } from "@/HOC/withLoader";
import useFetch from "@/hooks/useFetch";
import useBookmarkStore from "@/store/useBookmarkStore";
import { Genre, TrailersResult } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";

const ShowScreenWithLoader = withLoader(ShowScreen);
const Page = () => {
  const { bookmarks, addBookmark, removeBookmark, loadBookmarks } =
    useBookmarkStore();
  useEffect(() => {
    loadBookmarks();
  }, []);
  const { showid } = useLocalSearchParams();
  const { data: showdata, isLoading: showLoading } = useFetch({
    endpoint: `https://api.themoviedb.org/3/tv/${showid}?language=en-US`,
    key: showid + "movie",
  });
  const { data: cast, isLoading: castLoading } = useFetch({
    endpoint: `https://api.themoviedb.org/3/tv/${showid}/credits?language=en-US`,
    key: showid + "cast",
  });
  const { data: teasers, isLoading: teaserLoading } = useFetch({
    endpoint: `https://api.themoviedb.org/3/tv/${showid}/videos?language=en-US`,
    key: showid + "teasers",
  });
  const { data: recommendations, isLoading: recommendationsLoading } = useFetch(
    {
      endpoint: `https://api.themoviedb.org/3/tv/${showid}/recommendations?language=en-US&page=1`,
      key: showid + "recommendations",
    }
  );

  const checkBookmark = useMemo(
    () => bookmarks?.find((b: Genre) => Number(b.id) === Number(showid)),
    [bookmarks, showid]
  );
  
  const teasersData = useMemo(
    () =>
      teasers?.results.filter(
        (value: TrailersResult) =>
          value?.type === "Teaser" || value?.type === "Trailer"
      ),
    [showid]
  );
  return (
    <ShowScreenWithLoader
      Loader={MovieLoader}
      isLoading={
        showLoading || castLoading || teaserLoading || recommendationsLoading
      }
      addBookmark={addBookmark}
      checkBookmark={checkBookmark}
      teasersData={teasersData}
      recommendations={recommendations}
      cast={cast}
      showdata={showdata}
      removeBookmark={removeBookmark}
      showid={Number(showid)}
    />
  );
};

export default Page;
