import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Car, DollarSign, Eye, Star, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import ImageLightbox from '@/components/ImageLightbox';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  // Add your image URL here or fetch it from somewhere
  const [profileImageUrl, setProfileImageUrl] = useState('https://example.com/your-image.jpg');

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching cars",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setCars(data);
      }
      setLoading(false);
    };

    fetchCars();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Decoy Auction Cars - Premium Car Auctions</title>
        <meta name="description" content="Discover premium cars at Decoy Auction Cars. Browse our exclusive collection of luxury and classic vehicles available for auction." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="hero-section py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Round Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl mb-8 md:mb-0"
            >
              <img 
                src={profileImageUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/256'; // Fallback image
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Premium Car
                <span className="block bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                  Auctions
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto md:mx-0">
                Discover exceptional vehicles from our curated collection of luxury and classic cars
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#available-cars">
                  <Button className="btn-secondary text-lg px-8 py-4">
                    <Search className="mr-2 h-5 w-5" />
                    Browse Cars
                  </Button>
                </a>
                <Link to="/contact">
                  <Button variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Rest of your existing code remains the same */}
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* ... existing features section code ... */}
          </div>
        </section>

        {/* Cars Section */}
        <section id="available-cars" className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* ... existing cars section code ... */}
          </div>
        </section>
      </div>
      {lightboxImage && (
        <ImageLightbox imageUrl={lightboxImage} onClose={() => setLightboxImage(null)} />
      )}
    </>
  );
};

export default Home;
