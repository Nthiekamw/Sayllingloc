import { useState, useEffect } from 'react';
import { Anchor, Plus, Calendar, DollarSign, Trash2 } from 'lucide-react';
import { supabase, Boat, Reservation, Message } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface OwnerDashboardProps {
  onNavigate?: (page: string, id?: string) => void;
}

export function OwnerDashboard({ onNavigate }: OwnerDashboardProps) {
  const { user } = useAuth();
  const [boats, setBoats] = useState<Boat[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [myReservations, setMyReservations] = useState<Reservation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<'boats' | 'reservations' | 'myReservations' | 'messages'>('boats');
  const [loading, setLoading] = useState(true);
  const [showAddBoat, setShowAddBoat] = useState(false);
  const [newBoat, setNewBoat] = useState({
    title: '',
    description: '',
    type: 'sailboat' as 'sailboat' | 'motorboat',
    size: '',
    capacity: '',
    price_per_day: '',
    location: '',
    has_skipper: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadOwnerData();
  }, [user]);

  const loadOwnerData = async () => {
    if (!user) return;

    try {
      const [boatsRes, reservationsRes, myReservationsRes, messagesRes] = await Promise.all([
        supabase.from('boats').select('*').eq('owner_id', user.id),
        supabase
          .from('reservations')
          .select('*, boat:boats(title), renter:profiles!reservations_renter_id_fkey(full_name, email)')
          .eq('owner_id', user.id)
          .order('created_at', { ascending: false }),
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

      setBoats(boatsRes.data || []);
      setReservations(reservationsRes.data || []);
      setMyReservations(myReservationsRes.data || []);
      setMessages(messagesRes.data || []);
    } catch (error) {
      console.error('Error loading owner data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBoat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setUploading(true);
      let imageUrl = null;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('boat-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('boat-images')
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
      }

      const { error } = await supabase.from('boats').insert({
        owner_id: user.id,
        title: newBoat.title,
        description: newBoat.description,
        type: newBoat.type,
        size: parseFloat(newBoat.size),
        capacity: parseInt(newBoat.capacity),
        price_per_day: parseFloat(newBoat.price_per_day),
        location: newBoat.location,
        has_skipper: newBoat.has_skipper,
        image_url: imageUrl,
        status: 'active',
      });

      if (error) throw error;

      alert('Bateau ajouté avec succès !');
      setShowAddBoat(false);
      setNewBoat({
        title: '',
        description: '',
        type: 'sailboat',
        size: '',
        capacity: '',
        price_per_day: '',
        location: '',
        has_skipper: false,
      });
      setImageFile(null);
      await loadOwnerData();
    } catch (error) {
      console.error('Error adding boat:', error);
      alert('Erreur lors de l\'ajout du bateau');
    } finally {
      setUploading(false);
    }
  };

  const deleteBoat = async (boatId: string, imageUrl: string | null) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce bateau ?')) return;

    try {
      if (imageUrl) {
        const path = imageUrl.split('/boat-images/')[1];
        if (path) {
          await supabase.storage.from('boat-images').remove([path]);
        }
      }

      const { error } = await supabase
        .from('boats')
        .delete()
        .eq('id', boatId);

      if (error) throw error;
      await loadOwnerData();
      alert('Bateau supprimé avec succès');
    } catch (error) {
      console.error('Error deleting boat:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const updateReservationStatus = async (
    reservationId: string,
    status: 'confirmed' | 'cancelled'
  ) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', reservationId);

      if (error) throw error;
      await loadOwnerData();
      alert('Statut mis à jour');
    } catch (error) {
      console.error('Error updating reservation:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId);

      if (error) throw error;
      await loadOwnerData();
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

  const totalEarnings = reservations
    .filter((r) => r.status === 'completed')
    .reduce((sum, r) => sum + r.total_price * 0.9, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Tableau de Bord</h1>
        <p className="text-gray-600">Gérez vos bateaux et réservations</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Anchor className="h-8 w-8 text-cyan-600" />
            <span className="text-3xl font-bold text-gray-900">{boats.length}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Mes bateaux</h3>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="h-8 w-8 text-cyan-600" />
            <span className="text-3xl font-bold text-gray-900">{reservations.length}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Réservations</h3>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-8 w-8 text-cyan-600" />
            <span className="text-3xl font-bold text-gray-900">{totalEarnings.toFixed(0)}€</span>
          </div>
          <h3 className="text-gray-600 font-medium">Revenus totaux</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('boats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'boats'
                  ? 'border-cyan-600 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Mes bateaux
            </button>
            <button
              onClick={() => setActiveTab('reservations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reservations'
                  ? 'border-cyan-600 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Réservations reçues
            </button>
            <button
              onClick={() => setActiveTab('myReservations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'myReservations'
                  ? 'border-cyan-600 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Mes locations
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
          {activeTab === 'boats' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Mes bateaux</h2>
                <button
                  onClick={() => setShowAddBoat(!showAddBoat)}
                  className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                >
                  <Plus className="h-5 w-5" />
                  <span>Ajouter un bateau</span>
                </button>
              </div>

              {showAddBoat && (
                <form onSubmit={handleAddBoat} className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Nouveau bateau</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Titre"
                      value={newBoat.title}
                      onChange={(e) => setNewBoat({ ...newBoat, title: e.target.value })}
                      className="px-4 py-2 border rounded-lg"
                      required
                    />
                    <select
                      value={newBoat.type}
                      onChange={(e) =>
                        setNewBoat({ ...newBoat, type: e.target.value as any })
                      }
                      className="px-4 py-2 border rounded-lg"
                    >
                      <option value="sailboat">Voilier</option>
                      <option value="motorboat">Bateau à moteur</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Taille (m)"
                      value={newBoat.size}
                      onChange={(e) => setNewBoat({ ...newBoat, size: e.target.value })}
                      className="px-4 py-2 border rounded-lg"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Capacité"
                      value={newBoat.capacity}
                      onChange={(e) => setNewBoat({ ...newBoat, capacity: e.target.value })}
                      className="px-4 py-2 border rounded-lg"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Prix/jour (€)"
                      value={newBoat.price_per_day}
                      onChange={(e) => setNewBoat({ ...newBoat, price_per_day: e.target.value })}
                      className="px-4 py-2 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Localisation"
                      value={newBoat.location}
                      onChange={(e) => setNewBoat({ ...newBoat, location: e.target.value })}
                      className="px-4 py-2 border rounded-lg"
                      required
                    />
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Photo du bateau
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      {imageFile && (
                        <p className="text-sm text-green-600 mt-2">
                          Fichier sélectionné: {imageFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <textarea
                    placeholder="Description"
                    value={newBoat.description}
                    onChange={(e) => setNewBoat({ ...newBoat, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg mt-4"
                    rows={3}
                  />
                  <label className="flex items-center space-x-2 mt-4">
                    <input
                      type="checkbox"
                      checked={newBoat.has_skipper}
                      onChange={(e) =>
                        setNewBoat({ ...newBoat, has_skipper: e.target.checked })
                      }
                      className="rounded"
                    />
                    <span>Avec skipper</span>
                  </label>
                  <div className="flex space-x-4 mt-4">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? 'Ajout en cours...' : 'Ajouter'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddBoat(false);
                        setImageFile(null);
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                {boats.map((boat) => (
                  <div key={boat.id} className="border rounded-lg p-4 relative">
                    {boat.image_url && (
                      <img
                        src={boat.image_url}
                        alt={boat.title}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                    )}
                    <h3 className="font-semibold text-lg mb-2">{boat.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{boat.description}</p>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">
                        {boat.type === 'sailboat' ? 'Voilier' : 'Moteur'}
                      </span>
                      <span className="font-semibold text-cyan-600">{boat.price_per_day}€/j</span>
                    </div>
                    <button
                      onClick={() => deleteBoat(boat.id, boat.image_url)}
                      className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reservations' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Demandes de réservation</h2>
              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{reservation.boat?.title}</h3>
                        <p className="text-sm text-gray-600">
                          Locataire: {reservation.renter?.full_name}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          reservation.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : reservation.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
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
                    <p className="text-sm text-gray-600">
                      Du {new Date(reservation.start_date).toLocaleDateString()} au{' '}
                      {new Date(reservation.end_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-semibold mt-2">
                      Total: {reservation.total_price}€
                    </p>
                    {reservation.status === 'pending' && (
                      <div className="flex space-x-2 mt-4">
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                        >
                          Accepter
                        </button>
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                        >
                          Refuser
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'myReservations' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Mes locations</h2>
              <div className="space-y-4">
                {myReservations.map((reservation) => (
                  <div key={reservation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{reservation.boat?.title}</h3>
                        <p className="text-sm text-gray-600">
                          Propriétaire: {reservation.owner?.full_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {reservation.boat?.location}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          reservation.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : reservation.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
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
                    <p className="text-sm text-gray-600">
                      Du {new Date(reservation.start_date).toLocaleDateString()} au{' '}
                      {new Date(reservation.end_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-semibold mt-2">
                      Total: {reservation.total_price}€
                    </p>
                  </div>
                ))}
                {myReservations.length === 0 && (
                  <p className="text-gray-500 text-center py-8">Aucune location</p>
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
                        {new Date(message.created_at).toLocaleString()}
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
    </div>
  );
}
