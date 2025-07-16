import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Mail, Phone, Clock, Check, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Create beautifully formatted email
      const subject = `New Contact from ${formData.name} - Decoy Auction Cars`;
      const body = `
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
              New Contact Message
            </h2>
            
            <div style="margin-bottom: 15px;">
              <h3 style="margin: 0 0 5px 0; color: #2563eb; font-size: 18px;">Contact Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 5px 0; width: 100px; font-weight: bold;">Name:</td>
                  <td style="padding: 5px 0;">${formData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 5px 0;">
                    <a href="mailto:${formData.email}" style="color: #2563eb; text-decoration: none;">
                      ${formData.email}
                    </a>
                  </td>
                </tr>
                ${formData.phone ? `
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Phone:</td>
                  <td style="padding: 5px 0;">
                    <a href="tel:${formData.phone.replace(/[^0-9+]/g, '')}" style="color: #2563eb; text-decoration: none;">
                      ${formData.phone}
                    </a>
                  </td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <div style="margin-top: 20px;">
              <h3 style="margin: 0 0 5px 0; color: #2563eb; font-size: 18px;">Message</h3>
              <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #2563eb;">
                ${formData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 25px; font-size: 12px; color: #6b7280; text-align: center;">
              <p>This message was sent from the Decoy Auction Cars contact form</p>
            </div>
          </div>
        </body>
        </html>
      `.replace(/\n\s+/g, '\n'); // Remove extra whitespace

      // Encode the HTML for mailto
      const encodedBody = encodeURIComponent(body);
      
      // Open email client with formatted message
      window.location.href = `mailto:osahara.sss@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodedBody}`;
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error preparing email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  description: "Send us your inquiries",
                  action: () => window.location.href = "mailto:osahara.sss@gmail.com"
                },
                {
                  icon: Phone,
                  title: "Phone",
                  info: "+1 (279) 758-5245",
                  description: "WhatsApp us directly",
                  action: () => window.location.href = "tel:+12797585245"
                },
                {
                  icon: Clock,
                  title: "Hours",
                  info: "We're open 24/7 so you can reach out anytime",
                  description: "Our working hours"
                }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center cursor-pointer"
                  onClick={contact.action}
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

        {/* Contact Form */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-xl text-gray-600">Fill out the form below to email us directly</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-white p-8 md:p-12 rounded-2xl shadow-lg"
            >
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Message Ready to Send!</h3>
                  <p className="text-gray-600 mb-6">
                    Your email client should open with a beautifully formatted message. 
                    Just click send to complete the process.
                  </p>
                  <button
                    onClick={() => setSubmitStatus(null)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitStatus === 'error' && (
                    <div className="flex items-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                      <AlertCircle className="flex-shrink-0 inline w-5 h-5 mr-3" />
                      <span className="sr-only">Error</span>
                      <div>
                        <span className="font-medium">Something went wrong!</span> Please try again or email us directly at osahara.sss@gmail.com
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-2`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-2`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+1 (123) 456-7890"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-2`}
                      placeholder="Your message here..."
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Preparing Email...
                        </>
                      ) : 'Send Beautifully Formatted Email'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
