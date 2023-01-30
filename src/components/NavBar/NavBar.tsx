import styles from "./navbar.module.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <h3>Sam's Cannabis Shop</h3>
      <button className={styles.cart}>
        <ShoppingCartOutlinedIcon />
      </button>
    </nav>
  );
};

export default NavBar;
