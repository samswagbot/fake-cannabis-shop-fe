import { Link } from "react-router-dom";
import { ReactComponent as CannabisLogo } from "../../assets/cannabis-leaf.svg";

import { StrainType } from "../../types/strain";
import { formatCurrency } from "../../utils/formatCurrenecy";
import styles from "../Strains/strains.module.css";
import UpdateCart from "../UpdateCart/UpdateCart";

const StrainCard = ({ strain }: { strain: StrainType }) => {
  const { _id, img_url, name, thc_level, type, description, price } = strain;

  return (
    <div className={styles.strain}>
      {img_url ? (
        <img src={img_url} className={styles.img} alt={name} />
      ) : (
        <div className={styles.logoCtn}>
          <CannabisLogo className={styles.cannabisLogo} />
        </div>
      )}
      <div>
        <div className={styles.content}>
          <h4 className={styles.name}>{name}</h4>
          <div className={styles.type}>{type}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.thcLevels}>THC Levels: {thc_level}</div>
        </div>
        <div className={styles.price}>
          <Link key={_id} state={{ strain }} to={`/strains/${_id}`}>
            Learn More
          </Link>
          <div>
            <strong>Price: </strong>
            <span>{formatCurrency(price)}</span>
          </div>
        </div>
        <div className={styles.cta}>
          <UpdateCart id={_id} />
        </div>
      </div>
    </div>
  );
};

export default StrainCard;
