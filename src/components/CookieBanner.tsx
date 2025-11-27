import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

interface CookieBannerProps {
  onNavigate?: (page: string) => void;
}

export function CookieBanner({ onNavigate }: CookieBannerProps) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    setShowBanner(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('cookieConsent', 'essential');
    setShowBanner(false);
  };

  const handleClose = () => {
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50 animate-slide-up">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4 flex-1">
            <Cookie className="h-8 w-8 text-cyan-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                Nous utilisons des cookies
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Nous utilisons des cookies pour améliorer votre expérience sur notre site,
                analyser le trafic et personnaliser le contenu. En cliquant sur "Accepter tout",
                vous consentez à l'utilisation de tous les cookies.{' '}
                <button
                  onClick={() => onNavigate?.('privacy')}
                  className="text-cyan-600 hover:text-cyan-700 underline font-medium"
                >
                  En savoir plus
                </button>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleAcceptEssential}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
            >
              Cookies essentiels uniquement
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-6 py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium text-sm"
            >
              Accepter tout
            </button>
            <button
              onClick={handleClose}
              className="p-2.5 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fermer le bandeau de cookies"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
