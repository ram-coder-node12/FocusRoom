import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

export const sendMessage = async (roomId, messageData) => {
  const messagesRef = collection(db, 'rooms', roomId, 'messages');
  await addDoc(messagesRef, {
    ...messageData,
    createdAt: serverTimestamp()
  });
};

export const subscribeToMessages = (roomId, callback) => {
  const messagesRef = collection(db, 'rooms', roomId, 'messages');
  // Only fetching older messages first
  const q = query(messagesRef, orderBy('createdAt', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(messages);
  });
};
