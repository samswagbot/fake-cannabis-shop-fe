import { useState, useRef, useCallback } from "react";
import styles from "./strains.module.css";

import { Autocomplete, TextField } from "@mui/material";
import StrainCard from "../StrainCard/StrainCard";
import Filter from "../Filter/Filter";
import { useStrainSearch } from "../../hooks/useStrainSearch";
import { Query } from "../../types/strain.d";
import Spinner from "../Spinner/Spinner";

const Strains = () => {
  const [query, setQuery] = useState<Query>({
    name: "",
    type: "",
  });
  const [range, setRange] = useState(0);

  const { loading, strains, hasMore, error } = useStrainSearch(query, range);

  const observer = useRef<any>();
  const lastStrainElement = useCallback(
    (node: any) => {
      if (loading) return;
      // disconnects previous element
      if (observer.current) observer.current.disconnect();
      // creates new observer
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setRange((prev) => prev + 50);
        }
      });
      // set the new observer
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e: any) => {
    const { value, innerText } = e.target;
    const name = innerText ? innerText : value;
    setQuery({ ...query, name: name });
  };

  const handleTypes = (e: any) => {
    const { value } = e.target;
    setQuery({ ...query, type: value });
  };

  const CheckForStrains = () => {
    if (strains) {
      return (
        <div className={styles.grid}>
          {strains.map((strain, index) => {
            if (strains.length === index + 1) {
              return (
                <div ref={lastStrainElement} key={strain._id}>
                  <StrainCard strain={strain} />
                </div>
              );
            }
            return (
              <div key={strain._id}>
                <StrainCard strain={strain} />
              </div>
            );
          })}
        </div>
      );
    }
    return <div>No results found. Try again!</div>;
  };

  return (
    <div className={styles.layout}>
      <div className={styles.filter}>
        <Autocomplete
          id="search-cannabis"
          clearOnBlur={false}
          className={styles.search}
          options={(strains && strains.map(({ name }) => name)) || []}
          onChange={handleSearch}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search strains"
              onChange={handleSearch}
            />
          )}
        />
        <Filter onChange={handleTypes} />
      </div>
      {strains && <CheckForStrains />}
      {loading && <Spinner />}
      {error && "Can not load strains"}
    </div>
  );
};
export default Strains;
