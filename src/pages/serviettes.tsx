import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { Product } from '../types/product';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ServiettesPage: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'serviette');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <Head>
        <title>Serviettes Personnalisées pour Bébé - La Chabroderie</title>
        <meta 
          name="description" 
          content="Découvrez notre collection de serviettes personnalisées pour bébé, fabriquées avec amour en France. Des créations uniques pour des moments de tendresse." 
        />
      </Head>

      {/* Hero Section avec image de fond */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src="/images/hero-serviettes.jpg"
            alt="Serviettes pour bébé"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-500 bg-opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Serviettes Personnalisées
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-xl text-white max-w-3xl"
          >
            Des serviettes douces et absorbantes, brodées avec amour pour votre bébé.
            Chaque pièce est unique et personnalisable selon vos souhaits.
          </motion.p>
        </div>
      </div>

      {/* Section Caractéristiques */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">100% Coton Bio</h3>
              <p className="mt-2 text-base text-gray-500">
                Des matériaux doux et naturels pour la peau sensible de bébé
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Personnalisation</h3>
              <p className="mt-2 text-base text-gray-500">
                Broderie personnalisée avec le prénom de votre choix
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Fabrication Française</h3>
              <p className="mt-2 text-base text-gray-500">
                Fabriqué avec soin dans notre atelier en France
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section Produits */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-extrabold tracking-tight text-gray-900"
            >
              Nos Créations
            </motion.h2>
            <div className="mt-4 sm:mt-0">
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={\`px-4 py-2 text-sm font-medium \${
                    selectedFilter === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  } rounded-md\`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setSelectedFilter('new')}
                  className={\`px-4 py-2 text-sm font-medium \${
                    selectedFilter === 'new'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  } rounded-md\`}
                >
                  Nouveautés
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="mt-12 grid place-items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="relative group"
                >
                  <div className="relative w-full h-72 rounded-lg overflow-hidden bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-3 sm:h-96">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between space-x-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        <Link href={`/serviettes/${product.slug}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.dimensions}</p>
                    </div>
                    <p className="text-lg font-medium text-gray-900">{product.price}€</p>
                  </div>
                  <div className="mt-4">
                    <div className="relative flex bg-gray-100 rounded-lg p-2">
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">{product.material}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section FAQ */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-gray-900 text-center mb-12"
          >
            Questions Fréquentes
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-lg p-6"
            >
              <h3 className="text-lg font-medium text-gray-900">Comment entretenir ma serviette ?</h3>
              <p className="mt-2 text-base text-gray-500">
                Lavable en machine à 30°C. Ne pas utiliser de javel. Séchage à basse température.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-lg p-6"
            >
              <h3 className="text-lg font-medium text-gray-900">Quel est le délai de livraison ?</h3>
              <p className="mt-2 text-base text-gray-500">
                Comptez 5 à 7 jours ouvrés pour la fabrication et la livraison de votre serviette personnalisée.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-white sm:text-4xl"
          >
            <span className="block">Prêt à créer votre serviette personnalisée ?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg leading-6 text-indigo-200"
          >
            Offrez à votre bébé une serviette unique, aussi douce que son prénom.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 sm:w-auto"
            >
              Contactez-nous
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiettesPage;
