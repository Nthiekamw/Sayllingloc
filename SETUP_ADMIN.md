# Configuration de l'administrateur et données de test

## ⚠️ IMPORTANT : Étapes à suivre dans l'ordre

### Étape 1 : Désactiver la confirmation d'email (OBLIGATOIRE)

1. Allez sur votre dashboard Supabase : https://supabase.com/dashboard/project/moaijpthaoqjjpgtqoko
2. Allez dans **Settings** (⚙️) > **Authentication**
3. Descendez jusqu'à **Email Auth**
4. **DÉCOCHEZ** la case **"Enable email confirmations"**
5. Cliquez sur **Save**

### Étape 2 : Créer l'utilisateur admin via le Dashboard

1. Allez dans **Authentication** > **Users**
2. Cliquez sur **"Add user"** (en haut à droite)
3. Remplissez :
   - **Email** : `admin@sailingloc.com`
   - **Password** : `admin123`
   - **Auto Confirm User** : ✅ COCHER CETTE CASE
4. Cliquez sur **"Create user"**

### Étape 3 : Mettre à jour le rôle en admin via SQL

1. Allez dans **SQL Editor** dans votre dashboard Supabase
2. Collez et exécutez ce code :

```sql
-- Mettre à jour le profil en admin
UPDATE profiles
SET role = 'admin', full_name = 'Admin SailingLoc'
WHERE email = 'admin@sailingloc.com';

-- Vérifier que ça a fonctionné
SELECT id, email, role, full_name FROM profiles WHERE email = 'admin@sailingloc.com';
```

### Étape 4 : Créer des utilisateurs de test

Exécutez ce script dans le SQL Editor :

```sql
-- Note: Ces utilisateurs doivent être créés via l'interface ou l'inscription
-- Ce script est juste pour référence

-- Pour créer des utilisateurs de test, utilisez l'interface "Add user" :
-- 1. owner@test.com / owner123 (avec Auto Confirm)
-- 2. renter@test.com / renter123 (avec Auto Confirm)

-- Puis exécutez ceci pour définir les bons rôles :
UPDATE profiles SET role = 'owner', full_name = 'Test Owner' WHERE email = 'owner@test.com';
UPDATE profiles SET role = 'renter', full_name = 'Test Renter' WHERE email = 'renter@test.com';
```

### Étape 5 : Ajouter des bateaux de test

Une fois qu'un propriétaire existe, exécutez :

```sql
-- Obtenir l'ID du premier propriétaire
DO $$
DECLARE
  owner_id uuid;
BEGIN
  -- Trouver le premier propriétaire
  SELECT id INTO owner_id FROM profiles WHERE role IN ('owner', 'admin') LIMIT 1;

  IF owner_id IS NOT NULL THEN
    -- Insérer des bateaux de test
    INSERT INTO boats (owner_id, title, description, type, size, capacity, price_per_day, location, has_skipper, status)
    VALUES
      (owner_id, 'Voilier Océanis 38', 'Magnifique voilier de 38 pieds parfait pour la croisière en famille. Équipé de tout le confort moderne : cuisine, douche, GPS, pilote automatique.', 'sailboat', 11.5, 8, 250, 'Port de Marseille', true, 'active'),
      (owner_id, 'Catamaran Lagoon 42', 'Spacieux catamaran idéal pour des vacances inoubliables. Très stable et confortable avec 4 cabines doubles.', 'sailboat', 12.8, 12, 450, 'Port de Nice', true, 'active'),
      (owner_id, 'Bateau à moteur Jeanneau Cap Camarat', 'Bateau rapide et élégant pour des sorties à la journée. Parfait pour la pêche ou les balades en mer.', 'motorboat', 9, 10, 180, 'Port de Saint-Tropez', false, 'active'),
      (owner_id, 'Voilier Beneteau First 40', 'Voilier de course croisière très performant. Idéal pour les passionnés de voile sportive.', 'sailboat', 12.2, 6, 300, 'Port de Cannes', false, 'active'),
      (owner_id, 'Yacht Princess 55', 'Yacht de luxe avec tout le confort moderne. Parfait pour des événements ou des croisières VIP.', 'motorboat', 16.5, 8, 800, 'Port de Monaco', true, 'active')
    ON CONFLICT DO NOTHING;

    RAISE NOTICE 'Bateaux créés avec succès pour le propriétaire %', owner_id;
  ELSE
    RAISE NOTICE 'Aucun propriétaire trouvé. Créez d''abord un utilisateur avec le rôle owner.';
  END IF;
END $$;
```

## ✅ Vérification finale

Exécutez ces requêtes pour vérifier :

```sql
-- Vérifier les utilisateurs
SELECT id, email, role, full_name FROM profiles ORDER BY created_at;

-- Vérifier les bateaux
SELECT id, title, type, price_per_day, location, status FROM boats;

-- Statistiques
SELECT
  (SELECT COUNT(*) FROM profiles) as total_users,
  (SELECT COUNT(*) FROM profiles WHERE role = 'admin') as admins,
  (SELECT COUNT(*) FROM profiles WHERE role = 'owner') as owners,
  (SELECT COUNT(*) FROM profiles WHERE role = 'renter') as renters,
  (SELECT COUNT(*) FROM boats) as total_boats;
```

## 🔐 Identifiants de connexion

Après avoir suivi toutes les étapes :

**Admin :**
- Email : `admin@sailingloc.com`
- Mot de passe : `admin123`

**Propriétaire test :**
- Email : `owner@test.com`
- Mot de passe : `owner123`

**Locataire test :**
- Email : `renter@test.com`
- Mot de passe : `renter123`

## 🚀 Déploiement sur Vercel

1. Poussez votre code sur GitHub
2. Connectez votre repo à Vercel
3. Ajoutez les variables d'environnement dans Vercel :
   - `VITE_SUPABASE_URL` : https://moaijpthaoqjjpgtqoko.supabase.co
   - `VITE_SUPABASE_ANON_KEY` : (votre clé dans le fichier .env)
4. Déployez !

## ⚠️ Note importante

Si l'inscription ne fonctionne toujours pas après avoir désactivé la confirmation d'email :
1. Vérifiez que vous avez bien sauvegardé les paramètres dans Authentication
2. Essayez de rafraîchir la page
3. Vérifiez dans l'onglet Network de votre navigateur si vous voyez des erreurs
4. Créez tous les utilisateurs via le Dashboard Supabase en cochant "Auto Confirm User"
