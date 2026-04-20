import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../ui/Avatar';

export const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Rooms', path: '/rooms', icon: <Users size={20} /> }
  ];

  return (
    <aside className="w-64 hidden bg-surface border-r border-border md:flex flex-col h-screen fixed inset-y-0 left-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-blue">FocusRoom</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-accent/10 text-accent-blue' 
                  : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4">
          <Avatar 
            src={currentUser?.photoURL} 
            fallback={currentUser?.displayName?.charAt(0)?.toUpperCase()} 
          />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-text-primary truncate">{currentUser?.displayName}</p>
            <p className="text-xs text-text-secondary truncate">{currentUser?.email}</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="flex items-center w-full gap-2 px-4 py-2 text-sm text-danger hover:bg-danger/10 rounded-lg transition-colors"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
