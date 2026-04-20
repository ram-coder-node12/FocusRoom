import { useState, useEffect, useCallback, useRef } from 'react';

export const useTimer = (focusMinutes = 25, breakMinutes = 5, onSessionComplete) => {
  const [mode, setMode] = useState('focus'); // 'focus' or 'break'
  const [timeLeft, setTimeLeft] = useState(focusMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  
  const focusMinutesRef = useRef(focusMinutes);
  const breakMinutesRef = useRef(breakMinutes);
  const onSessionCompleteRef = useRef(onSessionComplete);

  useEffect(() => {
    focusMinutesRef.current = focusMinutes;
    breakMinutesRef.current = breakMinutes;
  }, [focusMinutes, breakMinutes]);

  useEffect(() => {
    onSessionCompleteRef.current = onSessionComplete;
  }, [onSessionComplete]);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      clearInterval(interval);
      
      const sessionDuration = mode === 'focus' ? focusMinutesRef.current : breakMinutesRef.current;
      if (onSessionCompleteRef.current) {
        onSessionCompleteRef.current(mode, sessionDuration);
      }

      // Auto-switch mode
      const nextMode = mode === 'focus' ? 'break' : 'focus';
      setMode(nextMode);
      setTimeLeft(nextMode === 'focus' ? focusMinutesRef.current * 60 : breakMinutesRef.current * 60);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const toggle = useCallback(() => setIsRunning(!isRunning), [isRunning]);
  
  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? focusMinutesRef.current * 60 : breakMinutesRef.current * 60);
  }, [mode]);

  const skip = useCallback(() => {
    setIsRunning(false);
    const nextMode = mode === 'focus' ? 'break' : 'focus';
    setMode(nextMode);
    setTimeLeft(nextMode === 'focus' ? focusMinutesRef.current * 60 : breakMinutesRef.current * 60);
  }, [mode]);

  return { mode, timeLeft, isRunning, toggle, reset, skip };
};
