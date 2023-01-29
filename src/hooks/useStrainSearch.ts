import { useEffect, useState } from "react";
import axios from "axios";
import { Query, StrainType } from "../types/strain.d";

const useStrainSearch = (query: Query, pageNumber: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [strains, setStrains] = useState<StrainType[] | null>(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let cancel: () => void;
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: "/api/strains",
      params: { name: query.name, type: query.type },
      cancelToken: new axios.CancelToken(c => cancel = c),
    })
      .then((res) => {
        setHasMore(res.data.length > 0);
        setLoading(false);
        return setStrains(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
      return () => cancel()
  }, [query, pageNumber]);
  return {
    loading,
    error,
    strains,
    hasMore,
  };
};

export { useStrainSearch };
