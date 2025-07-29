import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiClock, FiShield, FiMail, FiPhone } = FiIcons;

const ProcessingInfo = () => {
  const infoItems = [
    {
      icon: FiClock,
      title: 'Processing Time',
      description: 'Refunds typically take 5-30 business days depending on your selected method',
      color: 'blue'
    },
    {
      icon: FiShield,
      title: 'Secure Process',
      description: 'Your information is encrypted and handled with the highest security standards',
      color: 'green'
    },
    {
      icon: FiMail,
      title: 'Email Updates',
      description: 'You\'ll receive email notifications at each step of the refund process',
      color: 'purple'
    }
  ];

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Important Information</h3>
        
        <div className="space-y-4">
          {infoItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-start space-x-3"
            >
              <div className={`w-8 h-8 bg-${item.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                <SafeIcon icon={item.icon} className={`text-${item.color}-600 text-sm`} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                <p className="text-gray-600 text-xs mt-1">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Processing Timeline</h4>
        <div className="space-y-2 text-sm text-yellow-700">
          <div className="flex justify-between">
            <span>PayPal:</span>
            <span className="font-medium">3-5 business days</span>
          </div>
          <div className="flex justify-between">
            <span>Venmo:</span>
            <span className="font-medium">3-5 business days</span>
          </div>
          <div className="flex justify-between">
            <span>Company Check:</span>
            <span className="font-medium">10-15 business days</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <SafeIcon icon={FiPhone} className="text-blue-600" />
            <span>1-844-782-7429</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <SafeIcon icon={FiMail} className="text-blue-600" />
            <span>info@stargazevacations.com</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProcessingInfo;