import React from 'react';
import { motion } from 'framer-motion';

const FormField = ({ 
  label, 
  type, 
  value, 
  onChange, 
  error, 
  placeholder, 
  required, 
  rows 
}) => {
  const inputClasses = `
    w-full px-4 py-3 rounded-lg border-2 transition-all duration-300
    ${error 
      ? 'border-red-300 focus:border-red-500' 
      : 'border-gray-200 focus:border-blue-500'
    }
    focus:outline-none focus:ring-2 focus:ring-blue-200
    bg-gray-50 focus:bg-white
  `;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-2"
    >
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows || 3}
          className={inputClasses}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm font-medium"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default FormField;