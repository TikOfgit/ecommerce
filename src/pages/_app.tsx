import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CartProvider } from '../context/CartContext';
import { useState } from 'react';
import SlideCart from '../components/SlideCart';

type CustomAppProps = AppProps & {
  Component: AppProps['Component'] & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
  };
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CartProvider>
      {getLayout(
        <>
          <Component {...pageProps} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
          <SlideCart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
        </>
      )}
    </CartProvider>
  );
}

export default MyApp;
