import { Menu } from 'lucide-react';
export const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="md:hidden flex items-center justify-between p-4 bg-surface border-b border-border">
      <h1 className="text-xl font-bold text-accent">FocusRoom</h1>
      <button onClick={toggleSidebar} className="p-2 text-text-secondary">
        <Menu size={24} />
      </button>
    </header>
  );
};
