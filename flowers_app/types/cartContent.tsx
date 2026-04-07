import React, {createContext, useContext, useState} from "react";
import { Item } from "./item";

type CartItem = Item & { quantity: number };

type CardContextType = {
    cart: CartItem[];
    addToCart: (item: Item) => void;
    removeFromCart: (itemId: number) => void;
    getTotal: () => number;
};

const CartContext = createContext<CardContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode}) {
    const [cart, setCart] = useState<CartItem[]>([]);

    function addToCart(item: Item){
        setCart(prev => {
            const exist = prev.find(product => product.id === item.id);
            if(exist){
                return prev.map(product => 
                    product.id === item.id
                    ? {...product, quantity: product.quantity + 1}
                    : product
                );
            }
            return [...prev, {...item, quantity: 1}];
        });
    }

    function removeFromCart(itemId: number) {
        setCart(prev => prev.filter(item => item.id !== itemId));
    }

    function getTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    const value = { cart, addToCart, removeFromCart, getTotal };

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, getTotal}}>
            {children}
        </CartContext.Provider>
    );
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}