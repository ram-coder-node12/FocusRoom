import { db } from './firebase';
import { 
  collection, doc, setDoc, getDocs, 
  updateDoc, onSnapshot, arrayUnion, arrayRemove, serverTimestamp 
} from 'firebase/firestore';

export const createRoom = async (roomData, userId) => {
  const newRoomRef = doc(collection(db, 'rooms'));
  const room = {
    ...roomData,
    createdBy: userId,
    createdAt: serverTimestamp(),
    participants: [userId],
    isActive: true
  };
  await setDoc(newRoomRef, room);
  return newRoomRef.id;
};

export const getRooms = async () => {
  const roomsCol = collection(db, 'rooms');
  const snapshot = await getDocs(roomsCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const joinRoom = async (roomId, userId) => {
  const roomRef = doc(db, 'rooms', roomId);
  await updateDoc(roomRef, {
    participants: arrayUnion(userId)
  });
};

export const leaveRoom = async (roomId, userId) => {
  const roomRef = doc(db, 'rooms', roomId);
  await updateDoc(roomRef, {
    participants: arrayRemove(userId)
  });
};

export const subscribeToRoom = (roomId, callback) => {
  const roomRef = doc(db, 'rooms', roomId);
  return onSnapshot(roomRef, (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() });
    } else {
      callback(null);
    }
  });
};
