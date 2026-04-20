import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function Landing() {
  return (
    <div className="min-h-screen bg-hero-pattern flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      
      {/* Abstract Animated Background */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-accent/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[40rem] h-[40rem] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-blob" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 glass-panel p-16 rounded-[3rem] border-white/20 max-w-4xl mx-auto flex flex-col items-center w-full shadow-[0_0_50px_rgba(139,92,246,0.15)]">
        <div className="inline-block px-5 py-2 mb-8 rounded-full glass-panel border-accent/40 text-accent-400 font-semibold text-sm tracking-widest uppercase text-accent">
          Revolutionize Your Focus
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-accent drop-shadow-lg">
          FocusRoom
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl font-light leading-relaxed">
          A premium virtual study environment where you can collaborate, track Pomodoro sessions, and achieve deep work.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:min-w-[180px]">Sign In</Button>
          </Link>
          <Link to="/signup" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:min-w-[180px]">Get Started <span className="ml-2">→</span></Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
