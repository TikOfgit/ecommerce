import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';

interface SuccessProps {
  isCartOpen?: boolean;
  setIsCartOpen?: (isOpen: boolean) => void;
}

const Success: NextPage<SuccessProps> = ({ isCartOpen, setIsCartOpen }) => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <Layout isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}>
      <Head>
        <title>Paiement réussi - La Chabroderie</title>
        <meta name="description" content="Votre paiement a été effectué avec succès" />
      </Head>

      <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Paiement réussi
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Votre paiement a été traité avec succès. Vous recevrez bientôt un email de confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
