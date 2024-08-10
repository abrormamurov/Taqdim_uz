import { useState, useEffect, useRef } from "react";

const useFetch = (fetchData, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const loadData = async () => {
      try {
        console.log("Fetching data with params:", params);
        const formattedParams = formatParams(params);
        const result = await fetchData(formattedParams, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setData(result);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err.response ? err.response.data : err);
        setError(err.response ? err.response.data : err);
        setLoading(false);
      }
    };

    loadData();
  }, [fetchData, params]);

  return { data, loading, error };
};

const formatParams = (params) => {
  const formattedParams = { ...params };
  for (const key in formattedParams) {
    if (Array.isArray(formattedParams[key])) {
      formattedParams[key] = formattedParams[key][0];
    }
  }
  return formattedParams;
};

export default useFetch;
