import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import styles from "./strains.module.css";
import { StrainType } from "../../types/strain";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import StrainCard from "../StrainCard/StrainCard";

const Strains = () => {
  const [strains, setStrains] = useState<StrainType[] | null>(null);
  useEffect(() => {
    fetch("/api/strains")
      .then((res) => res.json())
      .then((data) => setStrains(data));
  }, []);

  return (
    <div className={styles.layout}>
      {strains ? (
        <>
          <Autocomplete
            id="search-cannabis"
            freeSolo
            className={styles.search}
            options={strains.map(({ name }) => name)}
            renderInput={(params) => (
              <TextField {...params} label="Search strains" />
            )}
          />
          <div className={styles.grid}>
            {strains.map((strain) => (
              <StrainCard strain={strain} />
            ))}
          </div>
        </>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};
export default Strains;
