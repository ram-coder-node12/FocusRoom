import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { Button } from '../ui/Button';

export const PomodoroTimer = ({ mode, timeLeft, isRunning, toggle, reset, skip }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isFocus = mode === 'focus';
  const progressRatio = isFocus ? ((25 * 60) - timeLeft) / (25 * 60) : ((5 * 60) - timeLeft) / (5 * 60);
  const strokeDashoffset = 880 - (880 * progressRatio);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-md">
      <div className="flex gap-2 p-1 bg-surface-elevated rounded-lg">
        <button 
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${isFocus ? 'bg-accent text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
        >
          Focus
        </button>
        <button 
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${!isFocus ? 'bg-warning text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
        >
          Break
        </button>
      </div>

      <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="140" className="stroke-surface-elevated" strokeWidth="8" fill="none" />
          <circle 
            cx="150" cy="150" r="140" 
            className={`${isFocus ? 'stroke-accent' : 'stroke-warning'} transition-all duration-1000 ease-linear`}
            strokeWidth="8" fill="none"
            strokeLinecap="round"
            strokeDasharray="880"
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-6xl md:text-7xl font-bold font-mono tracking-tight text-text-primary">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="secondary" size="lg" onClick={reset} className="!w-14 !h-14 !p-0 rounded-full flex items-center justify-center">
          <RotateCcw size={24} />
        </Button>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={toggle}
          className={`!w-20 !h-20 !p-0 rounded-full flex items-center justify-center ${!isFocus ? 'bg-warning hover:bg-yellow-600 border-none' : ''}`}
        >
          {isRunning ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
        </Button>
        <Button variant="secondary" size="lg" onClick={skip} className="!w-14 !h-14 !p-0 rounded-full flex items-center justify-center">
          <SkipForward size={24} />
        </Button>
      </div>
    </div>
  );
};
