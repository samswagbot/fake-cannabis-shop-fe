import styles from "./navbar.module.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const { cartQuantity, openCart } = useShoppingCart();
   const { token } = useShoppingCart();
  
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate(0);
  };

  return (
    <nav className={styles.nav}>
      <h3>Sam's Cannabis Shop</h3>
      <div className={styles.ctn}>
        {cartQuantity > 0 && token && (
          <button onClick={openCart} className={styles.cart}>
            <ShoppingCartOutlinedIcon />
            <span className={styles.quantity}>{cartQuantity}</span>
          </button>
        )}
        {token && (
          <Button onClick={handleLogOut} color="inherit" variant="outlined">
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
