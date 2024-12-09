# La Chabroderie - E-commerce de Produits pour Bébé

Site e-commerce spécialisé dans les produits pour bébé.

## Technologies utilisées

- Next.js
- TypeScript
- TailwindCSS
- Supabase (Base de données)
- PayPlug (Paiements)
- Vercel (Hébergement)

## Configuration requise

1. Node.js 18+ et npm
2. Compte GitHub
3. Compte Vercel
4. Compte Supabase
5. Compte PayPlug

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## Variables d'environnement

Créez un fichier `.env.local` avec les variables suivantes :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_supabase
NEXT_PUBLIC_PAYPLUG_PUBLIC_KEY=votre_clé_publique_payplug
PAYPLUG_SECRET_KEY=votre_clé_secrète_payplug
```
