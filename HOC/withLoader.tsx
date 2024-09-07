import MovieLoader from "@/components/Loader/MovieLoader";


export const withLoader = (Component) => {
  return ({ isLoading, ...props }) => {
    if (isLoading) {
      return (
        <MovieLoader />
      );
    }
    return <Component {...props} />;
  };
};
