import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Activities from './pages/Activities';
import ActivityDetail from './pages/ActivityDetail';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import NewActivity from './pages/NewActivity';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EditProfile from './pages/EditProfile';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/activities/:idActivite" element={<ActivityDetail />} />

            {/* Profile routes */}
            <Route path="/profile/me" element={<Profile />} /> {/* current user */}
            <Route path="/profile/:idUtilisateur" element={<Profile />} /> {/* other users */}
            <Route path="/profile/:idUtilisateur/edit" element={<EditProfile />} />

            <Route path="/chat" element={<Chat />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/newActivity" element={<NewActivity />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
