import { useState, useEffect } from 'react';
import { Calendar, MessageSquare, Star, CheckCircle } from 'lucide-react';
import { supabase, Reservation, Message } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface RenterDashboardProps {
  onNavigate: (page: string, id?: string) => void;
}

export function RenterDashboard({ onNavigate }: RenterDashboardProps) {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<'reservations' | 'messages'>('reservations');
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [review, setReview] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    loadRenterData();
  }, [user]);

  const loadRenterData = async () => {
    if (!user) return;

    try {
      const [reservationsRes, messagesRes] = await Promise.all([
        supabase
          .from('reservations')
          .select('*, boat:boats(title, location, price_per_day), owner:profiles!reservations_owner_id_fkey(full_name)')
          .eq('renter_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('messages')
          .select('*, sender:profiles!messages_sender_id_fkey(full_name)')
          .eq('recipient_id', user.id)
          .order('created_at', { ascending: false }),
      ]);

      setReservations(reservationsRes.data || []);
      setMessages(messagesRes.data || []);
    } catch (error) {
      console.error('Error loading renter data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReservation || !user) return;

    try {
      const { error } = await supabase.from('reviews').insert({
        reservation_id: selectedReservation.id,
        reviewer_id: user.id,
        boat_id: selectedReservation.boat_id,
        rating: review.rating,
        comment: review.comment,
      });

      if (error) throw error;

      alert('Avis publié avec succès !');
      setShowReviewModal(false);
      setReview({ rating: 5, comment: '' });
      setSelectedReservation(null);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Erreur lors de la publication de l\'avis');
    }
  };

  const cancelReservation = async (reservationId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) return;

    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: 'cancelled' })
        .eq('id', reservationId);

      if (error) throw error;
      await loadRenterData();
      alert('Réservation annulée');
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      alert('Erreur lors de l\'annulation');
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId);

      if (error) throw error;
      await loadRenterData();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  const upcomingReservations = reservations.filter(
    (r) => r.status === 'confirmed' && new Date(r.start_date) > new Date()
  );
  const completedReservations = reservations.filter((r) => r.status === 'completed');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Espace</h1>
        <p className="text-gray-600">Gérez vos réservations et messages</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="h-8 w-8 text-cyan-600" />
            <span className="text-3xl font-bold text-gray-900">{upcomingReservations.length}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Réservations à venir</h3>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-8 w-8 text-cyan-600" />
            <span className="text-3xl font-bold text-gray-900">{completedReservations.length}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Locations terminées</h3>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <MessageSquare className="h-8 w-8 text-cyan-600" />
            <span className="text-3xl font-bold text-gray-900">
              {messages.filter((m) => !m.is_read).length}
            </span>
          </div>
          <h3 className="text-gray-600 font-medium">Nouveaux messages</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('reservations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reservations'
                  ? 'border-cyan-600 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Mes réservations
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'messages'
                  ? 'border-cyan-600 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Messages
              {messages.filter((m) => !m.is_read).length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {messages.filter((m) => !m.is_read).length}
                </span>
              )}
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'reservations' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Historique des réservations</h2>
              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {reservation.boat?.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {reservation.boat?.location}
                        </p>
                        <p className="text-sm text-gray-600">
                          Propriétaire: {reservation.owner?.full_name}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          reservation.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : reservation.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : reservation.status === 'completed'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {reservation.status === 'confirmed'
                          ? 'Confirmé'
                          : reservation.status === 'pending'
                          ? 'En attente'
                          : reservation.status === 'completed'
                          ? 'Terminé'
                          : 'Annulé'}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Date de début</p>
                        <p className="font-semibold">
                          {new Date(reservation.start_date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date de fin</p>
                        <p className="font-semibold">
                          {new Date(reservation.end_date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-600">Prix total</p>
                        <p className="text-2xl font-bold text-cyan-600">
                          {reservation.total_price}€
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {reservation.status === 'pending' && (
                          <button
                            onClick={() => cancelReservation(reservation.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                          >
                            Annuler
                          </button>
                        )}
                        {reservation.status === 'completed' && (
                          <button
                            onClick={() => {
                              setSelectedReservation(reservation);
                              setShowReviewModal(true);
                            }}
                            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm flex items-center space-x-2"
                          >
                            <Star className="h-4 w-4" />
                            <span>Laisser un avis</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {reservations.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucune réservation</p>
                    <button
                      onClick={() => onNavigate('boats')}
                      className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                    >
                      Découvrir les bateaux
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Messages</h2>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`border rounded-lg p-4 ${
                      !message.is_read ? 'bg-cyan-50 border-cyan-200' : ''
                    }`}
                    onClick={() => !message.is_read && markMessageAsRead(message.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">{message.sender?.full_name}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(message.created_at).toLocaleString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-gray-700">{message.content}</p>
                  </div>
                ))}
                {messages.length === 0 && (
                  <p className="text-gray-500 text-center py-8">Aucun message</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showReviewModal && selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Laisser un avis</h2>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setReview({ ...review, rating })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          rating <= review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Commentaire</label>
                <textarea
                  value={review.comment}
                  onChange={(e) => setReview({ ...review, comment: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 resize-none"
                  rows={4}
                  placeholder="Partagez votre expérience..."
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700"
                >
                  Publier
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReviewModal(false);
                    setReview({ rating: 5, comment: '' });
                    setSelectedReservation(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
