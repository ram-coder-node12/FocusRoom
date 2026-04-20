import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, getDoc, increment, serverTimestamp } from 'firebase/firestore';

export const logSession = async (userId, sessionData) => {
  const sessionsRef = collection(db, 'sessions');
  await addDoc(sessionsRef, {
    ...sessionData,
    userId,
    completedAt: serverTimestamp()
  });

  // Update user's total focus minutes
  if (sessionData.type === 'focus' && sessionData.duration) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      totalFocusMinutes: increment(sessionData.duration)
    });
  }
};

export const getUserSessions = async (userId) => {
  const sessionsRef = collection(db, 'sessions');
  const q = query(sessionsRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getUserStats = async (userId) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  const totalFocusMinutes = userSnap.exists() ? (userSnap.data().totalFocusMinutes || 0) : 0;
  
  const sessions = await getUserSessions(userId);
  const focusSessions = sessions.filter(s => s.type === 'focus');
  
  return {
    totalFocusMinutes,
    sessionsCompleted: focusSessions.length,
    joinedRooms: 0
  };
};
