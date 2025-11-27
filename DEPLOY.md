# 🚀 Guide de Déploiement SailingLoc

## Préparation avant le déploiement

### 1. Configuration Supabase (OBLIGATOIRE - À FAIRE EN PREMIER)

⚠️ **TRÈS IMPORTANT** : Avant de tester l'inscription ou de déployer, vous DEVEZ :

1. Aller sur https://supabase.com/dashboard/project/moaijpthaoqjjpgtqoko/settings/auth
2. Dans la section **Email Auth**, **DÉCOCHEZ** "Enable email confirmations"
3. Cliquez sur **Save**
4. Attendez quelques secondes que les changements soient appliqués

Sans cette étape, l'inscription ne fonctionnera pas !

### 2. Créer l'utilisateur admin

Suivez les instructions détaillées dans `SETUP_ADMIN.md`

En résumé :
1. Allez dans Authentication > Users dans Supabase
2. Créez un utilisateur avec email `admin@sailingloc.com` et mot de passe `admin123`
3. Cochez "Auto Confirm User"
4. Exécutez le SQL pour mettre son rôle en admin

## Déploiement sur Vercel

### Méthode 1 : Via l'interface Vercel (Recommandé)

1. **Poussez votre code sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - SailingLoc"
   git branch -M main
   git remote add origin <votre-repo-url>
   git push -u origin main
   ```

2. **Connectez-vous à Vercel**
   - Allez sur https://vercel.com
   - Cliquez sur "Add New Project"
   - Importez votre repo GitHub

3. **Configurez les variables d'environnement**
   Dans les paramètres du projet Vercel, ajoutez :

   ```
   VITE_SUPABASE_URL=https://moaijpthaoqjjpgtqoko.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vYWlqcHRoYW9xampwZ3Rxb2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNjQ0OTksImV4cCI6MjA3OTc0MDQ5OX0.hhT17P8lPflhlWVp4b5Leuc3IGsAyi9NsqhCGMISWNg
   ```

4. **Déployez**
   - Cliquez sur "Deploy"
   - Attendez que le build se termine
   - Votre site sera disponible à l'URL Vercel

### Méthode 2 : Via Vercel CLI

1. **Installez Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Connectez-vous**
   ```bash
   vercel login
   ```

3. **Déployez**
   ```bash
   vercel
   ```

4. **Ajoutez les variables d'environnement**
   ```bash
   vercel env add VITE_SUPABASE_URL production
   vercel env add VITE_SUPABASE_ANON_KEY production
   ```

5. **Redéployez avec les variables**
   ```bash
   vercel --prod
   ```

## Configuration post-déploiement

### 1. Mettre à jour les URLs autorisées dans Supabase

1. Allez dans Settings > Authentication > URL Configuration
2. Ajoutez votre URL Vercel dans :
   - **Site URL** : `https://votre-app.vercel.app`
   - **Redirect URLs** : `https://votre-app.vercel.app/**`

### 2. Tester l'application

1. Allez sur votre URL Vercel
2. Essayez de vous inscrire avec un nouveau compte
3. Connectez-vous avec le compte admin : `admin@sailingloc.com` / `admin123`

## Problèmes courants et solutions

### L'inscription ne fonctionne pas
- ✅ Vérifiez que la confirmation d'email est désactivée dans Supabase
- ✅ Vérifiez que les variables d'environnement sont bien configurées
- ✅ Regardez la console du navigateur pour voir les erreurs

### Erreur "Invalid API key"
- ✅ Vérifiez que `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` sont corrects
- ✅ Vérifiez qu'il n'y a pas d'espaces avant/après les valeurs

### La page est blanche après déploiement
- ✅ Vérifiez que `vercel.json` est présent
- ✅ Vérifiez les logs de build dans Vercel

### Les utilisateurs ne peuvent pas se connecter
- ✅ Assurez-vous que l'URL de votre site Vercel est dans les URLs autorisées de Supabase
- ✅ Vérifiez que "Auto Confirm User" était coché lors de la création

## Structure du projet pour Git

Fichiers à commiter :
```
✅ src/
✅ public/
✅ index.html
✅ package.json
✅ package-lock.json
✅ tsconfig.json
✅ vite.config.ts
✅ tailwind.config.js
✅ postcss.config.js
✅ vercel.json
✅ README.md
✅ SETUP_ADMIN.md
✅ DEPLOY.md
```

Fichiers à NE PAS commiter (déjà dans .gitignore) :
```
❌ .env
❌ node_modules/
❌ dist/
❌ .vercel/
```

## Commandes utiles

```bash
# Build local pour tester
npm run build
npm run preview

# Vérifier les types
npm run typecheck

# Linter
npm run lint

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

## Variables d'environnement requises

Pour référence, voici les variables nécessaires :

```env
VITE_SUPABASE_URL=https://moaijpthaoqjjpgtqoko.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vYWlqcHRoYW9xampwZ3Rxb2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNjQ0OTksImV4cCI6MjA3OTc0MDQ5OX0.hhT17P8lPflhlWVp4b5Leuc3IGsAyi9NsqhCGMISWNg
```

⚠️ **Note** : La clé ANON est publique et peut être partagée. C'est normal qu'elle soit dans le code frontend.

## Support

En cas de problème, vérifiez :
1. Les logs de Vercel (onglet "Deployments" > votre déploiement > "Logs")
2. La console du navigateur (F12 > Console)
3. L'onglet Network du navigateur pour voir les requêtes API

Bonne chance avec le déploiement ! 🚀
