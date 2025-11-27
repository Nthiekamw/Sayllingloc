-- ============================================
-- SCRIPT COMPLET DE CONFIGURATION SAILINGLOC
-- ============================================
-- À exécuter dans le SQL Editor de Supabase après avoir créé l'utilisateur admin
-- via Authentication > Users avec "Auto Confirm User" coché
-- ============================================

-- 1. Mettre à jour le profil admin
UPDATE profiles
SET
  role = 'admin',
  full_name = 'Admin SailingLoc',
  updated_at = now()
WHERE email = 'admin@sailingloc.com';

-- 2. Vérifier que l'admin existe
DO $$
DECLARE
  admin_count int;
BEGIN
  SELECT COUNT(*) INTO admin_count FROM profiles WHERE email = 'admin@sailingloc.com' AND role = 'admin';

  IF admin_count = 0 THEN
    RAISE EXCEPTION 'Admin non trouvé ! Créez d''abord l''utilisateur admin@sailingloc.com via Authentication > Users';
  ELSE
    RAISE NOTICE '✅ Admin trouvé et configuré !';
  END IF;
END $$;

-- 3. Créer des bateaux de démonstration (si un propriétaire existe)
DO $$
DECLARE
  owner_id uuid;
  boat_count int;
BEGIN
  -- Utiliser l'admin comme propriétaire pour les bateaux de test
  SELECT id INTO owner_id FROM profiles WHERE role IN ('admin', 'owner') LIMIT 1;

  IF owner_id IS NOT NULL THEN
    -- Compter les bateaux existants
    SELECT COUNT(*) INTO boat_count FROM boats;

    -- N'ajouter des bateaux que s'il n'y en a pas déjà
    IF boat_count = 0 THEN
      INSERT INTO boats (owner_id, title, description, type, size, capacity, price_per_day, location, has_skipper, status)
      VALUES
        (owner_id, 'Voilier Océanis 38', 'Magnifique voilier de 38 pieds parfait pour la croisière en famille. Équipé de tout le confort moderne : cuisine équipée, douche, GPS dernière génération, pilote automatique. Idéal pour découvrir la Méditerranée en toute sécurité.', 'sailboat', 11.5, 8, 250, 'Port de Marseille', true, 'active'),

        (owner_id, 'Catamaran Lagoon 42', 'Spacieux catamaran de luxe idéal pour des vacances inoubliables en famille ou entre amis. Très stable et confortable avec 4 cabines doubles, 2 salles de bain, grand cockpit et trampolines avant. Parfait pour des croisières de plusieurs jours.', 'sailboat', 12.8, 12, 450, 'Port de Nice', true, 'active'),

        (owner_id, 'Bateau à moteur Jeanneau Cap Camarat', 'Bateau rapide et élégant pour des sorties à la journée le long de la Côte d''Azur. Parfait pour la pêche sportive, les balades en mer ou le ski nautique. Console de pilotage moderne, bain de soleil spacieux.', 'motorboat', 9, 10, 180, 'Port de Saint-Tropez', false, 'active'),

        (owner_id, 'Voilier Beneteau First 40', 'Voilier de course-croisière très performant, idéal pour les passionnés de voile sportive. Rapide et maniable avec un gréement moderne. Cabine confortable pour les sorties de plusieurs jours. Parfait pour les régates ou les croisières dynamiques.', 'sailboat', 12.2, 6, 300, 'Port de Cannes', false, 'active'),

        (owner_id, 'Yacht Princess 55', 'Yacht à moteur de luxe avec tout le confort moderne. 3 cabines luxueuses, salon panoramique, cuisine équipée, système audio haut de gamme. Parfait pour des événements privés, croisières VIP ou célébrations spéciales. Service de skipper et hôtesse disponible.', 'motorboat', 16.5, 8, 800, 'Port de Monaco', true, 'active'),

        (owner_id, 'Voilier Dufour 410', 'Voilier moderne et spacieux parfait pour la croisière côtière. 3 cabines, cuisine bien équipée, carré lumineux. Très bon compromis entre performance et confort. Idéal pour les familles ou petits groupes.', 'sailboat', 12.5, 8, 280, 'Port de Hyères', true, 'active'),

        (owner_id, 'Semi-rigide Zodiac Pro 9', 'Bateau pneumatique rapide et fun pour des sorties sportives. Parfait pour découvrir les criques inaccessibles, le snorkeling ou les excursions rapides. Moteur puissant et très maniable.', 'motorboat', 9, 8, 150, 'Port de Bandol', false, 'active'),

        (owner_id, 'Voilier Bavaria 46', 'Grand voilier familial très confortable. 4 cabines spacieuses, 2 salles de bain, grand carré avec table convertible. Équipement complet pour la navigation : GPS, pilote auto, guindeau électrique. Parfait pour de longues croisières.', 'sailboat', 14.2, 10, 350, 'Port de Toulon', true, 'active')
      ON CONFLICT DO NOTHING;

      RAISE NOTICE '✅ % bateaux de démonstration créés !', 8;
    ELSE
      RAISE NOTICE 'ℹ️ Des bateaux existent déjà (%), création ignorée', boat_count;
    END IF;
  ELSE
    RAISE NOTICE '⚠️ Aucun propriétaire trouvé pour créer les bateaux de test';
  END IF;
END $$;

-- 4. Afficher un résumé
SELECT
  '====== RÉSUMÉ DE LA CONFIGURATION ======' as info
UNION ALL
SELECT '- Utilisateurs : ' || COUNT(*)::text FROM profiles
UNION ALL
SELECT '- Admins : ' || COUNT(*)::text FROM profiles WHERE role = 'admin'
UNION ALL
SELECT '- Propriétaires : ' || COUNT(*)::text FROM profiles WHERE role = 'owner'
UNION ALL
SELECT '- Locataires : ' || COUNT(*)::text FROM profiles WHERE role = 'renter'
UNION ALL
SELECT '- Bateaux : ' || COUNT(*)::text FROM boats
UNION ALL
SELECT '- Réservations : ' || COUNT(*)::text FROM reservations
UNION ALL
SELECT '========================================' as info;

-- 5. Afficher les utilisateurs
SELECT
  '====== UTILISATEURS ======' as section,
  NULL as email,
  NULL as role,
  NULL as full_name
UNION ALL
SELECT
  NULL as section,
  email,
  role,
  full_name
FROM profiles
ORDER BY role, email;

-- 6. Afficher les bateaux
SELECT
  '====== BATEAUX DISPONIBLES ======' as info,
  NULL as title,
  NULL as type,
  NULL as price,
  NULL as location
UNION ALL
SELECT
  NULL as info,
  title,
  type,
  price_per_day::text || '€' as price,
  location
FROM boats
ORDER BY type, title;

-- 7. Messages de confirmation
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✅ CONFIGURATION TERMINÉE !';
  RAISE NOTICE '========================================';
  RAISE NOTICE '';
  RAISE NOTICE '🔐 Identifiants admin :';
  RAISE NOTICE '   Email : admin@sailingloc.com';
  RAISE NOTICE '   Mot de passe : admin123';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 Vous pouvez maintenant :';
  RAISE NOTICE '   1. Vous connecter à l''application';
  RAISE NOTICE '   2. Créer d''autres utilisateurs';
  RAISE NOTICE '   3. Ajouter plus de bateaux';
  RAISE NOTICE '   4. Tester les réservations';
  RAISE NOTICE '';
  RAISE NOTICE '📚 Consultez README.md pour plus d''infos';
  RAISE NOTICE '========================================';
END $$;
