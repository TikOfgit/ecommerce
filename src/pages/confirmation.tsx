import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Confirmation() {
  const router = useRouter();

  useEffect(() => {
    // Si l'utilisateur accède directement à cette page sans passer par le checkout,
    // on le redirige vers la page d'accueil
    if (!router.query.success) {
      router.push('/');
    }
  }, [router]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mb-8">
            <svg
              className="mx-auto h-16 w-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M16.707 22.293a1 1 0 00-1.414 1.414l6 6a1 1 0 001.414 0l12-12a1 1 0 10-1.414-1.414L22 27.586l-5.293-5.293z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Merci pour votre commande !
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Nous avons bien reçu votre commande et nous la traiterons dans les plus brefs délais.
            Un email de confirmation vous a été envoyé.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
