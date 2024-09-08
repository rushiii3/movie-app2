export const withLoader = (Component) => {
  return ({ isLoading, Loader, ...props }) => {
    if (isLoading) {
      return <Loader />;
    }
    return <Component {...props} />;
  };
};
