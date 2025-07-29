import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCreditCard, FiDollarSign, FiFileText } = FiIcons;

const RefundMethodSelector = ({ value, onChange, error }) => {
  const methods = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: FiCreditCard,
      description: 'Fastest processing (3-5 business days)',
      color: 'blue'
    },
    {
      id: 'venmo',
      name: 'Venmo',
      icon: FiDollarSign,
      description: 'Quick digital transfer (3-5 business days)',
      color: 'purple'
    },
    {
      id: 'check',
      name: 'Company Check',
      icon: FiFileText,
      description: 'Traditional method (10-15 business days)',
      color: 'green'
    }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">
        Preferred Refund Method
        <span className="text-red-500 ml-1">*</span>
      </label>
      
      <div className="grid gap-3">
        {methods.map((method, index) => {
          // Calculate dynamic styles based on method
          const borderColor = value === method.id ? `border-${method.color}-500` : 'border-gray-200 hover:border-gray-300';
          const bgColor = value === method.id ? `bg-${method.color}-50` : '';
          const iconBgColor = value === method.id ? `bg-${method.color}-500 text-white` : 'bg-gray-100 text-gray-500';
          const radioBorderColor = value === method.id ? `border-${method.color}-500 bg-${method.color}-500` : 'border-gray-300';
          
          return (
            <motion.div
              key={method.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${borderColor} ${bgColor}`}
              onClick={() => onChange(method.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBgColor}`}>
                  <SafeIcon icon={method.icon} className="text-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{method.name}</h3>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${radioBorderColor}`}>
                  {value === method.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm font-medium"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default RefundMethodSelector;