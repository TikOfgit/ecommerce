import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function Custom404() {
  return (
    <Layout>
      <Head>
        <title>Page non trouvée - La Chabroderie</title>
        <meta name="description" content="La page que vous recherchez n'existe pas." />
      </Head>

      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page non trouvée</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Désolé, nous n&apos;avons pas trouvé la page que vous recherchez.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Retour à l&apos;accueil
            </Link>
            <Link href="/contact" className="text-sm font-semibold text-gray-900">
              Contactez-nous <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
