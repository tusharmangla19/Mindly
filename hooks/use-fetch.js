import { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    console.log('useFetch: fn called with args:', args);
    try {
      const response = await cb(...args);
      console.log('useFetch: response received:', response);
      setData(response);
      setError(null);
    } catch (error) {
      console.log('useFetch: error occurred:', error);
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
      console.log('useFetch: loading set to false');
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
