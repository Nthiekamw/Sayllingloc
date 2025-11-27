export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mentions Légales</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          <section>
            <p className="text-gray-700 leading-relaxed mb-4">
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique,
              il est précisé aux utilisateurs du site SailingLoc l'identité des différents intervenants dans le cadre de sa
              réalisation et de son suivi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Édition du site</h2>
            <p className="text-gray-700 leading-relaxed">
              Le présent site, accessible à l'URL sailingloc.fr, est édité par la société <strong>Novalys Digital</strong>,
              société au capital de <strong>500 000 euros</strong>, inscrite au R.C.S. de PARIS sous le numéro
              <strong>RCS Paris B 650 745 597</strong>, dont le siège social est situé au <strong>16, Rue Nova, 75008 Paris</strong>.
              <br /><br />
              Le Site internet a fait l'objet d'une déclaration à la CNIL sous le numéro 0000000
              <br /><br />
              <strong>Représentant légal :</strong> Yama Tounkara<br />
              <strong>Directeur de publication :</strong> Yama Tounkara<br />
              <strong>Numéro de SIRET :</strong> 650 745 597 000 23<br />
              <strong>Numéro individuel TVA :</strong> FR 65 745 597
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Hébergement</h2>
            <p className="text-gray-700 leading-relaxed">
              Le Site est hébergé par la société <strong>HOSTINGER</strong><br />
              Adresse : 61 Lordou Vironos str., 6023 Larnaca, Chypre<br />
              Site : <a href="https://www.hostinger.com" className="text-cyan-600 hover:text-cyan-700 underline" target="_blank" rel="noopener noreferrer">https://www.hostinger.com</a><br />
              Tél : 04 44 44 60 40<br />
              Fax : 04 44 44 60 41
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Données personnelles</h2>
            <p className="text-gray-700 leading-relaxed">
              Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée,
              disponible depuis la section "Charte de Protection des Données Personnelles", conformément au Règlement
              Général sur la Protection des Données 2016/679 du 27 avril 2016 (« RGPD »).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
