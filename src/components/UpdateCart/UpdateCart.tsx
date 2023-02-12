import { Add, Remove, Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import styles from "./updateCart.module.css";

const UpdateCart = ({ id }: { id: string }) => {
  const {
    increaseCartQuantity,
    getItemQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    <>
      {!quantity ? (
        <Button
          variant="contained"
          onClick={() => increaseCartQuantity(id)}
          startIcon={<Add />}
        >
          Add to cart
        </Button>
      ) : (
        <div className={styles.quantity}>
          <IconButton
            onClick={() => decreaseQuantity(id)}
            color="primary"
            aria-label="minus"
            size="small"
          >
            <Remove fontSize="inherit" />
          </IconButton>
          <span>{quantity} in cart</span>
          <IconButton
            onClick={() => increaseCartQuantity(id)}
            color="primary"
            aria-label="add"
            size="small"
          >
            <Add fontSize="inherit" />
          </IconButton>
          <IconButton
            onClick={() => removeFromCart(id)}
            color="error"
            aria-label="delete"
            size="medium"
          >
            <Delete fontSize="inherit" />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default UpdateCart;
