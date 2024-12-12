import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CartProvider } from '../context/CartContext';
import { useState } from 'react';
import SlideCart from '../components/SlideCart';

function MyApp({ Component, pageProps }: AppProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Component {...pageProps} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <SlideCart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </CartProvider>
  );
}

export default MyApp;
