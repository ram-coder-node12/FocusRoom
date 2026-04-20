import { Users } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

export const ParticipantList = ({ participants }) => {
  return (
    <div className="h-full flex flex-col bg-surface border-border">
      <div className="p-4 border-b border-border flex items-center gap-2 shrink-0">
        <Users size={18} className="text-text-secondary" />
        <h2 className="font-semibold text-sm uppercase tracking-wider text-text-secondary">Participants ({participants.length})</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {participants.map((uid, index) => (
          <div key={uid} className="flex items-center gap-3">
            <Avatar size="sm" fallback={`P${index+1}`} />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-text-primary truncate">User {uid.substring(0,4)}</p>
            </div>
            <Badge variant="success">Online</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
