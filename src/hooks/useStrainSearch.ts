import { useEffect, useState } from "react";
import axios from "axios";
import { Query } from "../types/strain.d";
import { useStrainsContext } from "../context/StrainsContext";

const useStrainSearch = (query: Query, range: number) => {
  const { strains, setStrains } = useStrainsContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setStrains(null);
  }, [query.name, query.type, setStrains]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}api/strains`,
      params: { name: query.name, type: query.type, range: range },
    })
      .then((res) => {
        setLoading(false);
        setHasMore(range <= res.data.length);
        return setStrains(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
  }, [query, range, setStrains]);
  return {
    loading,
    error,
    strains,
    hasMore,
  };
};

export { useStrainSearch };
