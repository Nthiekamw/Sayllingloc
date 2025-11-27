import { Search, Shield, CreditCard, Anchor, CheckCircle } from 'lucide-react';

export function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Comment ça marche ?</h1>
          <p className="text-xl">
            Découvrez notre sélection de 3 bateaux disponibles à la location. Louer un bateau n'a jamais été aussi simple. Découvrez notre processus en 4 étapes pour vivre votre prochaine aventure maritime.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">4 étapes simples</h2>

        <div className="space-y-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-cyan-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <div className="text-4xl font-bold text-cyan-600">1</div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Étape 1<br />Trouvez votre bateau</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Parcourez notre catalogue de bateaux disponibles. Filtrez par type, taille, localisation, avec ou sans skipper, etc.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Plus de 500 bateaux disponibles</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Recherche intuitive et filtres avancés</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Photos haute qualité</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Descriptions détaillées</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-12 flex items-center justify-center h-80">
                <Search className="h-32 w-32 text-white" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-cyan-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <div className="text-4xl font-bold text-cyan-600">2</div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Étape 2<br />Réservez en ligne</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Sélectionnez vos dates et confirmez votre réservation directement sur la plateforme. Le propriétaire recevra votre demande.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Calendrier de disponibilité en temps réel</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Réservation instantanée</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Choix du skipper</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Confirmation immédiate</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-12 flex items-center justify-center h-80">
                <Shield className="h-32 w-32 text-white" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-cyan-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <div className="text-4xl font-bold text-cyan-600">3</div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Étape 3<br />Paiement sécurisé</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Payez en toute sécurité avec notre système de paiement sécurisé. Votre argent est protégé jusqu'à la fin de la location.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Paiement SSL</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Cryptage bancaire</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Argent protégé jusqu'à la remise des clés</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Assurance incluse</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-12 flex items-center justify-center h-80">
                <CreditCard className="h-32 w-32 text-white" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-cyan-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <div className="text-4xl font-bold text-cyan-600">4</div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Étape 4<br />Naviguez !</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Récupérez les clés et profitez de votre journée en mer. Notre équipe et le propriétaire vous accompagnent tout au long de votre location.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>État des lieux complet</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Briefing sécurité</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Support 24/7</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Urgence coutumes</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-12 flex items-center justify-center h-80">
                <Anchor className="h-32 w-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Prêt à prendre le large ?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez des milliers de passionnés qui ont déjà navigué avec SailingLoc
          </p>
          <button className="px-8 py-4 bg-cyan-600 text-white rounded-lg font-semibold text-lg hover:bg-cyan-700 transition-colors shadow-lg">
            Découvrir les bateaux
          </button>
        </div>
      </div>
    </div>
  );
}
