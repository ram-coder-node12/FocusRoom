import { useContext } from 'react';
import { RoomContext } from '../context/RoomContext';

export const useRoom = () => {
  return useContext(RoomContext);
};
