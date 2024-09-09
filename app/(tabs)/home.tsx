import useFetch from "../../hooks/useFetch";
import { withLoader } from "../../HOC/withLoader";
import MovieScreen from "../../components/Screens/HomeScreen";
import HomeScreenLoader from "../../components/Loader/HomeScreenLoader";
import withNetworkCheck from "@/HOC/withNetworkCheck";
const HomeWithNetworkCheck = withNetworkCheck(MovieScreen)
const HomeWithLoader = withLoader(HomeWithNetworkCheck);
const index = () => {
  const urls = [
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
  ];

  const { data: nowPlayingMovies, isLoading: nowPlayingMoviesLoading } =
    useFetch({ endpoint: urls[0], key: "nowPlayingMovies" });
  const { data: nowPlayingShows, isLoading: nowPlayingShowsLoading } = useFetch(
    { endpoint: urls[1], key: "nowPlayingShows" }
  );
  const { data: popularMovies, isLoading: popularMoviesLoading } = useFetch({
    endpoint: urls[2],
    key: "popularMovies",
  });
  const { data: popularShows, isLoading: popularShowsLoading } = useFetch({
    endpoint: urls[3],
    key: "popularShows",
  });
  const { data: topRatedMovies, isLoading: topRatedMoviesLoading } = useFetch({
    endpoint: urls[4],
    key: "topRatedMovies",
  });
  const { data: topRatedShows, isLoading: topRatedShowsLoading } = useFetch({
    endpoint: urls[5],
    key: "topRatedShows",
  });
  const Loading =
    nowPlayingMoviesLoading ||
    nowPlayingShowsLoading ||
    popularMoviesLoading ||
    popularShowsLoading ||
    topRatedMoviesLoading ||
    topRatedShowsLoading;
  return (
    <HomeWithLoader
      isLoading={Loading}
      Loader={HomeScreenLoader}
      urls={urls}
      nowPlayingMovies={nowPlayingMovies}
      nowPlayingShows={nowPlayingShows}
      popularMovies={popularMovies}
      popularShows={popularShows}
      topRatedMovies={topRatedMovies}
      topRatedShows={topRatedShows}
    />
  );
};

export default index;
