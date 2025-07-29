import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RefundForm from '../components/RefundForm';
import Header from '../components/Header';
import ProcessingInfo from '../components/ProcessingInfo';

const RefundRequestPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (formData) => {
    console.log('Refund request submitted:', formData);
    console.log('Sending email to info@stargazevacations.com with form details');
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your refund request has been successfully submitted. You'll receive a confirmation email shortly from StarGaze Vacations.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Another Request
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Refund Request</h1>
            <p className="text-blue-100">
              We're here to help process your refund request quickly and efficiently
            </p>
          </div>
          
          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RefundForm onSubmit={handleFormSubmit} />
              </div>
              <div className="lg:col-span-1">
                <ProcessingInfo />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundRequestPage;