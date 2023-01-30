import { useEffect, useState } from "react";
import axios from "axios";
import { Query, StrainType } from "../types/strain.d";

const useStrainSearch = (query: Query, range: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [strains, setStrains] = useState<StrainType[] | null>(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
      setStrains(null)
  }, [query.name, query.type])


  useEffect(() => { 
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: "/api/strains",
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
  }, [query, range]);
  return {
    loading,
    error,
    strains,
    hasMore,
  };
};

export { useStrainSearch };
