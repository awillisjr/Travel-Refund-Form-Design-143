import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEdit3 } = FiIcons;

const DigitalSignature = ({ value, onChange, error }) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-3"
    >
      <label className="block text-sm font-semibold text-gray-700">
        Digital Signature
        <span className="text-red-500 ml-1">*</span>
      </label>
      
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <SafeIcon icon={FiEdit3} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your full name as your digital signature"
          className={`
            w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-300
            ${error 
              ? 'border-red-300 focus:border-red-500' 
              : 'border-gray-200 focus:border-blue-500'
            }
            focus:outline-none focus:ring-2 focus:ring-blue-200
            bg-gray-50 focus:bg-white font-signature text-lg
          `}
          style={{ fontFamily: 'cursive' }}
        />
      </div>
      
      <p className="text-xs text-gray-500">
        By typing your name above, you agree that this constitutes your digital signature and has the same legal effect as a handwritten signature.
      </p>
      
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

export default DigitalSignature;