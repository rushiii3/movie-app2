import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
interface Genre {
  id: number;
  name: string;
  isSelected: boolean;
}

// Helper function to construct URLs based on type, search phrase, and selected genres
const buildURL = (
  type: "movie" | "shows",
  searchPhrase: string,
  pageParam: number,
  selectedGenres: string
) => {
  const baseUrl = `https://api.themoviedb.org/3`;
  const searchEndpoint = type === "movie" ? "search/movie" : "search/tv";
  const discoverEndpoint = type === "movie" ? "discover/movie" : "discover/tv";
  const query = searchPhrase
    ? `query=${searchPhrase}`
    : `with_genres=${selectedGenres}`;

  return `${baseUrl}/${
    searchPhrase ? searchEndpoint : discoverEndpoint
  }?language=en-US&page=${pageParam}&${query}`;
};

export const useList = (
  genres: { genres: Genre[] },
  type: "movie" | "shows"
) => {
  // Initialize state for genres and search phrase
  const [genresWithSelection, setGenresWithSelection] = useState(
    genres?.genres.map((genre) => ({ ...genre, isSelected: false }))
  );
  const [searchPhrase, setSearchPhrase] = useState<string>("");

  // Derive selected genres from the state
  const selectedGenres = genresWithSelection
    .filter((genre) => genre.isSelected)
    .map((genre) => genre.id)
    .join(",");

  // Use React Query's useInfiniteQuery for infinite scrolling
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [`All-${type}`, selectedGenres, searchPhrase],
    queryFn: async ({ pageParam = 1 }) => {
      const url = buildURL(type, searchPhrase, pageParam, selectedGenres);
      const { data } = await axios.get(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
        },
      });
      return data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 120000, // 2 minutes
    initialPageParam: 1,
  });

  // Handle the end of list reached for infinite scroll
  const handleEndReached = () => {
    if (hasNextPage) fetchNextPage();
  };

  return {
    data,
    isLoading,
    searchPhrase,
    setSearchPhrase,
    selectedGenres,
    genresWithSelection,
    setGenresWithSelection,
    handleEndReached,
  };
};
