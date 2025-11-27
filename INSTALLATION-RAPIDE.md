# 🚀 Installation Rapide - SailingLoc

## ⏱️ 5 minutes pour être opérationnel

### Étape 1 : Désactiver la confirmation d'email (30 secondes)

1. Cliquez ici : https://supabase.com/dashboard/project/moaijpthaoqjjpgtqoko/settings/auth
2. Décochez **"Enable email confirmations"**
3. Cliquez **Save**

### Étape 2 : Créer l'admin (1 minute)

1. Cliquez ici : https://supabase.com/dashboard/project/moaijpthaoqjjpgtqoko/auth/users
2. Cliquez **"Add user"**
3. Remplissez :
   - Email : `admin@sailingloc.com`
   - Password : `admin123`
   - ✅ Cochez **"Auto Confirm User"**
4. Cliquez **"Create user"**

### Étape 3 : Configurer l'admin (1 minute)

1. Cliquez ici : https://supabase.com/dashboard/project/moaijpthaoqjjpgtqoko/sql/new
2. Copiez-collez tout le contenu du fichier `setup_complete.sql`
3. Cliquez **"Run"** (ou Ctrl+Enter)
4. Vous verrez un résumé avec les statistiques

### Étape 4 : Tester l'application (1 minute)

1. Lancez l'application : `npm run dev`
2. Ouvrez http://localhost:5173
3. Cliquez sur **"Connexion"**
4. Connectez-vous avec :
   - Email : `admin@sailingloc.com`
   - Password : `admin123`
5. Vous êtes admin ! 🎉

---

## 🌐 Déployer sur Vercel (5 minutes)

### Pré-requis
- Compte GitHub
- Compte Vercel

### Étapes

1. **Push sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "SailingLoc app"
   git branch -M main
   git remote add origin https://github.com/VOTRE-USERNAME/sailingloc.git
   git push -u origin main
   ```

2. **Sur Vercel**
   - Allez sur https://vercel.com/new
   - Importez votre repo
   - Ajoutez ces 2 variables d'environnement :

   ```
   VITE_SUPABASE_URL=https://moaijpthaoqjjpgtqoko.supabase.co
   ```

   ```
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vYWlqcHRoYW9xampwZ3Rxb2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNjQ0OTksImV4cCI6MjA3OTc0MDQ5OX0.hhT17P8lPflhlWVp4b5Leuc3IGsAyi9NsqhCGMISWNg
   ```

   - Cliquez **Deploy**

3. **Configurer Supabase**
   - Une fois déployé, copiez votre URL Vercel (ex: `sailingloc.vercel.app`)
   - Allez ici : https://supabase.com/dashboard/project/moaijpthaoqjjpgtqoko/auth/url-configuration
   - Ajoutez dans **"Redirect URLs"** : `https://VOTRE-URL.vercel.app/**`
   - Cliquez **Save**

4. **C'est en ligne ! 🎉**

---

## 📋 Checklist

- [ ] Confirmation d'email désactivée
- [ ] Admin créé (admin@sailingloc.com)
- [ ] Script SQL exécuté
- [ ] Connexion admin testée localement
- [ ] Code poussé sur GitHub
- [ ] Déployé sur Vercel
- [ ] Variables d'environnement ajoutées
- [ ] URL Vercel ajoutée dans Supabase

---

## 🎯 Que faire ensuite ?

### Créer des utilisateurs de test

**Via Supabase Dashboard** (Authentication > Users) :

1. **Propriétaire**
   - Email : `owner@test.com`
   - Password : `owner123`
   - ✅ Auto Confirm User

2. **Locataire**
   - Email : `renter@test.com`
   - Password : `renter123`
   - ✅ Auto Confirm User

### Puis dans SQL Editor :

```sql
UPDATE profiles SET role = 'owner', full_name = 'Test Owner'
WHERE email = 'owner@test.com';

UPDATE profiles SET role = 'renter', full_name = 'Test Renter'
WHERE email = 'renter@test.com';
```

### Ajouter plus de bateaux

Connectez-vous en tant que propriétaire et utilisez le dashboard pour ajouter des bateaux !

---

## ❓ Problèmes ?

| Problème | Solution |
|----------|----------|
| Inscription ne fonctionne pas | Vérifiez que "Enable email confirmations" est DÉCOCHÉ |
| Admin n'existe pas | Suivez l'Étape 2 exactement |
| Dashboard admin inaccessible | Exécutez le script SQL de l'Étape 3 |
| Erreur au déploiement | Vérifiez les variables d'environnement |
| Page blanche sur Vercel | Vérifiez que `vercel.json` existe |

---

## 📚 Documentation complète

- `LISEZ-MOI-EN-PREMIER.md` - Vue d'ensemble
- `SETUP_ADMIN.md` - Configuration détaillée
- `DEPLOY.md` - Guide de déploiement complet
- `README.md` - Documentation technique
- `setup_complete.sql` - Script de configuration

---

**Temps total : ~10-15 minutes** ⏱️

Bonne chance ! 🚢
