import { Product } from './product';

/**
 * Représente un article dans le panier
 */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

/**
 * Props pour les pages avec fonctionnalité de panier
 */
export interface CartPageProps {
  isCartOpen?: boolean;
  setIsCartOpen?: (isOpen: boolean) => void;
}

/**
 * Type pour le contexte du panier
 */
export interface CartContextType {
  cart: CartItem[];
  total: number;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}
