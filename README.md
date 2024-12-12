# La Chabroderie - Site E-commerce

Site e-commerce pour La Chabroderie, spécialisé dans la vente de produits personnalisés brodés.

## Technologies Utilisées

- Next.js 13
- TypeScript
- Tailwind CSS
- Supabase
- Stripe (paiement)

## Fonctionnalités

- 🛍️ Catalogue de produits
- 🛒 Panier d'achat persistant
- 💳 Paiement sécurisé
- 📱 Design responsive
- 🔍 Navigation intuitive
- 🎨 Interface moderne

## Structure du Projet

```
src/
├── components/      # Composants réutilisables
├── context/        # Contextes React (panier, etc.)
├── lib/           # Bibliothèques et configurations
├── pages/         # Pages de l'application
├── styles/        # Styles globaux
├── types/         # Types TypeScript
└── utils/         # Utilitaires
```

## Installation

1. Cloner le projet
```bash
git clone [URL_DU_REPO]
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env.local
```

4. Lancer le serveur de développement
```bash
npm run dev
```

## Scripts Disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Construit l'application pour la production
- `npm start` : Lance l'application en production
- `npm run lint` : Vérifie le code avec ESLint

## Déploiement

Le site est déployé sur Vercel. Chaque push sur la branche main déclenche un déploiement automatique.

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request
