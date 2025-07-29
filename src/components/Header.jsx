import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin } = FiIcons;

const Header = () => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-lg border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiMapPin} className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">StarGaze Vacations</h1>
              <p className="text-sm text-gray-500">Customer Service Portal</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
            <span>📞 1-844-782-7429</span>
            <span>✉️ info@stargazevacations.com</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;