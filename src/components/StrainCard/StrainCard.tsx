import { type } from "@testing-library/user-event/dist/type";
import { Link } from "react-router-dom";
import { ReactComponent as CannabisLogo } from "../../assets/cannabis-leaf.svg";
import { StrainType } from "../../types/strain";
import styles from "../Strains/strains.module.css";

const StrainCard = ({ strain }: { strain: StrainType }) => {
  const { _id, img_url, name, thc_level, type, description } = strain;
  return (
    <Link
      to={`/strains/${_id}`}
      key={_id}
      state={{ strain }}
      className={styles.strain}
    >
      {img_url ? (
        <img src={img_url} className={styles.img} alt={name} />
      ) : (
        <div className={styles.logoCtn}>
          <CannabisLogo className={styles.cannabisLogo} />
        </div>
      )}
      <div className={styles.content}>
        <h4 className={styles.name}>{name}</h4>
        <div className={styles.type}>{type}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.thcLevels}>THC Levels: {thc_level}</div>
      </div>
    </Link>
  );
};

export default StrainCard;
