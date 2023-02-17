import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";


interface ShoppingCartProviderProps {
  children: ReactNode;
}

interface CartItem {
  id: string;
  quantity: number;
}

interface ShoppingCartContextProps {
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
  setUserToken: (data: string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  isOpen: boolean;
  token: string | null;
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [token, setToken] = useLocalStorage<null | string>("token", null);
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce(
    (quantity, items) => quantity + items.quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function setUserToken(data: string) {
    setToken(data);
  }

  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: string) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseQuantity(id: string) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: string) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseQuantity,
        removeFromCart,
        cartQuantity,
        cartItems,
        openCart,
        closeCart,
        isOpen,
        setUserToken,
        token,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
