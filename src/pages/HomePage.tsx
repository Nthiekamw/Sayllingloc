import { Search, Shield, CreditCard, Star, Anchor } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[600px] bg-gradient-to-br from-cyan-500 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center text-white">
          <div className="mb-6">
            <Anchor className="h-20 w-20 mx-auto mb-4" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Naviguez en toute liberté
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            Découvrez la première plateforme de location de bateaux entre particuliers. Voiliers, bateaux à moteur, avec ou sans skipper.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate('boats')}
              className="px-8 py-4 bg-white text-cyan-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Explorer les bateaux
            </button>
            <button
              onClick={() => onNavigate('how-it-works')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-cyan-600 transition-colors"
            >
              Comment ça marche
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">500+</div>
              <div className="text-gray-600">Bateaux disponibles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">2000+</div>
              <div className="text-gray-600">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">50+</div>
              <div className="text-gray-600">Ports partenaires</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">4.8/5</div>
              <div className="text-gray-600">Note moyenne</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Pourquoi choisir SailingLoc
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Notre plateforme offre une expérience de location simple, sécurisée et transparente
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trouvez votre bateau</h3>
              <p className="text-gray-600 leading-relaxed">
                Parcourez des centaines de bateaux disponibles. Filtrez par type, taille, localisation, etc.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Réservation sécurisée</h3>
              <p className="text-gray-600 leading-relaxed">
                Tous nos bateaux sont assurés et vérifiés par nos équipes. Réservez en toute confiance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <CreditCard className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Paiement en ligne</h3>
              <p className="text-gray-600 leading-relaxed">
                Payez en toute sécurité avec notre système de paiement sécurisé. Argent protégé jusqu'à la fin de la location.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Système d'avis</h3>
              <p className="text-gray-600 leading-relaxed">
                Consultez les avis des autres locataires pour naviguer en toute confiance. Partagez votre expérience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Rejoignez notre communauté</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Plus de 2000 passionnés de navigation nous font déjà confiance. Que vous soyez propriétaire ou locataire, venez vivre l'aventure maritime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('boats')}
              className="px-8 py-4 bg-white text-cyan-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Louer un bateau
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-cyan-600 transition-colors"
            >
              Proposer mon bateau
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
