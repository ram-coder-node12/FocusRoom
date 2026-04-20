import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signUp, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signUp(email, password, name);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Google sign in failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-primary">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-blue mb-2">Create Account</h1>
          <p className="text-text-secondary">Join FocusRoom today</p>
        </div>
        
        {error && <div className="p-3 mb-4 bg-danger/10 border border-danger/20 text-danger rounded-lg text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Name" 
            type="text" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input 
            label="Email" 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            label="Password" 
            type="password" 
            required 
            minLength="6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Sign Up'}
          </Button>
        </form>
        
        <div className="mt-6 flex items-center justify-between">
          <hr className="flex-1 border-border" />
          <span className="px-3 text-sm text-text-secondary">OR</span>
          <hr className="flex-1 border-border" />
        </div>
        
        <div className="mt-6">
          <Button variant="secondary" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
            Sign in with Google
          </Button>
        </div>
        
        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account? <Link to="/login" className="text-accent hover:underline">Log in</Link>
        </p>
      </Card>
    </div>
  );
}
