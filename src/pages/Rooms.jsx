import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRooms, createRoom } from '../services/roomService';
import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Spinner } from '../components/ui/Spinner';
import { Users, Clock } from 'lucide-react';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await getRooms();
      setRooms(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoom = async () => {
    if (isCreating) return;
    try {
      setIsCreating(true);
      const roomId = await createRoom({
        name: `${currentUser.displayName}'s Room`,
        description: 'Deep work session',
        focusDuration: 25,
        breakDuration: 5
      }, currentUser.uid);
      navigate(`/room/${roomId}`);
    } catch (err) {
      console.error('Failed to create room', err);
      setIsCreating(false);
    }
  };

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
          <h1 className="text-3xl font-bold">Study Rooms</h1>
          <p className="text-text-secondary">Join an active room or create your own</p>
        </div>
        <Button onClick={handleCreateRoom} disabled={isCreating}>
          {isCreating ? 'Creating...' : 'Create Room'}
        </Button>
      </div>

      {rooms.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-secondary text-lg mb-4">No active rooms found.</p>
          <Button onClick={handleCreateRoom}>Be the first to create one</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map(room => (
            <Card key={room.id} className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold truncate max-w-[80%]">{room.name}</h3>
                <Badge variant={room.isActive ? 'success' : 'default'}>
                  {room.isActive ? 'Active' : 'Closed'}
                </Badge>
              </div>
              <p className="text-sm text-text-secondary mb-6 flex-1">{room.description}</p>
              
              <div className="flex items-center justify-between text-sm text-text-secondary mb-4 border-t border-border pt-4">
                <div className="flex items-center gap-1.5">
                  <Users size={16} />
                  <span>{room.participants?.length || 0}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} />
                  <span>{room.focusDuration}m focus</span>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                variant="secondary"
                onClick={() => navigate(`/room/${room.id}`)}
              >
                Join Room
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
