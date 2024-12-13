import { Fragment } from 'react';
import * as Headless from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

interface SlideCartProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * Composant de panier coulissant
 */
export default function SlideCart({ isOpen, setIsOpen }: SlideCartProps) {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  return (
    <Headless.Transition.Root show={isOpen} as={Fragment}>
      <Headless.Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        {/* Overlay */}
        <Headless.Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Headless.Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              {/* Panneau coulissant */}
              <Headless.Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Headless.Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    {/* En-tête */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Headless.Dialog.Title className="text-lg font-medium text-gray-900">
                          Panier ({cart.length} articles)
                        </Headless.Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Fermer le panneau</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {/* Contenu du panier */}
                      {cart.length === 0 ? (
                        <div className="mt-8 text-center">
                          <div className="relative w-64 h-64 mx-auto mb-4">
                            <Image
                              src="https://i.ibb.co/DpcDF45/cute-cat-handdrawn-07.png"
                              alt="Panier vide - Chat mignon"
                              width={256}
                              height={256}
                              style={{ objectFit: 'contain' }}
                              priority
                              unoptimized
                            />
                          </div>
                          <p className="text-lg font-medium text-gray-900 mb-2">
                            Votre panier est vide
                          </p>
                          <p className="text-gray-500">
                            Ajoutez des produits pour commencer vos achats 😺
                          </p>
                        </div>
                      ) : (
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cart.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  {/* Image du produit */}
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      src={product.image_url}
                                      alt={product.name}
                                      width={96}
                                      height={96}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  {/* Détails du produit */}
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link href={`/serviettes`} className="hover:text-blue-600">
                                            {product.name}
                                          </Link>
                                        </h3>
                                        <p className="ml-4">{product.price.toFixed(2)}€</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      {/* Sélecteur de quantité */}
                                      <div className="flex items-center">
                                        <label htmlFor={`quantity-${product.id}`} className="mr-2 text-gray-500">
                                          Qté
                                        </label>
                                        <select
                                          id={`quantity-${product.id}`}
                                          value={product.quantity}
                                          onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                                          className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                                        >
                                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                            <option key={num} value={num}>
                                              {num}
                                            </option>
                                          ))}
                                        </select>
                                      </div>

                                      {/* Bouton supprimer */}
                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() => removeFromCart(product.id)}
                                          className="font-medium text-blue-600 hover:text-blue-500"
                                        >
                                          Supprimer
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Pied de page avec total et bouton commander */}
                    {cart.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Total</p>
                          <p>{total.toFixed(2)}€</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Frais de livraison calculés à la commande.
                        </p>
                        <div className="mt-6">
                          <Link
                            href="/checkout"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
                          >
                            Commander
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            ou{' '}
                            <button
                              type="button"
                              className="font-medium text-blue-600 hover:text-blue-500"
                              onClick={() => setIsOpen(false)}
                            >
                              Continuer vos achats
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Headless.Dialog.Panel>
              </Headless.Transition.Child>
            </div>
          </div>
        </div>
      </Headless.Dialog>
    </Headless.Transition.Root>
  );
}
