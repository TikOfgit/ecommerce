import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { supabase } from '../../utils/supabase';
import { useCart } from '../../context/CartContext';
import Layout from '../../components/Layout';

interface ProductPageProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    stock: number;
    dimensions?: string;
    material?: string;
    care_instructions?: string;
  };
}

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  if (router.isFallback) {
    return <div>Chargement...</div>;
  }

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  return (
    <Layout>
      <Head>
        <title>{product.name} - La Chabroderie</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image du produit */}
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Informations du produit */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="text-2xl font-semibold text-gray-900 mb-6">{product.price}€</div>
            
            <div className="prose prose-sm text-gray-500 mb-6">
              <p>{product.description}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Dimensions</h3>
                <p className="mt-1 text-sm text-gray-500">{product.dimensions}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">Matériau</h3>
                <p className="mt-1 text-sm text-gray-500">{product.material}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">Entretien</h3>
                <p className="mt-1 text-sm text-gray-500">{product.care_instructions}</p>
              </div>
            </div>

            {product.stock > 0 ? (
              <button
                type="button"
                onClick={() => {
                  addToCart(product);
                }}
                className="w-full bg-indigo-600 text-white py-3 px-8 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Ajouter au panier
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="w-full bg-gray-200 text-gray-500 py-3 px-8 rounded-md cursor-not-allowed"
              >
                Rupture de stock
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: products } = await supabase
    .from('products')
    .select('slug')
    .eq('category', 'serviette');

  const paths = products?.map((product) => ({
    params: { slug: product.slug },
  })) || [];

  return {
    paths,
    fallback: true, // false if you want 404 for non-existent slugs
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};
