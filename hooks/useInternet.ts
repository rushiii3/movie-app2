import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

const useInternet = () => {
  useEffect(() => {
    // Fixes first call to NetInfo.fetch() returning `isInternetReachable` null on iOS
    // https://github.com/react-native-netinfo/react-native-netinfo/issues/572
    NetInfo.fetch();
  }, []);

  const hasInternet = async () => {
    const { isConnected, isInternetReachable } = await NetInfo.fetch();
    return isConnected && isInternetReachable ? true : false;
  };

  return { isConnected : hasInternet() };
};

export default useInternet;
