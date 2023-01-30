import { CircularProgress } from "@mui/material";
import styles from './spinner.module.css'

const Spinner = () => (
  <div className={styles.spinner}>
    <CircularProgress />
  </div>
);

export default Spinner;
