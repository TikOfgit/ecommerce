import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { CartPageProps } from '../types/cart';

const Cancel: NextPage<CartPageProps> = ({ isCartOpen, setIsCartOpen }) => {
  return (
    <Layout isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}>
      <Head>
        <title>Paiement annulé - La Chabroderie</title>
        <meta name="description" content="Votre paiement a été annulé" />
      </Head>

      <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-max mx-auto text-center">
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Paiement annulé</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>Votre paiement a été annulé. Aucun montant n'a été débité.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
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

export default Cancel;
