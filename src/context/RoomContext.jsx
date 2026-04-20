import React, { createContext, useState, useEffect } from 'react';
import { subscribeToRoom, joinRoom, leaveRoom } from '../services/roomService';
import { useAuth } from '../hooks/useAuth';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState(null);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!activeRoomId) {
      setCurrentRoom(null);
      return;
    }

    const unsubscribe = subscribeToRoom(activeRoomId, (roomData) => {
      if (roomData) {
        setCurrentRoom(roomData);
      } else {
        setCurrentRoom(null);
        setActiveRoomId(null);
      }
    });

    return () => unsubscribe();
  }, [activeRoomId]);

  const join = async (roomId) => {
    if (currentUser) {
      await joinRoom(roomId, currentUser.uid);
      setActiveRoomId(roomId);
    }
  };

  const leave = async () => {
    if (activeRoomId && currentUser) {
      await leaveRoom(activeRoomId, currentUser.uid);
      setActiveRoomId(null);
    }
  };

  const value = {
    currentRoom,
    activeRoomId,
    join,
    leave
  };

  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  );
};
