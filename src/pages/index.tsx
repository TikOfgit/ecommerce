import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>La Chabroderie - Boutique Bébé</title>
        <meta name="description" content="Boutique en ligne de produits pour bébé" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Bienvenue sur La Chabroderie
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Votre boutique en ligne de produits pour bébé
        </p>
      </main>
    </div>
  );
};

export default Home;
