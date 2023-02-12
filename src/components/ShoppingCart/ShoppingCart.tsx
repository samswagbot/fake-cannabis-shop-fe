import { Close } from "@mui/icons-material";
import { Divider, Drawer, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useStrainsContext } from "../../context/StrainsContext";
import { formatCurrency } from "../../utils/formatCurrenecy";
import CartItem from "../CartItem/CartItem";
import styles from "./shoppingCart.module.css";

const ShoppingCart = () => {
  const { closeCart, cartItems, isOpen } = useShoppingCart();
  const { strains } = useStrainsContext();

  return (
    <Drawer anchor="right" open={isOpen} onClose={closeCart}>
      <Box sx={{ width: "500px" }} onKeyDown={closeCart}>
        <div className={styles.cartHeader}>
          <h1>Cart</h1>
          <IconButton onClick={closeCart} color="primary" aria-label="close">
            <Close fontSize="inherit" />
          </IconButton>
        </div>
        <Divider />
        <Stack direction="column" spacing={2}>
          {cartItems.map((item) => {
            return <CartItem {...item} key={item.id} />;
          })}
          <Divider />
          <div className={styles.total}>
            Total:{" "}
            {formatCurrency(
              cartItems.reduce((total, currentCartItem) => {
                const strain = strains?.find(
                  (strain) => strain._id === currentCartItem.id
                );

                const price = strain ? strain.price : 0;

                return total + price * currentCartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default ShoppingCart;
