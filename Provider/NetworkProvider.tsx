import React from "react";
import NoInternet from "@/components/NoInternet";
import { useNetInfo } from "@react-native-community/netinfo";

const NetworkProvider = ({ children }) => {
  const { isConnected, isInternetReachable } = useNetInfo();

  if (false) {
    return children; // Return children directly
  }

  return <NoInternet />; // Return NoInternet component if not connected
};

export default NetworkProvider;
