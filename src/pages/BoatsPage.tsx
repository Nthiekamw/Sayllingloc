import { useState, useEffect } from 'react';
import { Search, MapPin, Users, Anchor as AnchorIcon } from 'lucide-react';
import { supabase, Boat } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface BoatsPageProps {
  onNavigate: (page: string, boatId?: string) => void;
}

export function BoatsPage({ onNavigate }: BoatsPageProps) {
  const { user } = useAuth();
  const [boats, setBoats] = useState<Boat[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'sailboat' | 'motorboat'>('all');

  useEffect(() => {
    loadBoats();
  }, []);

  const loadBoats = async () => {
    try {
      const { data, error } = await supabase
        .from('boats')
        .select('*, owner:profiles(full_name)')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBoats(data || []);
    } catch (error) {
      console.error('Error loading boats:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBoats = boats.filter((boat) => {
    const matchesSearch =
      boat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      boat.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || boat.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleBoatClick = (boatId: string) => {
    if (!user) {
      onNavigate('login');
      return;
    }
    onNavigate('boat-detail', boatId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Trouvez le bateau parfait</h1>
          <p className="text-xl mb-8">
            Découvrez notre sélection de {boats.length} bateaux disponibles à la location
          </p>

          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher par nom ou localisation..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900"
                />
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900"
              >
                <option value="all">Tous les types</option>
                <option value="sailboat">Voiliers</option>
                <option value="motorboat">Bateaux à moteur</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des bateaux...</p>
          </div>
        ) : filteredBoats.length === 0 ? (
          <div className="text-center py-12">
            <AnchorIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">Aucun bateau trouvé</p>
            <p className="text-gray-500 mt-2">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBoats.map((boat) => (
              <div
                key={boat.id}
                onClick={() => handleBoatClick(boat.id)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
              >
                <div className="h-56 bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  {boat.image_url ? (
                    <img
                      src={boat.image_url}
                      alt={boat.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <AnchorIcon className="h-24 w-24 text-white opacity-50" />
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{boat.title}</h3>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                      {boat.type === 'sailboat' ? 'Voilier' : 'Moteur'}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{boat.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {boat.description || 'Aucune description disponible'}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{boat.capacity} pers.</span>
                    </div>
                    <div>{boat.size}m</div>
                    {boat.has_skipper && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        Avec skipper
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <span className="text-2xl font-bold text-cyan-600">{boat.price_per_day}€</span>
                      <span className="text-gray-600 text-sm">/jour</span>
                    </div>
                    <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
