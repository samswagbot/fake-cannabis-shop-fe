import styles from "./navbar.module.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useShoppingCart } from "../../context/ShoppingCartContext";
const NavBar = () => {
  const { cartQuantity, openCart } = useShoppingCart();

  return (
    <nav className={styles.nav}>
      <h3>Sam's Cannabis Shop</h3>
      {cartQuantity > 0 && (
        <button onClick={openCart} className={styles.cart}>
          <ShoppingCartOutlinedIcon />
          <span className={styles.quantity}>{cartQuantity}</span>
        </button>
      )}
    </nav>
  );
};

export default NavBar;
