import { Close, Delete } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useStrainsContext } from "../../context/StrainsContext";
import { formatCurrency } from "../../utils/formatCurrenecy";
import styles from "./cartItem.module.css";

const CartItem = ({ id, quantity }: { id: string; quantity: number }) => {
  const { removeFromCart } = useShoppingCart();
  const { strains } = useStrainsContext();
  const item = strains?.find((i) => i._id === id);

  if (!item) return null;

  return (
    <Stack direction="row" spacing={3}>
      <img className={styles.img} src={item?.img_url} alt="cannabis-img" />
      <div className={styles.cartItem}>
        <div>
          <div className={styles.name}>
            {item.name} {' '}
            <span className={styles.price}>{quantity > 1 && `x${quantity}`}</span>
          </div>

          <div className={styles.price}>{formatCurrency(item?.price)}</div>
        </div>
        <div className={styles.subtotal}>
          <span>{formatCurrency(item.price * quantity)}</span>
          <IconButton
            onClick={() => removeFromCart(item._id)}
            aria-label="close"
            size="small"
          >
            <Close fontSize="inherit" />
          </IconButton>
        </div>
      </div>
    </Stack>
  );
};

export default CartItem;
