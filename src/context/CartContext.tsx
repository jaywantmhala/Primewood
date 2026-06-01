"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";
import { defaultProducts } from "@/data/products";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number, selectedColor?: string | null) => void;
  updateQuantity: (index: number, change: number) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("interio_cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("interio_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (productId: string, quantity = 1, selectedColor: string | null = null) => {
    const product = defaultProducts.find((p) => p.id === productId);
    if (!product) return;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === productId && (!selectedColor || item.color === selectedColor)
      );

      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            color: selectedColor || product.variant,
            quantity: quantity,
          },
        ];
      }
    });

    showToast("Product got added to your cart", "success");
  };

  const updateQuantity = (index: number, change: number) => {
    setCart((prev) => {
      const newCart = [...prev];
      if (newCart[index]) {
        newCart[index].quantity += change;
        if (newCart[index].quantity <= 0) {
          newCart.splice(index, 1);
        }
      }
      return newCart;
    });
  };

  const removeItem = (index: number) => {
    setCart((prev) => {
      const newCart = [...prev];
      if (newCart[index]) {
        showToast(`Removed ${newCart[index].name} from Cart`, "info");
        newCart.splice(index, 1);
      }
      return newCart;
    });
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeItem, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
