import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export const AppShell = () => {
  return (
    <div className="min-h-screen bg-hero-pattern relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob pointer-events-none"></div>
      <div className="fixed top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full mix-blend-screen filter blur-[120px] animate-blob pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="fixed bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-indigo-600/10 rounded-full mix-blend-screen filter blur-[150px] animate-blob pointer-events-none" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 flex">
        <Sidebar className="hidden md:flex" />
        <div className="md:pl-64 flex flex-col w-full min-h-screen">
          <Navbar toggleSidebar={() => {}} />
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
