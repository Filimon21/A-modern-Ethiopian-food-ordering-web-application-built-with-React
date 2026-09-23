import { useEffect, useState } from "react";

function useFetch(fetcher, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const result = await fetcher();

        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(
            "useFetch error:",
            err
          );

          setError(err);
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, dependencies);

  return {
    data,
    loading,
    error,
  };
}

export default useFetch;