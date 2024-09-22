import React, { ComponentType, FC } from "react";

interface LoderProps {
  isLoading: boolean;
  Loader: ComponentType;
}
export const withLoader = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return ({ isLoading, Loader, ...props }: LoderProps & P) => {
    if (isLoading) {
      return <Loader />;
    }
    return <Component {...(props as P)} />;
  };
};
