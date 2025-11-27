# SailingLoc - Plateforme de Location de Bateaux

Application complète de location de bateaux entre particuliers développée avec React, TypeScript, Tailwind CSS et Supabase.

## Fonctionnalités

### Pour tous les utilisateurs
- Navigation sur la page d'accueil avec présentation de la plateforme
- Consultation du catalogue de bateaux disponibles
- Page "Comment ça marche" expliquant le processus de location
- Page de contact
- Inscription et connexion sécurisées

### Pour les locataires
- Recherche et filtrage des bateaux par type et localisation
- Visualisation détaillée des bateaux avec photos et descriptions
- Système de réservation en ligne avec calcul automatique du prix
- Historique des réservations
- Messagerie avec les propriétaires
- Système d'avis après chaque location

### Pour les propriétaires
- Ajout et gestion de leurs bateaux
- Gestion des disponibilités
- Réception et traitement des demandes de réservation
- Messagerie avec les locataires
- Suivi des revenus

### Pour les administrateurs
- Vue d'ensemble complète de la plateforme (statistiques)
- Gestion de tous les utilisateurs
- Modification des rôles utilisateurs
- Gestion de tous les bateaux
- Suppression d'utilisateurs ou de bateaux

## Technologies utilisées

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Base de données**: Supabase (PostgreSQL)
- **Authentification**: Supabase Auth
- **Icons**: Lucide React
- **Build**: Vite

## Structure de la base de données

### Tables principales
- `profiles` - Profils utilisateurs avec rôles (admin, owner, renter)
- `boats` - Catalogue des bateaux disponibles
- `reservations` - Réservations de bateaux
- `reviews` - Avis et notes sur les bateaux
- `messages` - Système de messagerie interne

## Sécurité

- Row Level Security (RLS) activé sur toutes les tables
- Authentification sécurisée via Supabase
- Politiques d'accès strictes selon les rôles
- Validation des données côté serveur

## Démarrage

### Prérequis
- Node.js 18+
- Compte Supabase

### Installation

1. Installer les dépendances:
```bash
npm install
```

2. Configurer les variables d'environnement (déjà configuré dans .env):
```
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_supabase
```

3. Lancer le serveur de développement:
```bash
npm run dev
```

## Comptes de test

### Administrateur prédéfini
Pour créer un compte administrateur, inscrivez-vous avec:
- Email: `admin@sailingloc.com`
- Mot de passe: `admin123`

Ensuite, mettez à jour manuellement le rôle dans la base de données:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'admin@sailingloc.com';
```

### Créer d'autres comptes
- Propriétaire: Inscrivez-vous et sélectionnez "Propriétaire" lors de l'inscription
- Locataire: Inscrivez-vous et sélectionnez "Locataire" lors de l'inscription

## Fonctionnement du système de réservation

1. Le locataire parcourt les bateaux disponibles
2. Il sélectionne un bateau et choisit ses dates
3. Le système calcule automatiquement le prix total (incluant 10% de frais de service)
4. Une demande de réservation est envoyée au propriétaire
5. Le propriétaire accepte ou refuse la demande
6. Une fois la location terminée, le locataire peut laisser un avis

## Rôles et permissions

### Admin
- Accès complet à toutes les fonctionnalités
- Gestion des utilisateurs et modification des rôles
- Suppression d'utilisateurs et de bateaux
- Vue d'ensemble des statistiques

### Propriétaire
- Ajout et gestion de ses bateaux
- Réception des demandes de réservation
- Acceptation/refus des réservations
- Messagerie avec les locataires
- Suivi des revenus

### Locataire
- Navigation et recherche de bateaux
- Réservation de bateaux
- Historique des réservations
- Messagerie avec les propriétaires
- Publication d'avis

## Architecture

L'application suit une architecture modulaire:

```
src/
├── components/          # Composants réutilisables
│   ├── dashboards/     # Tableaux de bord par rôle
│   ├── Navbar.tsx
│   └── Footer.tsx
├── contexts/           # Contextes React (Auth)
├── pages/              # Pages de l'application
├── lib/                # Configuration (Supabase)
└── App.tsx             # Point d'entrée principal
```

## Commandes disponibles

```bash
npm run dev          # Lancer le serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualiser le build
npm run lint         # Linter le code
npm run typecheck    # Vérifier les types TypeScript
```

## Améliorations futures possibles

- Application mobile native (React Native)
- Paiement en ligne intégré (Stripe)
- Système de calendrier avancé avec indisponibilités
- Géolocalisation et carte interactive
- Notifications push
- Chat en temps réel
- Export de documents (contrats, factures)
- Intégration d'assurances
- Système de parrainage
- Programme de fidélité

## Support

Pour toute question ou problème, contactez: contact@sailingloc.com

## Licence

© 2024 SailingLoc. Tous droits réservés.
