import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetch = ({ endpoint, key }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const response = await axios.get(
        endpoint,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
          },
        }
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
    enabled: !!key, // only run the query if movieid exists
    cacheTime: 10 * 60 * 1000, // keep data in cache for 10 minutes

  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetch;