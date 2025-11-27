export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Conditions Générales de Vente</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Objet</h2>
            <p className="text-gray-700 leading-relaxed">
              Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre
              SailingLoc et ses utilisateurs dans le cadre de la location de bateaux via la plateforme.
              En utilisant nos services, vous acceptez sans réserve les présentes CGV.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services proposés</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              SailingLoc met en relation des propriétaires de bateaux avec des locataires. La plateforme propose :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>La mise en ligne d'annonces de bateaux disponibles à la location</li>
              <li>Un système de réservation en ligne</li>
              <li>Un système de paiement sécurisé</li>
              <li>Un service de messagerie entre propriétaires et locataires</li>
              <li>Un système d'évaluation et d'avis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Inscription</h2>
            <p className="text-gray-700 leading-relaxed">
              Pour utiliser les services de SailingLoc, l'utilisateur doit créer un compte en fournissant
              des informations exactes et à jour. L'utilisateur s'engage à ne créer qu'un seul compte et
              à ne pas usurper l'identité d'une autre personne. L'utilisateur est responsable de la
              confidentialité de ses identifiants de connexion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Réservation et paiement</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>4.1 Processus de réservation</strong><br />
              Le locataire sélectionne un bateau, choisit les dates de location et effectue une demande
              de réservation. La réservation est confirmée après validation par le propriétaire.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>4.2 Prix et paiement</strong><br />
              Les prix sont indiqués en euros TTC. Le paiement s'effectue en ligne via notre plateforme
              sécurisée. Le montant total est débité au moment de la confirmation de la réservation.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>4.3 Commission de la plateforme</strong><br />
              SailingLoc prélève une commission de 15% sur chaque transaction pour couvrir les frais
              de gestion, de maintenance de la plateforme et d'assurance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Annulation et remboursement</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>5.1 Annulation par le locataire</strong><br />
              - Plus de 30 jours avant la date : remboursement intégral<br />
              - Entre 15 et 30 jours : remboursement à 50%<br />
              - Moins de 15 jours : aucun remboursement
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>5.2 Annulation par le propriétaire</strong><br />
              En cas d'annulation par le propriétaire, le locataire est intégralement remboursé et reçoit
              une indemnité de 20% du montant de la réservation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Obligations du propriétaire</h2>
            <p className="text-gray-700 leading-relaxed">
              Le propriétaire s'engage à fournir un bateau en bon état de fonctionnement, conforme à la
              description de l'annonce, et respectant toutes les normes de sécurité en vigueur. Il doit
              également fournir tous les documents nécessaires (assurance, certificats de navigation, etc.).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Obligations du locataire</h2>
            <p className="text-gray-700 leading-relaxed">
              Le locataire s'engage à utiliser le bateau de manière responsable et conforme à sa destination.
              Il doit restituer le bateau dans l'état dans lequel il l'a reçu et est responsable de tout
              dommage causé pendant la période de location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Assurance</h2>
            <p className="text-gray-700 leading-relaxed">
              Chaque bateau doit être couvert par une assurance responsabilité civile valide. Le locataire
              est encouragé à souscrire une assurance complémentaire pour couvrir les dommages éventuels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Responsabilité</h2>
            <p className="text-gray-700 leading-relaxed">
              SailingLoc agit en qualité d'intermédiaire et ne peut être tenu responsable des litiges
              entre propriétaires et locataires. La responsabilité de SailingLoc est limitée au montant
              de la commission perçue sur la transaction concernée.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Protection des données</h2>
            <p className="text-gray-700 leading-relaxed">
              Les données personnelles collectées sont traitées conformément au RGPD. Pour plus
              d'informations, consultez notre Politique de Confidentialité.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modification des CGV</h2>
            <p className="text-gray-700 leading-relaxed">
              SailingLoc se réserve le droit de modifier les présentes CGV à tout moment. Les utilisateurs
              seront informés de toute modification par email et devront accepter les nouvelles conditions
              pour continuer à utiliser la plateforme.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Droit applicable et juridiction</h2>
            <p className="text-gray-700 leading-relaxed">
              Les présentes CGV sont régies par le droit français. En cas de litige, les parties s'efforceront
              de trouver une solution amiable. À défaut, le litige sera porté devant les tribunaux compétents
              de Marseille.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Pour toute question concernant ces CGV, vous pouvez nous contacter :<br />
              <strong>Email :</strong> legal@sailingloc.fr<br />
              <strong>Téléphone :</strong> +33 4 91 00 00 00<br />
              <strong>Adresse :</strong> 123 Rue du Port, 13000 Marseille, France
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
