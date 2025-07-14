import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import AdminPanel from '@/pages/AdminPanel';
import Contact from '@/pages/Contact';
import CarDetails from '@/pages/CarDetails';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Lock } from 'lucide-react';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="text-center text-white">
          <Lock className="h-16 w-16 mx-auto mb-4 animate-pulse" />
          <h1 className="text-3xl font-bold">Securing Connection...</h1>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/car/:id" element={<CarDetails />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;