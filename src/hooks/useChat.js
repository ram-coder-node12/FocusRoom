import { useState, useEffect } from 'react';
import { subscribeToMessages, sendMessage as sendMsg } from '../services/chatService';

export const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    if (!roomId) return;
    
    const unsubscribe = subscribeToMessages(roomId, (newMessages) => {
      setMessages(newMessages);
    });
    
    return () => unsubscribe();
  }, [roomId]);
  
  const sendMessage = async (messageData) => {
    if (!roomId) return;
    await sendMsg(roomId, messageData);
  };
  
  return { messages, sendMessage };
};
