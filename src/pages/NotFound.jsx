import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-center">
      <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
      <p className="text-xl text-text-secondary mb-8">Page not found</p>
      <Link to="/dashboard">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
