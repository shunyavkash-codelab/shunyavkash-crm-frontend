import { useState, useCallback } from "react";
import { instance } from "../api/instance";

export default function useApi() {
  const [isLoading, setIsLoading] = useState(false);
  // const { accessToken } = useAuth();
  // const refresh = useRefresh();
  const apiCall = useCallback(async function (
    config = { url: "", method: "", params: {}, data: {} }
  ) {
    const apiInstance = instance;

    try {
      setIsLoading(true);

      if (true) {
        apiInstance.interceptors.request.use(
          (reqConfig) => {
            if (!reqConfig.headers.Authorization)
              reqConfig.headers.Authorization =
                "Bearer " +
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjljYTNiZDg2MzVmZWRjNDAxYmM4YiIsImlhdCI6MTcwMjI5MjI4NSwiZXhwIjoxNzAzMTU2Mjg1fQ.bMhFSunTBDU321dyN-tvs5x6HP-srKZQHxNcU_C3AuQ";
            return reqConfig;
          },
          (error) => Promise.reject(error)
        );

        apiInstance.interceptors.response.use(
          (response) => response,
          async (error) => {
            const prevRequest = error?.config;

            if (
              (error?.response?.status === 403 ||
                error?.response?.status === 401) &&
              !prevRequest?.sent
            ) {
              return apiInstance(prevRequest);
            } else throw error;
          }
        );
      }
      const res = await apiInstance(config);
      setIsLoading(false);
      return res;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  },
  []);
  return {
    isLoading,
    setIsLoading,
    apiCall,
  };
}
