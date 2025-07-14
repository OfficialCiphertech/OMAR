
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2, Car, Lock, Mail, LogIn, LogOut, Loader2, ShoppingCart, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import CarForm from '@/components/CarForm';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminPanel = () => {
  const { user, signIn, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cars, setCars] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const authorizedEmails = ['richvybs92@gmail.com', 'osahara.sss@gmail.com'];
  const isAuthorized = user && authorizedEmails.includes(user.email);

  const fetchCars = useCallback(async () => {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: "Error fetching cars", description: error.message, variant: "destructive" });
    } else {
      setCars(data);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        cars ( name, price )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: "Error fetching orders", description: error.message, variant: "destructive" });
    } else {
      setOrders(data);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (isAuthorized) {
        await Promise.all([fetchCars(), fetchOrders()]);
      }
      setLoading(false);
    };
    fetchData();

    if (isAuthorized) {
      const channel = supabase.channel('realtime-orders')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
          setOrders(currentOrders => [payload.new, ...currentOrders]);
          fetchOrders(); // re-fetch to get car details
          toast({ title: "New Order Received!", description: `An order has been placed.` });
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isAuthorized, fetchCars, fetchOrders]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome Admin!", description: "Successfully logged in." });
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast({ title: "Logged Out", description: "Successfully logged out from admin panel." });
  };

  const handleAddCar = async (carData) => {
    const { data, error } = await supabase.from('cars').insert([carData]).select();
    if (error) {
      toast({ title: "Error adding car", description: error.message, variant: "destructive" });
    } else {
      setCars([data[0], ...cars]);
      setShowForm(false);
      toast({ title: "Car Added!", description: "New car has been added to the auction.", variant: "success" });
    }
  };

  const handleEditCar = async (carData) => {
    const { data, error } = await supabase.from('cars').update(carData).eq('id', editingCar.id).select();
    if (error) {
      toast({ title: "Error updating car", description: error.message, variant: "destructive" });
    } else {
      setCars(cars.map(c => (c.id === editingCar.id ? data[0] : c)));
      setEditingCar(null);
      setShowForm(false);
      toast({ title: "Car Updated!", description: "Car details have been updated.", variant: "success" });
    }
  };

  const handleDeleteCar = async (carId) => {
    const { error } = await supabase.from('cars').delete().eq('id', carId);
    if (error) {
      toast({ title: "Error deleting car", description: error.message, variant: "destructive" });
    } else {
      setCars(cars.filter(c => c.id !== carId));
      toast({ title: "Car Deleted!", description: "Car has been removed from the auction.", variant: "success" });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <>
        <Helmet>
          <title>Admin Login - Decoy Auction Cars</title>
          <meta name="description" content="Admin login panel for Decoy Auction Cars management system." />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
          >
            <div className="text-center mb-8">
              <Lock className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Access</h1>
              <p className="text-gray-600">Enter your authorized credentials to continue</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field pl-10" placeholder="Enter your email" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field pl-10" placeholder="Enter your password" required />
                </div>
              </div>
              <Button type="submit" className="btn-primary w-full">
                <LogIn className="h-5 w-5 mr-2" />
                Access Admin Panel
              </Button>
            </form>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Panel - Decoy Auction Cars</title>
        <meta name="description" content="Manage car listings, orders, and auctions in the admin panel." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="admin-panel py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <p className="text-blue-100">Welcome back, {user.email}</p>
              </div>
              <Button onClick={handleLogout} variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="cars" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cars">Manage Cars</TabsTrigger>
              <TabsTrigger value="orders">View Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="cars">
              <div className="flex justify-between items-center mb-8 mt-4">
                <h2 className="text-2xl font-bold text-gray-900">Car Listings</h2>
                <Button onClick={() => { setShowForm(true); setEditingCar(null); }} className="btn-primary">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Car
                </Button>
              </div>
              {showForm && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                  <CarForm car={editingCar} onSubmit={editingCar ? handleEditCar : handleAddCar} onCancel={() => { setShowForm(false); setEditingCar(null); }} />
                </motion.div>
              )}
              {cars.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 bg-white rounded-xl shadow-lg">
                  <Car className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Cars Added</h3>
                  <p className="text-gray-500">Start by adding your first car to the auction!</p>
                </motion.div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cars.map((car) => (
                    <motion.div key={car.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <img src={car.image_url} alt={car.name} className="w-full h-48 object-cover" />
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{car.name}</h3>
                        {car.country && (
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{car.country}</span>
                          </div>
                        )}
                        <p className="text-gray-600 mb-4 line-clamp-2">{car.description}</p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-blue-600">${parseFloat(car.price).toLocaleString()}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => { setEditingCar(car); setShowForm(true); }} variant="outline" size="sm" className="flex-1"><Edit className="h-4 w-4 mr-1" />Edit</Button>
                          <Button onClick={() => handleDeleteCar(car.id)} variant="destructive" size="sm" className="flex-1"><Trash2 className="h-4 w-4 mr-1" />Delete</Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="orders">
               <h2 className="text-2xl font-bold text-gray-900 mb-8 mt-4">Customer Orders</h2>
               {orders.length === 0 ? (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 bg-white rounded-xl shadow-lg">
                    <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Orders Yet</h3>
                    <p className="text-gray-500">New orders will appear here as they come in.</p>
                 </motion.div>
               ) : (
                 <div className="space-y-4">
                   {orders.map(order => (
                     <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                       <div>
                         <p className="font-bold text-lg text-gray-800">{order.cars?.name || 'Car not found'}</p>
                         <p className="text-gray-600 flex items-center"><Phone className="h-4 w-4 mr-2" />{order.phone_number}</p>
                       </div>
                       <div className="text-right">
                         <p className="font-semibold text-blue-600">${order.cars ? parseFloat(order.cars.price).toLocaleString() : 'N/A'}</p>
                         <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleString()}</p>
                       </div>
                     </motion.div>
                   ))}
                 </div>
               )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;