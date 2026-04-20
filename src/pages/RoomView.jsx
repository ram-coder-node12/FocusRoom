import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';
import { useTimer } from '../hooks/useTimer';
import { useChat } from '../hooks/useChat';
import { useSessions } from '../hooks/useSessions';
import { useAuth } from '../hooks/useAuth';
import { PomodoroTimer } from '../components/timer/PomodoroTimer';
import { ChatWindow } from '../components/chat/ChatWindow';
import { ParticipantList } from '../components/participants/ParticipantList';
import { Spinner } from '../components/ui/Spinner';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function RoomView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { join, leave, currentRoom } = useRoom();
  const { messages, sendMessage } = useChat(id);
  const { logSession } = useSessions(currentUser?.uid);

  const [joining, setJoining] = useState(true);

  useEffect(() => {
    const setupRoom = async () => {
      try {
        setJoining(true);
        await join(id);
      } catch (err) {
        console.error('Failed to join room', err);
      } finally {
        setJoining(false);
      }
    };
    setupRoom();

    return () => {
      leave();
    };
  }, [id]);

  const handleSessionComplete = (mode, duration) => {
    if (mode === 'focus') {
      logSession({
        roomId: id,
        roomName: currentRoom?.name || 'Unknown Room',
        duration,
        type: 'focus'
      });
    }
  };

  const timerControls = useTimer(
    currentRoom?.focusDuration || 25, 
    currentRoom?.breakDuration || 5, 
    handleSessionComplete
  );

  if (joining || !currentRoom) {
    return (
      <div className="flex h-screen items-center justify-center bg-primary">
        <div className="text-center">
          <Spinner className="mb-4" />
          <p className="text-text-secondary">Joining room...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col -m-4 md:-m-8">
      {/* Room Header */}
      <div className="bg-surface border-b border-border p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/rooms')}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{currentRoom.name}</h1>
            <p className="text-xs text-text-secondary">{currentRoom.description}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-4 bg-primary">
        {/* Left: Participants */}
        <div className="hidden lg:block border-r border-border bg-surface overflow-y-auto">
          <ParticipantList participants={currentRoom.participants || []} />
        </div>

        {/* Center: Timer */}
        <div className="lg:col-span-2 p-6 flex flex-col items-center justify-center overflow-y-auto min-h-[400px]">
          <PomodoroTimer {...timerControls} />
        </div>

        {/* Right: Chat */}
        <div className="border-l border-border bg-surface flex flex-col h-full lg:h-auto border-t lg:border-t-0">
          <ChatWindow 
            messages={messages} 
            onSendMessage={(text) => sendMessage({
              text,
              senderId: currentUser.uid,
              senderName: currentUser.displayName,
              senderPhoto: currentUser.photoURL
            })} 
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}
