import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
export function Layout({
  children
}) {
  const {
    isAuthenticated
  } = useAuth();
  return <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex flex-1">
        {isAuthenticated && <Sidebar />}
        <motion.main className="flex-1" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.3
      }}>
          {children}
        </motion.main>
      </div>
      <Footer />
    </div>;
}