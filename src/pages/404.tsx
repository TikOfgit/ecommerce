import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const Custom404: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>404 - Page non trouvée | La Chabroderie</title>
        <meta name="description" content="Page non trouvée" />
      </Head>

      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
          
          <div className="mt-4">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
              Page non trouvée
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Désolé, nous n&apos;avons pas trouvé la page que vous recherchez.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Retour à l&apos;accueil
            </Link>
          </div>

          <div className="mt-6 text-gray-500">
            <p>Vous pouvez également :</p>
            <ul className="mt-2 list-disc list-inside">
              <li>
                <Link href="/products" className="text-blue-600 hover:text-blue-800">
                  Voir nos produits
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-600 hover:text-blue-800">
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Custom404;
