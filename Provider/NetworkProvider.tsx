import React, { FC, ReactNode, useEffect, useState } from "react";
import NoInternet from "@/components/NoInternet";
import NetInfo from "@react-native-community/netinfo";

const NetworkProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [IsNotConnected, setIsNotConnected] = useState(false);
  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      if (state.isInternetReachable !== null) {
        const offline = !(state.isConnected && state.isInternetReachable);
        setIsNotConnected(offline);
      }
    });
    return () => removeNetInfoSubscription();
  }, [IsNotConnected]);

  if (IsNotConnected) {
    return <NoInternet />;
  }

  return children;
};

export default NetworkProvider;
