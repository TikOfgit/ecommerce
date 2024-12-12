import { Product } from './product';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartPageProps {
  isCartOpen?: boolean;
  setIsCartOpen?: (isOpen: boolean) => void;
}

export interface CartContextType {
  cart: CartItem[];
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}
