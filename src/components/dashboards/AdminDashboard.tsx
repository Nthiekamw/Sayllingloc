import { useState, useEffect } from 'react';
import { Users, Anchor, MessageSquare, TrendingUp, Trash2, Shield } from 'lucide-react';
import { supabase, Profile, Boat } from '../../lib/supabase';

interface AdminDashboardProps {
  onNavigate?: (page: string, id?: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    users: 0,
    boats: 0,
    reservations: 0,
    reviews: 0,
  });
  const [users, setUsers] = useState<Profile[]>([]);
  const [boats, setBoats] = useState<Boat[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'boats'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [usersRes, boatsRes, reservationsRes, reviewsRes] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact' }),
        supabase.from('boats').select('*, owner:profiles(full_name)', { count: 'exact' }),
        supabase.from('reservations').select('*', { count: 'exact' }),
        supabase.from('reviews').select('*', { count: 'exact' }),
      ]);

      setStats({
        users: usersRes.count || 0,
        boats: boatsRes.count || 0,
        reservations: reservationsRes.count || 0,
        reviews: reviewsRes.count || 0,
      });

      setUsers(usersRes.data || []);
      setBoats(boatsRes.data || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

    try {
      const { error } = await supabase.from('profiles').delete().eq('id', userId);
      if (error) throw error;
      await loadDashboardData();
      alert('Utilisateur supprimé avec succès');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const deleteBoat = async (boatId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce bateau ?')) return;

    try {
      const { error } = await supabase.from('boats').delete().eq('id', boatId);
      if (error) throw error;
      await loadDashboardData();
      alert('Bateau supprimé avec succès');
    } catch (error) {
      console.error('Error deleting boat:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'owner' | 'renter') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;
      await loadDashboardData();
      alert('Rôle mis à jour avec succès');
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Shield className="h-8 w-8 text-cyan-600" />
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord Admin</h1>
        </div>
        <p className="text-gray-600">Gérez l'ensemble de la plateforme SailingLoc</p>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-8 w-8 text-cyan-600" />
                <span className="text-3xl font-bold text-gray-900">{stats.users}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Utilisateurs</h3>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Anchor className="h-8 w-8 text-cyan-600" />
                <span className="text-3xl font-bold text-gray-900">{stats.boats}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Bateaux</h3>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-8 w-8 text-cyan-600" />
                <span className="text-3xl font-bold text-gray-900">{stats.reservations}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Réservations</h3>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <MessageSquare className="h-8 w-8 text-cyan-600" />
                <span className="text-3xl font-bold text-gray-900">{stats.reviews}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Avis</h3>
            </div>
          </div>
        </>
      )}

      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-cyan-600 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-cyan-600 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Utilisateurs
            </button>
            <button
              onClick={() => setActiveTab('boats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'boats'
                  ? 'border-cyan-600 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Bateaux
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'users' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Gestion des utilisateurs</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rôle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {user.full_name || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={user.role}
                            onChange={(e) =>
                              updateUserRole(user.id, e.target.value as any)
                            }
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="renter">Locataire</option>
                            <option value="owner">Propriétaire</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'boats' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Gestion des bateaux</h2>
              <div className="grid gap-4">
                {boats.map((boat) => (
                  <div
                    key={boat.id}
                    className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">{boat.title}</h3>
                      <p className="text-sm text-gray-600">
                        Propriétaire: {boat.owner?.full_name || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {boat.type === 'sailboat' ? 'Voilier' : 'Moteur'} • {boat.price_per_day}
                        €/jour
                      </p>
                    </div>
                    <button
                      onClick={() => deleteBoat(boat.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
