import { Anchor, Facebook, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps = {}) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Anchor className="h-6 w-6 text-cyan-400" />
              <span className="text-lg font-bold">SailingLoc</span>
            </div>
            <p className="text-gray-400 text-sm">
              La première plateforme de location de bateaux entre particuliers. Voiliers, bateaux à moteur, avec ou sans skipper.
            </p>
            <div className="flex space-x-4 mt-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li
                onClick={() => onNavigate?.('how-it-works')}
                className="hover:text-cyan-400 cursor-pointer transition-colors"
              >
                Comment ça marche
              </li>
              <li
                onClick={() => onNavigate?.('contact')}
                className="hover:text-cyan-400 cursor-pointer transition-colors"
              >
                Contact
              </li>
              <li
                onClick={() => onNavigate?.('legal')}
                className="hover:text-cyan-400 cursor-pointer transition-colors"
              >
                Mentions Légales
              </li>
              <li
                onClick={() => onNavigate?.('cgu')}
                className="hover:text-cyan-400 cursor-pointer transition-colors"
              >
                CGU
              </li>
              <li
                onClick={() => onNavigate?.('terms')}
                className="hover:text-cyan-400 cursor-pointer transition-colors"
              >
                CGV
              </li>
              <li
                onClick={() => onNavigate?.('privacy')}
                className="hover:text-cyan-400 cursor-pointer transition-colors"
              >
                Politique de Confidentialité
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Propriétaires</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Proposer mon bateau</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Guide du propriétaire</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Assurance</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Tarification</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Ne manquez aucune opportunité</h3>
            <p className="text-sm text-gray-400 mb-4">
              Inscrivez-vous pour recevoir les meilleures offres de location et nos actualités.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-3 py-2 bg-gray-800 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button className="px-4 py-2 bg-cyan-600 rounded-r-lg hover:bg-cyan-700 transition-colors text-sm font-medium">
                OK
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} SailingLoc. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
