import { useLocation } from "react-router-dom";
import { Effects, StrainType } from "../../types/strain";
import Spinner from "../Spinner/Spinner";
import styles from "./strainDetail.module.css";
import { ReactComponent as CannabisLogo } from "../../assets/cannabis-leaf.svg";
import { Breadcrumbs, Typography, Link } from "@mui/material";

const StrainDetail = () => {
  const { state } = useLocation();

  const EffectBars = ({ effects }: { effects: Effects }) => (
    <div className={styles.effectsContainer}>
      {Object.entries(effects).map((effect, index) => {
        return (
          <div key={index}>
            {effect[0]}: {effect[1]}
            <div className={styles.progress}>
              <div
                className={styles.progressBar}
                style={{ width: effect[1] }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const StrainContent = ({ strain }: { strain: StrainType }) => {
    const {
      name,
      type,
      description,
      img_url,
      thc_level,
      most_common_terpene,
      effects,
    } = strain;
    return (
      <div>
        <nav className={styles.breadcrumbs}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Strains
            </Link>
            <Typography color="text.primary">{name}</Typography>
          </Breadcrumbs>
        </nav>
        <div className={styles.layout}>
          <div className={styles.strainContainer}>
            {img_url ? (
              <div className={styles.imgContainer}>
                <img src={img_url} className={styles.img} alt={name} />
              </div>
            ) : (
              <div className={styles.logoCtn}>
                <CannabisLogo className={styles.cannabisLogo} />
              </div>
            )}
            <div className={styles.content}>
              <h1>{name}</h1>
              <div>
                <strong>Type: </strong>
                {type}
              </div>
              <p>{description}</p>
              <div>
                <strong>THC Levels: </strong>
                {thc_level}
              </div>
              <div>
                <strong>Terpene: </strong>
                {most_common_terpene}
              </div>
              <EffectBars effects={effects} />
            </div>
          </div>
        </div>
      </div>
    );
  };
  return state.strain ? <StrainContent strain={state.strain} /> : <Spinner />;
};

export default StrainDetail;
