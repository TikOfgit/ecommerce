import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const SuccessPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Head>
        <title>Paiement réussi - La Chabroderie</title>
      </Head>

      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Paiement réussi !
        </h1>
        <p className="text-gray-600 mb-6">
          Merci pour votre achat. Vous recevrez bientôt un email de confirmation.
        </p>
        <Link 
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
