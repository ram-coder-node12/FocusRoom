import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function Landing() {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-blue">FocusRoom</h1>
      <p className="text-xl md:text-2xl text-text-secondary mb-10 max-w-2xl">
        A virtual study room where students can focus together, track sessions, and collaborate in real-time.
      </p>
      <div className="flex gap-4">
        <Link to="/login">
          <Button variant="secondary" size="lg">Login</Button>
        </Link>
        <Link to="/signup">
          <Button variant="primary" size="lg">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
