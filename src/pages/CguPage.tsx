export default function CguPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Conditions Générales d'Utilisation
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8 prose prose-cyan max-w-none">
          <div className="bg-cyan-50 border-l-4 border-cyan-600 p-4 mb-6">
            <p className="text-sm text-gray-700">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              SECTION 1 – ACCEPTATION PAR LES UTILISATEURS DES CGU DU SITE ET DU SERVICE SAILINGLOC
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Les Utilisateurs déclarent avoir pris connaissance des CGU dans leur intégralité et acceptent sans réserve
              ni exception l'ensemble des dispositions composant les présentes Conditions Générales d'Utilisation du service
              et de la Plateforme SailingLoc. Elles s'appliquent sans restriction à l'ensemble des services proposés par
              la Société Novalys Digital au moyen du site communautaire https://www.sailingloc.fr
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Le Site offre un service de mise en relation à ses Membres dont l'inscription sur le Site ouvre la
              participation à des activités de location de Bateaux, que cela soit en qualité de Propriétaire ou de Locataire.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Le concept SailingLoc permet ainsi la mise en relation de Propriétaires particuliers ou professionnels de
              Bateaux avec toute personne souhaitant bénéficier d'une prestation de location desdits Bateaux.
            </p>
            <p className="text-gray-700 leading-relaxed">
              L'accès et l'utilisation du Site sont subordonnés à l'acceptation et au respect des CGU. Les CGU pourront être
              adaptées aux besoins du service ou des Utilisateurs ; Toute modification des CGU sera opposable à l'ensemble
              des Utilisateurs du Site à compter de leur mise en ligne.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              SECTION 2 – INSCRIPTION ET UTILISATION DU SERVICE
            </h2>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">2.1 – Modalités d'inscription</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              L'inscription sur la Plateforme doit s'effectuer directement sur le site internet https://www.sailingloc.fr
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              L'utilisation des services proposés par la Société sur la Plateforme est soumise à la création d'un compte
              personnel. Le formulaire mis en ligne sur le site doit être complété afin de permettre l'ouverture de compte
              et l'accession à la qualité de Membre de la communauté SailingLoc.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">2.2 – Informations communiquées</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Les Utilisateurs s'engagent à fournir des informations exactes et sincères lors de l'inscription ou de la
              participation aux services du Site. Chaque Utilisateur est seul responsable des informations communiquées.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">2.3 – Annonces de Location</h3>
            <p className="text-gray-700 leading-relaxed">
              Les Propriétaires s'engagent à publier des Annonces de location conformes à la réalité des conditions présidant
              à la location de son Bateau. Chaque Propriétaire est seul responsable de l'authenticité des Annonces de location
              publiées sur le Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              SECTION 3 – CONDITIONS TECHNIQUES D'ACCÈS À LA PLATEFORME
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              L'Utilisateur peut avoir accès aux services de la Plateforme au moyen d'un réseau internet, gratuitement.
              Les frais supportés par l'Utilisateur pour l'accès aux services (matériel informatique, logiciels, connexion
              internet, etc.) demeurent à sa charge.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Le Site s'engage à mettre en œuvre tous les moyens mis à sa disposition pour assurer un accès continu et de
              qualité à ses services. L'obligation du Site à cet effet est de moyens.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              SECTION 4 – DROITS ET OBLIGATIONS DU PROPRIÉTAIRE
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Le Propriétaire doit être Membre de la communauté SailingLoc et disposer des documents établissant un droit
              de propriété régulier ou la qualité de gardien du Bateau. Il doit garantir l'authenticité des documents et
              informations fournis.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Le Propriétaire s'engage à proposer un Bateau en parfait état de fonctionnement, régulièrement entretenu,
              et équipé d'un armement de sécurité conforme à sa catégorie de navigation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              SECTION 5 – OBLIGATIONS DU LOCATAIRE
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Le Locataire est responsable du Bateau en sa qualité de gardien de la chose dès la prise de possession du
              Bateau et jusqu'à sa parfaite restitution. Il devra l'utiliser raisonnablement, l'entretenir et en prendre
              soin en bon père de famille.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Il est formellement interdit au Locataire de sous-louer le Bateau, de remorquer un autre Bateau, ou d'effectuer
              du transport de passagers à titre onéreux.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              SECTION 6 – MODALITÉS CONTRACTUELLES DES LOCATIONS
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              La Plateforme est un service de mise en relation et les relations contractuelles sont librement négociées
              et finalisées par les Utilisateurs. Le Site met à disposition un modèle prédéfini de Contrat de location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ARTICLE 7 – PRIX ET COMMISSIONS
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Le Prix de la location est librement fixé par le Propriétaire. Une commission de <strong>18% (DIX-HUIT POUR CENT)</strong> est
              due par le Propriétaire pour couvrir les Frais de service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ARTICLE 8 – SÉCURISATION DU PAIEMENT
            </h2>
            <p className="text-gray-700 leading-relaxed">
              La sécurité des transactions est assurée par la société STRIPE. Les paiements doivent être effectués
              exclusivement sur le Site au moyen d'une carte de paiement au nom du Locataire.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ARTICLE 9 – CONDITIONS D'ANNULATION
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <h4 className="font-bold text-gray-900 mb-2">SOUPLE :</h4>
              <p className="text-gray-700 text-sm">
                Remboursement jusqu'à la veille du départ
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <h4 className="font-bold text-gray-900 mb-2">ZEN :</h4>
              <p className="text-gray-700 text-sm">
                70% de remboursement si annulation 5 jours avant, 0% moins de 5 jours avant
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <h4 className="font-bold text-gray-900 mb-2">MODÉRÉE :</h4>
              <p className="text-gray-700 text-sm">
                50% de remboursement si annulation 2 semaines avant, 0% moins de 2 semaines avant
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-2">STRICTE :</h4>
              <p className="text-gray-700 text-sm">
                Aucun remboursement en cas d'annulation
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ARTICLE 10 – ASSURANCES
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Les Propriétaires doivent s'assurer que le Bateau est couvert par une assurance adaptée durant toute la
              période de location. Dans le cas où le Propriétaire ne bénéficie pas d'extension d'assurance pour son
              activité de location, il peut souscrire l'assurance multirisque à la journée MAIF proposée par SailingLoc.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ARTICLE 11 – RESPONSABILITÉS
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              La Société agit en tant qu'intermédiaire de mise en relation. Elle ne peut être tenue responsable des
              litiges entre Propriétaires et Locataires concernant les contrats de location.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Le Locataire est seul responsable de tous les dommages causés directement ou indirectement par le Bateau
              loué dès la remise du Bateau et jusqu'à sa restitution.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ARTICLE 12 – DONNÉES À CARACTÈRE PERSONNEL
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Le Site assure une collecte et un traitement d'informations personnelles dans le respect de la vie privée
              conformément au RGPD et à la Loi Informatique et Libertés.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Pour exercer vos droits (accès, rectification, suppression), contactez-nous à : contact@sailingloc.fr
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ARTICLE 13 – MÉDIATION
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Conformément aux dispositions du Code de la Consommation, les Utilisateurs ont la possibilité d'avoir
              recours gratuitement à un Médiateur de la consommation.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Le Médiateur dont le Site relève est <strong>Médiation Tourisme et Voyage</strong> :<br />
              Site web : <a href="https://www.mtv.travel/demande-saisine/" className="text-cyan-600 hover:text-cyan-700 underline" target="_blank" rel="noopener noreferrer">https://www.mtv.travel/demande-saisine/</a><br />
              Adresse postale : MTV – MEDIATION TOURISME VOYAGE, Service dépôt des saisines, BP 80303, 75823 PARIS Cedex 17
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ARTICLE 14 – DROIT APPLICABLE
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Les présentes CGU sont régies par la loi française. En cas de litige, les parties pourront saisir les
              juridictions compétentes françaises.
            </p>
          </section>

          <div className="bg-gray-100 rounded-lg p-6 mt-8">
            <p className="text-sm text-gray-600 text-center">
              Pour toute question concernant ces CGU, contactez-nous :<br />
              <strong>Email :</strong> contact@sailingloc.fr<br />
              <strong>Adresse :</strong> 16, Rue Nova, 75008 Paris
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
