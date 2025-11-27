import { Anchor, Menu, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { user, profile, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b" role="navigation" aria-label="Navigation principale">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
            aria-label="Retour à l'accueil SailingLoc"
          >
            <Anchor className="h-8 w-8 text-cyan-600" aria-hidden="true" />
            <span className="text-xl font-bold text-gray-900">SailingLoc</span>
          </button>

          <div className="hidden md:flex items-center space-x-8" role="menubar">
            <button
              onClick={() => onNavigate('home')}
              className={`${
                currentPage === 'home' ? 'text-cyan-600' : 'text-gray-700 hover:text-cyan-600'
              } transition-colors`}
              aria-current={currentPage === 'home' ? 'page' : undefined}
              role="menuitem"
            >
              Accueil
            </button>
            <button
              onClick={() => onNavigate('boats')}
              className={`${
                currentPage === 'boats' ? 'text-cyan-600' : 'text-gray-700 hover:text-cyan-600'
              } transition-colors`}
              aria-current={currentPage === 'boats' ? 'page' : undefined}
              role="menuitem"
            >
              Bateaux
            </button>
            <button
              onClick={() => onNavigate('how-it-works')}
              className={`${
                currentPage === 'how-it-works' ? 'text-cyan-600' : 'text-gray-700 hover:text-cyan-600'
              } transition-colors`}
              aria-current={currentPage === 'how-it-works' ? 'page' : undefined}
              role="menuitem"
            >
              Comment ça marche
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`${
                currentPage === 'contact' ? 'text-cyan-600' : 'text-gray-700 hover:text-cyan-600'
              } transition-colors`}
              aria-current={currentPage === 'contact' ? 'page' : undefined}
              role="menuitem"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Proposer un bateau
                </button>
                <div className="relative group">
                  <button
                    className="flex items-center space-x-2 text-gray-700 hover:text-cyan-600 transition-colors"
                    aria-label="Menu utilisateur"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <User className="h-5 w-5" aria-hidden="true" />
                    <span className="hidden sm:inline">{profile?.full_name || 'Mon compte'}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border hidden group-hover:block z-50" role="menu">
                    <button
                      onClick={() => onNavigate('profile')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                      role="menuitem"
                    >
                      Mon profil
                    </button>
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Tableau de bord
                    </button>
                    <button
                      onClick={signOut}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg text-red-600"
                      role="menuitem"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Connexion
              </button>
            )}
          </div>

          <button className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </nav>
  );
}
