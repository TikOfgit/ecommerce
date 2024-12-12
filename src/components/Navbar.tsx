import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  isCartOpen?: boolean;
  setIsCartOpen?: (isOpen: boolean) => void;
}

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Serviettes', href: '/serviettes' },
  { name: 'À propos', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar({ isCartOpen = false, setIsCartOpen = () => {} }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et Navigation Desktop */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                La Chabroderie
              </Link>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Bouton Panier et Menu Mobile */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="ml-4 group -m-2 p-2 flex items-center"
              aria-label="Panier"
            >
              <ShoppingBagIcon
                className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              {itemCount > 0 && (
                <span className="ml-2 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Bouton Menu Mobile */}
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Ouvrir le menu principal</span>
                {isMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
