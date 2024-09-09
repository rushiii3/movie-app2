import React from "react";
import NoInternet from "@/components/NoInternet";
import { useNetInfo } from "@react-native-community/netinfo";

const withNetworkCheck = (WrappedComponent) => {
  return (props) => {
    const { isConnected, isInternetReachable } = useNetInfo();
// 
    if (isInternetReachable || isConnected) {
      return <WrappedComponent {...props} />; // Render the wrapped component with all props passed through
    }

    return <NoInternet />; // Render the NoInternet component if not connected
  };
};

export default withNetworkCheck;
