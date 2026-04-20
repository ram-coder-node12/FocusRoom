import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Avatar } from '../ui/Avatar';

export const ChatWindow = ({ messages, onSendMessage, currentUser }) => {
  const [text, setText] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text.trim());
      setText('');
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-surface border-border">
      <div className="p-4 border-b border-border bg-surface shrink-0">
        <h2 className="font-semibold">Room Chat</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const isOwn = msg.senderId === currentUser.uid;
          const showAvatar = index === 0 || messages[index - 1].senderId !== msg.senderId;

          return (
            <div key={msg.id || index} className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
              {!isOwn && (
                <div className="w-8 shrink-0">
                  {showAvatar && <Avatar size="sm" src={msg.senderPhoto} fallback={msg.senderName?.charAt(0)} />}
                </div>
              )}
              
              <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[75%]`}>
                {!isOwn && showAvatar && (
                  <span className="text-xs text-text-secondary ml-1 mb-1">{msg.senderName}</span>
                )}
                <div className={`px-4 py-2 rounded-2xl ${isOwn ? 'bg-accent text-white rounded-br-sm' : 'bg-surface-elevated text-text-primary rounded-bl-sm'}`}>
                  <p className="text-sm break-words">{msg.text}</p>
                </div>
                <span className="text-[10px] text-text-secondary mt-1 px-1">
                  {formatTime(msg.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      <div className="p-3 bg-surface border-t border-border shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-surface-elevated border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-accent"
          />
          <button 
            type="submit" 
            disabled={!text.trim()}
            className="p-2 rounded-full bg-accent text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-hover transition-colors shrink-0"
          >
            <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
          </button>
        </form>
      </div>
    </div>
  );
};
