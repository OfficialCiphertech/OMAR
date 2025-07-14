
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Phone, DollarSign, Calendar, MapPin, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import OrderModal from '@/components/OrderModal';
import { supabase } from '@/lib/customSupabaseClient';
import ImageLightbox from '@/components/ImageLightbox';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        toast({
          title: "Error fetching car details",
          description: error?.message || "Car not found.",
          variant: "destructive",
        });
        navigate('/');
      } else {
        setCar(data);
      }
      setLoading(false);
    };

    fetchCar();
  }, [id, navigate]);

  const handleOrder = async (orderData) => {
    const { error } = await supabase.from('orders').insert([
      { car_id: car.id, phone_number: orderData.phoneNumber }
    ]);

    if (error) {
      toast({
        title: "Order Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Order Submitted!",
        description: `Your order for ${car.name} has been received. Our team will contact you at ${orderData.phoneNumber} shortly.`,
        variant: "success",
      });
      setShowOrderModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Car Not Found</h2>
          <Button onClick={() => navigate('/')} className="btn-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{car.name} - Decoy Auction Cars</title>
        <meta name="description" content={`${car.name} available for auction at $${parseFloat(car.price).toLocaleString()}. ${car.description}`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="mb-6 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cars
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Car Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="bg-white rounded-2xl shadow-2xl overflow-hidden relative group cursor-pointer"
                onClick={() => setLightboxImage(car.image_url)}
              >
                <img
                  src={car.image_url}
                  alt={car.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <Search className="h-16 w-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </motion.div>

            {/* Car Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{car.name}</h1>
                 {car.country && (
                  <div className="flex items-center text-xl text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{car.country}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-3xl font-bold text-blue-600 mb-6">
                  <DollarSign className="h-8 w-8" />
                  <span>{parseFloat(car.price).toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{car.description}</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Car Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Listed Recently</span>
                  </div>
                   {car.country && (
                    <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <span className="text-gray-700">From {car.country}</span>
                    </div>
                   )}
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => setShowOrderModal(true)}
                  className="btn-primary w-full text-lg py-4"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Order Now
                </Button>
                
                <p className="text-sm text-gray-600 text-center">
                  Your order will be sent directly to our sales team.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {showOrderModal && (
          <OrderModal
            car={car}
            onSubmit={handleOrder}
            onClose={() => setShowOrderModal(false)}
          />
        )}
      </div>
       {lightboxImage && (
        <ImageLightbox imageUrl={lightboxImage} onClose={() => setLightboxImage(null)} />
      )}
    </>
  );
};

export default CarDetails;
