# 🚢 SailingLoc - Application de Location de Bateaux

## ⚠️ IMPORTANT : À LIRE AVANT DE COMMENCER

### Le problème actuel avec l'inscription

L'inscription dans l'application **NE FONCTIONNE PAS** tant que vous n'avez pas désactivé la confirmation d'email dans Supabase.

### ✅ SOLUTION EN 3 ÉTAPES (À FAIRE MAINTENANT)

#### 1️⃣ Désactiver la confirmation d'email (OBLIGATOIRE)

1. Allez sur : https://supabase.com/dashboard/project/moaijpthaoqjjpgtqoko/settings/auth
2. Trouvez la section **"Email Auth"**
3. **DÉCOCHEZ** la case **"Enable email confirmations"**
4. Cliquez sur **"Save"** en bas de page
5. Attendez 10 secondes

**Sans cette étape, aucune inscription ne fonctionnera !**

#### 2️⃣ Créer l'utilisateur admin

1. Allez dans **Authentication > Users** : https://supabase.com/dashboard/project/moaijpthaoqjjpgtqoko/auth/users
2. Cliquez sur **"Add user"** (bouton vert en haut à droite)
3. Remplissez :
   - **Email** : `admin@sailingloc.com`
   - **Password** : `admin123`
   - **☑️ COCHEZ "Auto Confirm User"** (très important !)
4. Cliquez sur **"Create user"**

#### 3️⃣ Mettre le rôle admin

1. Allez dans **SQL Editor** : https://supabase.com/dashboard/project/moaijpthaoqjjpgtqoko/sql/new
2. Copiez et exécutez ce code :

```sql
UPDATE profiles
SET role = 'admin', full_name = 'Admin SailingLoc'
WHERE email = 'admin@sailingloc.com';

-- Vérification
SELECT id, email, role, full_name FROM profiles WHERE email = 'admin@sailingloc.com';
```

3. Vous devriez voir une ligne avec role = 'admin'

---

## 🎉 Maintenant vous pouvez utiliser l'application !

### Connexion admin

- **Email** : `admin@sailingloc.com`
- **Mot de passe** : `admin123`

### Fonctionnalités disponibles

✅ **Page d'accueil** - Présentation de la plateforme
✅ **Catalogue de bateaux** - Recherche et filtres
✅ **Détails des bateaux** - Vue détaillée avec réservation
✅ **Système de réservation** - Avec calcul automatique du prix
✅ **Inscription/Connexion** - Authentification sécurisée
✅ **Dashboard Admin** - Gestion complète (utilisateurs, bateaux, stats)
✅ **Dashboard Propriétaire** - Gestion des bateaux et réservations
✅ **Dashboard Locataire** - Historique et avis
✅ **Système de messages** - Communication entre utilisateurs
✅ **Système d'avis** - Notes et commentaires

---

## 📂 Fichiers importants

| Fichier | Description |
|---------|-------------|
| `SETUP_ADMIN.md` | Guide complet pour créer l'admin et les données de test |
| `DEPLOY.md` | Guide de déploiement sur Vercel |
| `README.md` | Documentation technique complète |
| `create-admin.md` | Guide rapide de création admin |

---

## 🚀 Pour déployer sur Vercel

1. **Suivez d'abord les 3 étapes ci-dessus**
2. Poussez votre code sur GitHub :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <votre-repo-url>
   git push -u origin main
   ```

3. Sur Vercel :
   - Importez votre repo
   - Ajoutez les variables d'environnement (voir `DEPLOY.md`)
   - Déployez !

---

## 🆘 Problèmes courants

### "Email not confirmed" lors de l'inscription
➡️ Vous n'avez pas désactivé la confirmation d'email (Étape 1️⃣)

### "Invalid login credentials"
➡️ L'utilisateur n'existe pas ou le mot de passe est incorrect

### L'admin ne voit pas le dashboard admin
➡️ Le rôle n'a pas été mis à 'admin' (Étape 3️⃣)

### Rien ne s'affiche sur la page d'accueil
➡️ Vérifiez la console du navigateur (F12) pour voir les erreurs

---

## 📞 Architecture

- **Frontend** : React 18 + TypeScript + Tailwind CSS
- **Backend** : Supabase (PostgreSQL + Auth)
- **Build** : Vite
- **Déploiement** : Vercel

---

## ✅ Checklist avant de déployer

- [ ] Confirmation d'email désactivée dans Supabase
- [ ] Utilisateur admin créé et confirmé
- [ ] Rôle admin mis à jour en base de données
- [ ] Test de connexion avec le compte admin réussi
- [ ] Variables d'environnement configurées dans Vercel
- [ ] URL Vercel ajoutée dans les redirects Supabase

---

## 🎯 Prochaines étapes suggérées

Après avoir déployé :

1. Créer 2-3 utilisateurs propriétaires via le dashboard Supabase
2. Ajouter 5-10 bateaux de test via le dashboard propriétaire
3. Créer quelques réservations pour tester le flow complet
4. Tester le système de messages
5. Tester le système d'avis

---

**Bon déploiement ! 🚀**

Si vous avez des questions, relisez d'abord `SETUP_ADMIN.md` et `DEPLOY.md`.
