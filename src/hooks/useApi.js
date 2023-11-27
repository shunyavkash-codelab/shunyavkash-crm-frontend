import { useState } from "react";
import { instance } from "../api/instance";

export default function useApi() {
  const [isLoading, setIsLoading] = useState(false);

  return {
    async apiCall(config = { url: "", method: "", params: {}, data: {} }) {
      try {
        setIsLoading(true);
        const res = await instance(config);
        setIsLoading(false);
        return res;
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    },
    isLoading,
    setIsLoading,
  };
}
