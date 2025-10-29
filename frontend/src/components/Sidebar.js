import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UsersIcon, CalendarIcon, MessageSquareIcon, HomeIcon, LayersIcon, PlusCircleIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Sidebar() {
  const location = useLocation();
  const links = [{
    name: 'Home',
    icon: <HomeIcon size={20} />,
    path: '/'
  }, {
    name: 'Activities',
    icon: <CalendarIcon size={20} />,
    path: '/activities'
  }, {
    name: 'Chat',
    icon: <MessageSquareIcon size={20} />,
    path: '/chat'
  }, {
    name: 'Dashboard',
    icon: <LayersIcon size={20} />,
    path: '/dashboard'
  }
];
   const { user } = useAuth();
  // Add Dashboard link if user is an organizer
  if (user.typeUtilisateur === 'organisateur') {
    links.push({ name: 'new activity', icon: <PlusCircleIcon  size={20} />, path: '/newActivity' });
  }
  return <aside className="hidden lg:block w-64 bg-white shadow-soft h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">Quick Access</h2>
      </div>
      <nav className="mt-2">
        {links.map(link => <Link key={link.path} to={link.path} className={`flex items-center px-6 py-3 text-gray-600 transition-colors ${location.pathname === link.path ? 'text-primary border-r-4 border-primary bg-green-50' : 'hover:bg-gray-50'}`}>
            <span className="mr-3">{link.icon}</span>
            <span>{link.name}</span>
          </Link>)}
      </nav>
    </aside>;
}