import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export const AppShell = () => {
  return (
    <div className="min-h-screen bg-primary">
      <Sidebar />
      <div className="md:pl-64 flex flex-col min-h-screen">
        <Navbar toggleSidebar={() => {}} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
