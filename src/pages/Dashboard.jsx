import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSessions } from '../hooks/useSessions';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Clock, CheckCircle, Plus } from 'lucide-react';
import { Spinner } from '../components/ui/Spinner';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { stats, loading } = useSessions(currentUser?.uid);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary">Welcome back, {currentUser?.displayName}</p>
        </div>
        <Link to="/rooms">
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            Join Room
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-accent-blue mb-2">
            <Clock size={24} />
            <h3 className="font-semibold text-text-secondary">Focus Time</h3>
          </div>
          <p className="text-4xl font-bold text-text-primary">
            {stats?.totalFocusMinutes || 0}
            <span className="text-lg text-text-secondary ml-1 mt-auto">min</span>
          </p>
        </Card>
        
        <Card className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-success mb-2">
            <CheckCircle size={24} />
            <h3 className="font-semibold text-text-secondary">Sessions Done</h3>
          </div>
          <p className="text-4xl font-bold text-text-primary">
            {stats?.sessionsCompleted || 0}
          </p>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {(!stats || stats.sessionsCompleted === 0) ? (
          <Card className="text-center py-10">
            <p className="text-text-secondary mb-4">No focus sessions yet.</p>
            <Link to="/rooms">
              <Button>Find a Room to Start</Button>
            </Link>
          </Card>
        ) : (
          <Card>
            <p className="text-text-secondary">Your session history will appear here.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
