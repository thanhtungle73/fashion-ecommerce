import { createContext, useContext, useState } from 'react';
import { FieldValue, ProductData } from '../models';

interface CartItemData {
  id: string;
  product: ProductData;
  quantity: number;
  size: string;
  color: string;
}

interface CartDataContext {
  showMiniCart: boolean;
  cartItems: Array<CartItemData>;
  showCart: () => void;
  hideCart: () => void;
  addToCart: (newProduct: any) => void;
  setQuantity: (productId: string, quantityData: FieldValue) => void;
  removeFromCart: (productId: string) => void;
  removeAllFromCart: () => void;
}

interface CartData {
  showMiniCart: boolean;
  cartItems: Array<CartItemData>;
}

const CartContext = createContext<CartDataContext>({
  showMiniCart: false,
  cartItems: [],
  showCart: () => {},
  hideCart: () => {},
  addToCart: () => {},
  setQuantity: () => {},
  removeFromCart: () => {},
  removeAllFromCart: () => {},
});

export function CartProvider({ children }: any) {
  const [cartData, setCartData] = useState<CartData>({
    showMiniCart: false,
    cartItems: [],
  });

  const showCart = () => {
    setCartData({ ...cartData, showMiniCart: true });

    setTimeout(() => {
      setCartData({ ...cartData, showMiniCart: false });
    }, 5000);
  };

  const hideCart = () => {
    setCartData({ ...cartData, showMiniCart: false });
  };

  const addToCart = (newProduct: any) => {
    const index = cartData.cartItems.findIndex((x: any) => x.id === newProduct.id);
    const clonedCartData = { ...cartData };

    if (index >= 0) {
      // Increase quantity
      clonedCartData.cartItems[index].quantity += Number(newProduct.quantity);
    } else {
      // Adding new product if it's not existing before.
      clonedCartData.cartItems.push(newProduct);
    }

    setCartData({ ...cartData, ...clonedCartData });
  };

  const setQuantity = (productId: string, quantityData: FieldValue) => {
    const index = cartData.cartItems.findIndex((x: any) => x.id === productId);
    if (index >= 0) {
      const clonedCartData = { ...cartData };
      clonedCartData.cartItems[index].quantity = Number(quantityData.quantity);
      setCartData({ ...cartData, ...clonedCartData });
    }
  };

  const removeFromCart = (productId: string) => {
    const clonedCartData = { ...cartData };
    clonedCartData.cartItems = clonedCartData.cartItems.filter((x) => x.id !== productId);
    setCartData({ ...cartData, ...clonedCartData });
  };

  const removeAllFromCart = () => {
    const clonedCartData = { ...cartData };
    clonedCartData.cartItems = [];
    setCartData({ ...cartData, ...clonedCartData });
  };

  return (
    <CartContext.Provider
      value={{
        ...cartData,
        showCart,
        hideCart,
        addToCart,
        setQuantity,
        removeFromCart,
        removeAllFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  return useContext(CartContext);
};
