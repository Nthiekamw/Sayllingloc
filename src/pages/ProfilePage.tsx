import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, FileText, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Reservation, Boat } from '../lib/supabase';

interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  role: 'owner' | 'renter' | 'admin';
  created_at: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [reservations, setReservations] = useState<(Reservation & { boat: Boat })[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    if (!user) return;

    try {
      const [profileRes, reservationsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
        supabase
          .from('reservations')
          .select('*, boat:boats(*)')
          .eq('renter_id', user.id)
          .order('created_at', { ascending: false }),
      ]);

      if (profileRes.data) {
        setProfile(profileRes.data);
        setFormData({
          full_name: profileRes.data.full_name || '',
          phone: profileRes.data.phone || '',
          address: profileRes.data.address || '',
        });
      }

      if (reservationsRes.data) {
        setReservations(reservationsRes.data as any);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone || null,
          address: formData.address || null,
        })
        .eq('id', user.id);

      if (error) throw error;

      alert('Profil mis à jour avec succès');
      setEditing(false);
      await loadProfileData();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Erreur lors de la mise à jour du profil');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!profile || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Profil non trouvé</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mon Profil</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Informations personnelles</h2>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                  >
                    Modifier
                  </button>
                )}
              </div>

              {editing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline h-4 w-4 mr-2" />
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline h-4 w-4 mr-2" />
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-2" />
                      Adresse
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                    >
                      <Save className="h-4 w-4" />
                      <span>Enregistrer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(false);
                        setFormData({
                          full_name: profile.full_name || '',
                          phone: profile.phone || '',
                          address: profile.address || '',
                        });
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Nom complet</p>
                      <p className="font-medium">{profile.full_name}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{profile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Téléphone</p>
                      <p className="font-medium">{profile.phone || 'Non renseigné'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Adresse</p>
                      <p className="font-medium">{profile.address || 'Non renseignée'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Historique des réservations</h2>
              {reservations.length === 0 ? (
                <p className="text-gray-600">Aucune réservation pour le moment</p>
              ) : (
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="border rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{reservation.boat.title}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            reservation.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : reservation.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {reservation.status === 'confirmed'
                            ? 'Confirmée'
                            : reservation.status === 'pending'
                            ? 'En attente'
                            : 'Annulée'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <Calendar className="inline h-4 w-4 mr-2" />
                          Du {new Date(reservation.start_date).toLocaleDateString()} au{' '}
                          {new Date(reservation.end_date).toLocaleDateString()}
                        </p>
                        <p className="font-semibold text-cyan-600">
                          Total: {reservation.total_price}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Informations du compte</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Type de compte</p>
                  <p className="font-medium capitalize">
                    {profile.role === 'owner'
                      ? 'Propriétaire'
                      : profile.role === 'renter'
                      ? 'Locataire'
                      : 'Administrateur'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Membre depuis</p>
                  <p className="font-medium">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                <FileText className="inline h-5 w-5 mr-2" />
                Documents
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Ajoutez vos documents pour faciliter vos réservations
              </p>
              <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-cyan-500 hover:text-cyan-600 transition">
                Ajouter un document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
