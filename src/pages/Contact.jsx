import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Mail, Phone, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Decoy Auction Cars</title>
        <meta name="description" content="Get in touch with Decoy Auction Cars. Contact us for inquiries about our premium car auctions and services." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        {/* Hero Section */}
        <section className="hero-section py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Contact
                <span className="block bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                  Us
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Get in touch with our team for any inquiries about our premium car auctions
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-xl text-gray-600">We're here to help with all your auction needs</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  info: "osahara.sss@gmail.com",
                  description: "Send us your inquiries"
                },
                {
                  icon: Phone,
                  title: "Phone",
                  info: "+1 (279) 758-5245",
                  description: "WhatsApp us directly"
                },
                {
                  icon: Clock,
                  title: "Hours",
                  info: "Contact details will be added here",
                  description: "Our working hours"
                }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <contact.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{contact.title}</h3>
                  <p className="text-blue-600 font-medium mb-2">{contact.info}</p>
                  <p className="text-gray-600 text-sm">{contact.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Placeholder */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-xl text-gray-600 mb-8">Contact form will be available soon</p>
              
              <div className="bg-gradient-to-br from-blue-50 to-white p-12 rounded-2xl shadow-lg">
                <Mail className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Contact Form Coming Soon</h3>
                <p className="text-gray-600 mb-6">
                  We're working on a comprehensive contact form to make it easier for you to reach us. 
                  In the meantime, please use the contact information above.
                </p>
                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block">
                  <span className="font-semibold">For immediate assistance, email us directly</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;