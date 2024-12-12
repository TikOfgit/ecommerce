import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

interface ProductPageProps {
  isCartOpen?: boolean;
  setIsCartOpen?: (isOpen: boolean) => void;
}

const ProductPage: NextPage<ProductPageProps> = ({ isCartOpen, setIsCartOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuyNow = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.post('/api/create-payment');
      console.log('Payment response:', response.data);
      
      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        throw new Error('No payment URL received');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setError(error.response?.data?.error?.message || error.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}>
      <Head>
        <title>Produit Test - La Chabroderie</title>
        <meta name="description" content="Page produit test" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Produit Test
            </h1>
            <p className="text-gray-600 mb-4">
              Description du produit test pour démonstration PayPlug
            </p>
            <div className="text-2xl font-bold text-gray-900 mb-6">
              15,00 €
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <button
              onClick={handleBuyNow}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Chargement...' : 'Acheter maintenant'}
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ProductPage;
