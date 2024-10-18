import * as WebBrowser from "expo-web-browser";

export const useOpenBrowser = () => {
  const openURL = async (type: string, id: string) => {
    const playBackUrl = `https://vidsrc.to/embed/${type}/${id}`;
    await WebBrowser.openBrowserAsync(playBackUrl);
  };

  return { openURL };
};
