export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              SailingLoc s'engage à protéger la confidentialité et la sécurité de vos données personnelles.
              Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons
              vos informations personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Données collectées</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Nous collectons les données suivantes :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Données d'identification :</strong> nom, prénom, adresse email</li>
              <li><strong>Coordonnées :</strong> numéro de téléphone, adresse postale</li>
              <li><strong>Données de connexion :</strong> adresse IP, logs de connexion</li>
              <li><strong>Données de navigation :</strong> pages visitées, temps passé sur le site</li>
              <li><strong>Données de transaction :</strong> historique des réservations et paiements</li>
              <li><strong>Contenus générés :</strong> avis, messages, photos de bateaux</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Finalités du traitement</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Vos données sont utilisées pour :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Gérer votre compte utilisateur</li>
              <li>Traiter vos réservations et paiements</li>
              <li>Faciliter la communication entre propriétaires et locataires</li>
              <li>Améliorer nos services et votre expérience utilisateur</li>
              <li>Vous envoyer des notifications importantes concernant votre compte</li>
              <li>Assurer la sécurité de la plateforme et prévenir la fraude</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Base légale du traitement</h2>
            <p className="text-gray-700 leading-relaxed">
              Le traitement de vos données repose sur :<br />
              - Votre consentement (inscription, newsletters)<br />
              - L'exécution du contrat (réservations, paiements)<br />
              - Le respect d'obligations légales (facturation, comptabilité)<br />
              - Notre intérêt légitime (amélioration des services, sécurité)
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Destinataires des données</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Vos données peuvent être partagées avec :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Les autres utilisateurs de la plateforme (propriétaires/locataires) dans le cadre d'une réservation</li>
              <li>Nos prestataires de services (hébergement, paiement, support client)</li>
              <li>Les autorités compétentes en cas d'obligation légale</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Nous ne vendons jamais vos données à des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Durée de conservation</h2>
            <p className="text-gray-700 leading-relaxed">
              Vos données sont conservées pendant :<br />
              - Données de compte : durée d'activité du compte + 3 ans<br />
              - Données de transaction : 10 ans (obligations comptables et fiscales)<br />
              - Données de connexion : 1 an<br />
              - Cookies : 13 mois maximum
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Vos droits</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
              <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
              <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Pour exercer ces droits, contactez-nous à : privacy@sailingloc.fr
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Sécurité des données</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger
              vos données contre tout accès non autorisé, perte, destruction ou divulgation :<br />
              - Chiffrement des données sensibles (SSL/TLS)<br />
              - Authentification sécurisée<br />
              - Contrôle d'accès strict<br />
              - Sauvegardes régulières<br />
              - Surveillance de la sécurité
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site :<br />
              - <strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site<br />
              - <strong>Cookies de performance :</strong> pour analyser l'utilisation du site<br />
              - <strong>Cookies de fonctionnalité :</strong> pour mémoriser vos préférences<br />
              <br />
              Vous pouvez gérer vos préférences de cookies via le bandeau de consentement ou les paramètres
              de votre navigateur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Transferts de données hors UE</h2>
            <p className="text-gray-700 leading-relaxed">
              Certains de nos prestataires peuvent être situés hors de l'Union Européenne. Dans ce cas,
              nous nous assurons que des garanties appropriées sont mises en place (clauses contractuelles
              types, Privacy Shield, etc.) pour protéger vos données.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous pouvons modifier cette politique de confidentialité à tout moment. Toute modification
              sera publiée sur cette page et vous sera notifiée par email si les changements sont significatifs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact et réclamations</h2>
            <p className="text-gray-700 leading-relaxed">
              Pour toute question concernant vos données personnelles :<br />
              <strong>Délégué à la Protection des Données (DPO) :</strong><br />
              Email : dpo@sailingloc.fr<br />
              Adresse : 123 Rue du Port, 13000 Marseille, France<br />
              <br />
              Vous avez également le droit d'introduire une réclamation auprès de la CNIL (Commission
              Nationale de l'Informatique et des Libertés) : www.cnil.fr
            </p>
          </section>

          <p className="text-sm text-gray-600 mt-8 pt-6 border-t">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
    </div>
  );
}
