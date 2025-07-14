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
  const [profileImageUrl] = useState('https://zuctusbetucsmsywshyk.supabase.co/storage/v1/object/public/imgurl/w6sd1j_1752533368991.jpg'); // Replace with your image URL

  // Smooth scroll function
  const smoothScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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

    // Handle initial hash if present
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => smoothScrollTo(id), 100);
    }
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
            {/* Round Profile Image */}
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
                  e.target.src = 'https://via.placeholder.com/256';
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
                <Button 
                  className="btn-secondary text-lg px-8 py-4"
                  onClick={() => smoothScrollTo('available-cars')}
                >
                  <Search className="mr-2 h-5 w-5" />
                  Browse Cars
                </Button>
                <Link to="/contact">
                  <Button variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Decoy Auction Cars?</h2>
              <p className="text-xl text-gray-600">Experience the finest in automotive excellence</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Car,
                  title: "Premium Selection",
                  description: "Carefully curated collection of luxury and classic vehicles"
                },
                {
                  icon: DollarSign,
                  title: "Competitive Pricing",
                  description: "Fair market prices with transparent auction process"
                },
                {
                  icon: Star,
                  title: "Quality Assured",
                  description: "Every vehicle thoroughly inspected and verified"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cars Section */}
        <section 
          id="available-cars" 
          className="py-16 bg-gradient-to-br from-blue-50 to-white scroll-mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Available Cars</h2>
              <p className="text-xl text-gray-600">Browse our current collection</p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
              </div>
            ) : cars.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Car className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Cars Available</h3>
                <p className="text-gray-500">Check back soon for new arrivals!</p>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {cars.map((car) => (
                  <motion.div
                    key={car.id}
                    variants={itemVariants}
                    className="car-card overflow-hidden"
                  >
                    <div className="relative group">
                      <img
                        src={car.image_url}
                        alt={car.name}
                        className="w-full h-64 object-cover cursor-pointer"
                        onClick={() => setLightboxImage(car.image_url)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                        <Search className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ${parseFloat(car.price).toLocaleString()}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{car.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{car.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-blue-600">
                          ${parseFloat(car.price).toLocaleString()}
                        </span>
                        <div className="flex gap-2">
                          <Link to={`/car/${car.id}`}>
                            <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
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
