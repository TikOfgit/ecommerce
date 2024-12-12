import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  isCartOpen?: boolean;
  setIsCartOpen?: (isOpen: boolean) => void;
}

export default function Layout({ children, isCartOpen, setIsCartOpen }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
