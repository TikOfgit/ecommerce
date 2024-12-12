import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartContextType, CartItem } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Provider pour le contexte du panier
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  // Charger le panier depuis le localStorage au démarrage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Sauvegarder le panier et calculer le total
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
        const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(newTotal);
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du panier:', error);
      }
    }
  }, [cart]);

  const addToCart = (product: CartItem) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      
      return [...currentCart, product];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const value = {
    cart,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook personnalisé pour utiliser le contexte du panier
 */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart doit être utilisé à l\'intérieur d\'un CartProvider');
  }
  return context;
}
