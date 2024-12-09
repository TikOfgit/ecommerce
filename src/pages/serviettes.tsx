import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';

// Données des serviettes (à remplacer par des vraies données plus tard)
const serviettes = [
  {
    id: 1,
    name: "Serviette Éléphant Rose",
    price: "25.00",
    description: "Douce serviette brodée avec un adorable éléphant rose",
    image: "/images/placeholder.jpg"
  },
  {
    id: 2,
    name: "Serviette Lapin Bleu",
    price: "25.00",
    description: "Serviette moelleuse avec un mignon petit lapin bleu",
    image: "/images/placeholder.jpg"
  },
  {
    id: 3,
    name: "Serviette Ourson Beige",
    price: "25.00",
    description: "Serviette délicate avec un tendre ourson beige",
    image: "/images/placeholder.jpg"
  }
];

const ServiettesPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Nos Serviettes de Bébé | La Chabroderie</title>
        <meta name="description" content="Découvrez notre collection de serviettes personnalisées pour bébé" />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Nos Serviettes</span>
              <span className="block text-blue-600">Pour Votre Petit Trésor</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Des serviettes douces et personnalisées, brodées avec amour pour votre bébé
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">100% Coton</h3>
              <p className="mt-2 text-base text-gray-500">
                Matériaux doux et naturels pour la peau sensible de bébé
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Personnalisable</h3>
              <p className="mt-2 text-base text-gray-500">
                Broderie personnalisée avec le prénom de votre choix
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Fait Main</h3>
              <p className="mt-2 text-base text-gray-500">
                Chaque serviette est confectionnée avec soin et attention
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {serviettes.map((serviette) => (
            <div key={serviette.id} className="group relative bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Image à venir</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    <Link href={`/serviettes/${serviette.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {serviette.name}
                    </Link>
                  </h3>
                  <p className="text-lg font-medium text-gray-900">{serviette.price}€</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{serviette.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Une serviette unique</span>
            <span className="block">pour votre bébé unique</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Offrez à votre bébé le confort et la douceur qu'il mérite avec nos serviettes personnalisées.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
          >
            Contactez-nous pour personnaliser
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiettesPage;
