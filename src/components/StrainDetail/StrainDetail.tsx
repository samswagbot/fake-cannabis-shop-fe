import { useLocation } from "react-router-dom";
import { Effects, StrainType } from "../../types/strain";
import Spinner from "../Spinner/Spinner";
import styles from "./strainDetail.module.css";

const StrainDetail = () => {
  const { state } = useLocation();

  const EffectBars = ({ effects }: { effects: Effects }) => (
    <div className={styles.effectsContainer}>
      {Object.entries(effects).map((effect, index) => {
        return (
          <div key={index}>
            {effect[0]} : {effect[1]}
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
      <div className={styles.strain}>
        <img className={styles.img} src={img_url} alt={strain.name} />
        <div className={styles.content}>
          <h1>{name}</h1>
          <div>{type}</div>
          <p>{description}</p>
          <div>THC Levels: {thc_level}</div>
          <div>Terpene: {most_common_terpene}</div>
          <EffectBars effects={effects} />
        </div>
      </div>
    );
  };
  return state.strain ? <StrainContent strain={state.strain} /> : <Spinner />;
};

export default StrainDetail;
