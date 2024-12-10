import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>La Chabroderie - Produits artisanaux faits avec amour</title>
        <meta name="description" content="Découvrez notre collection unique de produits artisanaux faits avec amour et passion." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1">
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Texte à gauche */}
                <div className="flex-1 text-left">
                  <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Bienvenue chez</span>
                    <span className="block text-blue-600">La Chabroderie</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg max-w-xl md:mt-5 md:text-xl">
                    Découvrez notre collection unique de produits artisanaux faits avec amour et passion.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/serviettes"
                      className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Voir nos produits
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                    >
                      Nous contacter
                    </Link>
                  </div>
                </div>

                {/* Image à droite */}
                <div className="flex-1 w-full">
                  <div className="relative w-full h-[500px]">
                    <Image
                      src="https://i.ibb.co/FJft51h/header-img.jpg"
                      alt="Produit artisanal La Chabroderie"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg shadow-2xl"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
