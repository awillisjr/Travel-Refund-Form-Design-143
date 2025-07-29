import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiExternalLink } = FiIcons;

const TermsAgreement = ({ checked, onChange, error }) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-3"
    >
      <div className="flex items-start space-x-3">
        <div className="pt-1">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className={`
              w-5 h-5 rounded border-2 cursor-pointer flex items-center justify-center transition-all duration-300
              ${checked 
                ? 'bg-blue-500 border-blue-500' 
                : 'border-gray-300 hover:border-blue-400'
              }
            `}
            onClick={() => onChange(!checked)}
          >
            {checked && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </motion.div>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-700">
            I agree to the{' '}
            <a 
              href="#terms" 
              className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1 transition-colors"
            >
              Terms and Conditions
              <SafeIcon icon={FiExternalLink} className="text-xs" />
            </a>
            {' '}and understand that refunds may take up to 30 business days to process.
            <span className="text-red-500 ml-1">*</span>
          </p>
        </div>
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm font-medium ml-8"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default TermsAgreement;