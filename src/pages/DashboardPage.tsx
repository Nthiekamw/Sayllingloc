import { useAuth } from '../contexts/AuthContext';
import { AdminDashboard } from '../components/dashboards/AdminDashboard';
import { OwnerDashboard } from '../components/dashboards/OwnerDashboard';
import { RenterDashboard } from '../components/dashboards/RenterDashboard';

interface DashboardPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  if (!profile) {
    onNavigate('login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {profile.role === 'admin' && <AdminDashboard onNavigate={onNavigate} />}
      {(profile.role === 'owner' || profile.role === 'renter') && (
        <OwnerDashboard onNavigate={onNavigate} />
      )}
    </div>
  );
}
