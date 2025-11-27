# Créer un compte administrateur

## Méthode 1 : Via l'interface d'administration Supabase

1. Allez sur votre tableau de bord Supabase : https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Allez dans "Authentication" > "Users"
4. Cliquez sur "Add user" 
5. Créez un utilisateur avec :
   - Email: admin@sailingloc.com
   - Password: admin123
   - Cochez "Auto Confirm User"
6. Une fois créé, allez dans "Table Editor" > "profiles"
7. Trouvez le profil avec l'email admin@sailingloc.com
8. Modifiez le champ "role" en "admin"

## Méthode 2 : Via SQL dans Supabase

1. Allez dans "SQL Editor" dans votre dashboard Supabase
2. Exécutez cette requête pour voir tous les utilisateurs :

```sql
SELECT id, email FROM auth.users;
```

3. Si votre utilisateur existe, copiez son ID et exécutez :

```sql
UPDATE profiles 
SET role = 'admin', full_name = 'Admin SailingLoc'
WHERE email = 'admin@sailingloc.com';
```

## Vérification

Après avoir créé l'admin, vérifiez avec :

```sql
SELECT id, email, role, full_name FROM profiles WHERE email = 'admin@sailingloc.com';
```

Le rôle doit être 'admin'.

## Note importante

Si la confirmation d'email est activée dans Supabase, vous devez :
1. Soit désactiver la confirmation d'email dans Settings > Authentication
2. Soit confirmer manuellement l'email de l'utilisateur dans le dashboard
