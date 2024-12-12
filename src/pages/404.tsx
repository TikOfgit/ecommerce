import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { CartPageProps } from '../types/cart';

const Custom404: NextPage<CartPageProps> = ({ isCartOpen, setIsCartOpen }) => {
  return (
    <Layout isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}>
      <Head>
        <title>404 - Page non trouvée | La Chabroderie</title>
        <meta name="description" content="Page non trouvée" />
      </Head>

      <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-max mx-auto text-center">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Erreur 404</p>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Page non trouvée
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Désolé, nous n'avons pas trouvé la page que vous recherchez.
          </p>
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

export default Custom404;
