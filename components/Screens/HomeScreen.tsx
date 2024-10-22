import React from "react";
import HorizontalTransaction from "../HorizontalTransaction";
import Feeds from "../Feeds";
import {
  NowPlayingMovies,
  NowPlayingShows,
  PopularMovies,
  PopularShows,
  TopRatedMovies,
  TopRatedShows,
  Trending,
} from "@/types";

interface HomeScreenProps {
  urls: string[];
  nowPlayingMovies: NowPlayingMovies;
  nowPlayingShows: NowPlayingShows;
  popularMovies: PopularMovies;
  popularShows: PopularShows;
  topRatedMovies: TopRatedMovies;
  topRatedShows: TopRatedShows;
  trendings: Trending;
}
const HomeScreen = ({
  urls,
  nowPlayingMovies,
  nowPlayingShows,
  popularMovies,
  popularShows,
  topRatedMovies,
  topRatedShows,
  trendings,
}: HomeScreenProps) => {
  return (
    <>
      {/* trending */}
      <HorizontalTransaction data={trendings} />
      {/* now playing movies */}
      <Feeds
        title={"Now Playing Movies"}
        data={nowPlayingMovies?.results}
        type={"movie"}
        url={urls[0]}
      />
      {/* now playing shows */}
      <Feeds
        title={"Now Playing Shows"}
        data={nowPlayingShows?.results}
        type={"tv"}
        url={urls[1]}
      />
      {/* popular movies */}
      <Feeds
        title={"Popular Movies"}
        data={popularMovies?.results}
        type={"movie"}
        url={urls[2]}
      />

      {/* popular shows */}
      <Feeds
        title={"Popular Shows"}
        data={popularShows?.results}
        type={"tv"}
        url={urls[3]}
      />
      {/* top rated movies */}
      <Feeds
        title={"Top Rated Movies"}
        data={topRatedMovies?.results}
        type={"movie"}
        url={urls[4]}
      />
      {/* top rated shows */}
      <Feeds
        title={"Top Rated Shows"}
        data={topRatedShows?.results}
        type={"tv"}
        url={urls[5]}
      />
    </>
  );
};

export default HomeScreen;
