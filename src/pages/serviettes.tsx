import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CartPageProps } from '../types/cart';

const ServiettesPage: NextPage<CartPageProps> = ({ isCartOpen, setIsCartOpen }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

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

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image_url: product.image_url,
    });
    if (setIsCartOpen) {
      setIsCartOpen(true);
    }
  };

  return (
    <Layout isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}>
      <Head>
        <title>Serviettes Personnalisées pour Bébé - La Chabroderie</title>
        <meta 
          name="description" 
          content="Découvrez notre collection de serviettes personnalisées pour bébé, fabriquées avec amour en France. Des créations uniques pour des moments de tendresse." 
        />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Serviettes Personnalisées</span>
              <span className="block text-blue-600">pour Bébé</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Des créations uniques et personnalisées pour accompagner les moments de tendresse avec votre bébé.
            </p>
          </div>
        </div>
      </div>

      {/* Catalogue */}
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="group relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden group-hover:opacity-75">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price.toFixed(2)}€</p>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Ajouter au panier
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ServiettesPage;
