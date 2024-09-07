import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";

const useParallelFetch = ({ endpoint, key }) => {
  const results = useQueries({
    queries: queriesConfig.map((config) => {
      return {
        queryKey: [config.key],
        queryFn: async () => {
          const response = await axios.get(config.endpoint, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
            },
          });
          return response.data;
        },
      };
    }),
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useParallelFetch;
