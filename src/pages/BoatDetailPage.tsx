import { useState, useEffect } from 'react';
import { MapPin, Users, Anchor as AnchorIcon, Calendar, Star, ArrowLeft } from 'lucide-react';
import { supabase, Boat, Review } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface BoatDetailPageProps {
  boatId: string;
  onNavigate: (page: string) => void;
}

export function BoatDetailPage({ boatId, onNavigate }: BoatDetailPageProps) {
  const { user, profile } = useAuth();
  const [boat, setBoat] = useState<Boat | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reserving, setReserving] = useState(false);
  const [existingReservations, setExistingReservations] = useState<string[]>([]);

  useEffect(() => {
    loadBoatDetails();
    loadReviews();
    loadReservations();
  }, [boatId]);

  const loadReservations = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('start_date, end_date')
        .eq('boat_id', boatId)
        .in('status', ['pending', 'confirmed']);

      if (error) throw error;

      const blockedDates: string[] = [];
      data?.forEach((reservation) => {
        const start = new Date(reservation.start_date);
        const end = new Date(reservation.end_date);
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          blockedDates.push(d.toISOString().split('T')[0]);
        }
      });
      setExistingReservations(blockedDates);
    } catch (error) {
      console.error('Error loading reservations:', error);
    }
  };

  const loadBoatDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('boats')
        .select('*, owner:profiles(id, full_name, email, phone)')
        .eq('id', boatId)
        .maybeSingle();

      if (error) throw error;
      setBoat(data);
    } catch (error) {
      console.error('Error loading boat:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*, reviewer:profiles(full_name)')
        .eq('boat_id', boatId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const handleReservation = async () => {
    if (!user) {
      alert('Veuillez vous connecter pour réserver un bateau');
      onNavigate('login');
      return;
    }

    if (!boat || !startDate || !endDate) return;

    setReserving(true);

    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const totalPrice = days * boat.price_per_day;

      const { error } = await supabase.from('reservations').insert({
        boat_id: boat.id,
        renter_id: user.id,
        owner_id: boat.owner_id,
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
        status: 'pending',
      });

      if (error) throw error;

      alert('Réservation envoyée avec succès! Le propriétaire recevra votre demande.');
      onNavigate('dashboard');
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Erreur lors de la création de la réservation');
    } finally {
      setReserving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  if (!boat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AnchorIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Bateau non trouvé</p>
        </div>
      </div>
    );
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('boats')}
          className="flex items-center text-gray-600 hover:text-cyan-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour aux bateaux
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                {boat.image_url ? (
                  <img
                    src={boat.image_url}
                    alt={boat.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <AnchorIcon className="h-32 w-32 text-white opacity-50" />
                )}
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{boat.title}</h1>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{boat.location}</span>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                    {boat.type === 'sailboat' ? 'Voilier' : 'Bateau à moteur'}
                  </span>
                </div>

                <div className="flex items-center space-x-6 py-6 border-y border-gray-200">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="font-semibold">{boat.capacity} personnes</span>
                  </div>
                  <div className="flex items-center">
                    <AnchorIcon className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="font-semibold">{boat.size} mètres</span>
                  </div>
                  {boat.has_skipper && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Avec skipper
                    </span>
                  )}
                </div>

                <div className="py-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {boat.description || 'Aucune description disponible pour ce bateau.'}
                  </p>
                </div>

                {reviews.length > 0 && (
                  <div className="py-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Avis des locataires</h2>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                        <span className="font-semibold">{averageRating.toFixed(1)}</span>
                        <span className="text-gray-600 ml-1">({reviews.length} avis)</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">
                              {review.reviewer?.full_name || 'Utilisateur'}
                            </span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-cyan-600">{boat.price_per_day}€</span>
                  <span className="text-gray-600 ml-2">/jour</span>
                </div>
              </div>

              {boat.owner_id === user?.id ? (
                <div className="text-center py-4">
                  <p className="text-gray-600">C'est votre bateau</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de début
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de fin
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  {existingReservations.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800 font-medium mb-2">Dates déjà réservées:</p>
                      <div className="flex flex-wrap gap-1">
                        {Array.from(new Set(existingReservations)).slice(0, 10).map((date, idx) => (
                          <span key={idx} className="text-xs bg-yellow-200 text-yellow-900 px-2 py-1 rounded">
                            {new Date(date).toLocaleDateString('fr-FR')}
                          </span>
                        ))}
                        {existingReservations.length > 10 && (
                          <span className="text-xs text-yellow-800">
                            +{existingReservations.length - 10} autres
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {startDate && endDate && (
                    <div className="bg-cyan-50 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">
                          {Math.ceil(
                            (new Date(endDate).getTime() - new Date(startDate).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{' '}
                          jours
                        </span>
                        <span className="font-semibold">
                          {Math.ceil(
                            (new Date(endDate).getTime() - new Date(startDate).getTime()) /
                              (1000 * 60 * 60 * 24)
                          ) * boat.price_per_day}
                          €
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Frais de service (10%)</span>
                        <span>
                          {Math.ceil(
                            ((new Date(endDate).getTime() - new Date(startDate).getTime()) /
                              (1000 * 60 * 60 * 24)) *
                              boat.price_per_day *
                              0.1
                          )}
                          €
                        </span>
                      </div>
                      <div className="border-t border-cyan-200 mt-2 pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>
                          {Math.ceil(
                            ((new Date(endDate).getTime() - new Date(startDate).getTime()) /
                              (1000 * 60 * 60 * 24)) *
                              boat.price_per_day *
                              1.1
                          )}
                          €
                        </span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleReservation}
                    disabled={!startDate || !endDate || reserving}
                    className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {reserving ? 'Réservation...' : 'Réserver'}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Vous ne serez pas débité maintenant
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Propriétaire</h3>
                <p className="text-gray-600">{boat.owner?.full_name || 'Utilisateur'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
