import { useState, useEffect } from 'react';
import { getUserSessions, getUserStats, logSession as logSess } from '../services/sessionService';

export const useSessions = (userId) => {
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSessionData = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const userSessions = await getUserSessions(userId);
      const userStats = await getUserStats(userId);
      setSessions(userSessions);
      setStats(userStats);
    } catch (error) {
      console.error('Error fetching sessions', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, [userId]);

  const logSession = async (sessionData) => {
    await logSess(userId, sessionData);
    await fetchSessionData(); 
  };

  return { sessions, stats, loading, logSession, refresh: fetchSessionData };
};
