import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { HomePage } from './pages/HomePage';
import { BoatsPage } from './pages/BoatsPage';
import { BoatDetailPage } from './pages/BoatDetailPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import LegalPage from './pages/LegalPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CguPage from './pages/CguPage';
import { useAuth } from './contexts/AuthContext';

type Page =
  | 'home'
  | 'boats'
  | 'boat-detail'
  | 'how-it-works'
  | 'contact'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'profile'
  | 'legal'
  | 'terms'
  | 'privacy'
  | 'cgu';

function App() {
  const { loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedBoatId, setSelectedBoatId] = useState<string | null>(null);

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page as Page);
    if (id) {
      setSelectedBoatId(id);
    }
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const showNavbarFooter = currentPage !== 'login' && currentPage !== 'register';

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbarFooter && <Navbar currentPage={currentPage} onNavigate={handleNavigate} />}

      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'boats' && <BoatsPage onNavigate={handleNavigate} />}
        {currentPage === 'boat-detail' && selectedBoatId && (
          <BoatDetailPage boatId={selectedBoatId} onNavigate={handleNavigate} />
        )}
        {currentPage === 'how-it-works' && <HowItWorksPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
        {currentPage === 'register' && <RegisterPage onNavigate={handleNavigate} />}
        {currentPage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} />}
        {currentPage === 'profile' && <ProfilePage />}
        {currentPage === 'legal' && <LegalPage />}
        {currentPage === 'terms' && <TermsPage />}
        {currentPage === 'privacy' && <PrivacyPage />}
        {currentPage === 'cgu' && <CguPage />}
      </main>

      {showNavbarFooter && <Footer onNavigate={handleNavigate} />}
      <CookieBanner onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
