import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, BellIcon, MenuIcon, XIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from './Avatar';
import { Button } from './ui/Button';


export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const fullName = user ? `${user.prenom} ${user.nom}` : '';
  const photo = user?.photoProfil || 'https://via.placeholder.com/40';

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Plan'It</span>
          </Link>

          {/* Search - hide on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher une activité, un groupe..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/activities" className="px-3 py-2 text-gray-600 hover:text-primary">
              Activités
            </Link>
            <Link to="/Chat" className="px-3 py-2 text-gray-600 hover:text-primary">
              Chat
            </Link>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    className="p-1 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                  </button>
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <h3 className="text-sm font-medium">Notifications</h3>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {user?.notifications?.length > 0 ? (
                            user.notifications.map((notif, i) => (
                              <div key={i} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                                <p className="text-sm">{notif.message}</p>
                                <p className="text-xs text-gray-500">{notif.date}</p>
                              </div>
                            ))
                          ) : (
                            <p className="px-4 py-3 text-sm text-gray-500">Aucune notification</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* User Menu */}
                <div className="relative ml-3">
                  <button
                    className="flex items-center space-x-2 focus:outline-none"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <Avatar src={photo} alt={fullName} size="sm" status="online" />
                    <span className="hidden lg:block text-sm font-medium">{fullName}</span>
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100"
                      >
                        <Link
                          to={`/profile/${user.idUtilisateur}`} 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Mon profil
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Paramètres
                        </Link>

                        {/* Affiche le Dashboard si c’est un organisateur */}
                        {user.typeUtilisateur === 'organisateur' && (
                          <Link
                            to="/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            Tableau de bord
                          </Link>
                        )}

                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={logout}
                        >
                          Se déconnecter
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    S'inscrire
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/activities"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Activités
              </Link>
              <Link
                to="/Chat"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Chat
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to={`/profile/${user.idUtilisateur}`} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                      Mon profil
                  </Link>
                  {user.typeUtilisateur === 'organisateur' && (
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      Tableau de bord
                    </Link>
                  )}
                  <button
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                    onClick={logout}
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-3 py-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Connexion
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="primary" size="sm">
                      S'inscrire
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
