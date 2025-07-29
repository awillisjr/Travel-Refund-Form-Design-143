import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiSettings, FiCheck, FiCopy, FiExternalLink } = FiIcons;

const EmailSetupGuide = () => {
  const [copiedStep, setCopiedStep] = useState(null);

  const copyToClipboard = (text, step) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const setupSteps = [
    {
      id: 1,
      title: 'Create EmailJS Account',
      description: 'Sign up for a free EmailJS account to handle email sending',
      action: 'Visit EmailJS',
      link: 'https://www.emailjs.com/',
      code: null
    },
    {
      id: 2,
      title: 'Add Email Service',
      description: 'Configure your email service (Gmail, Outlook, or custom SMTP)',
      action: 'Service Configuration',
      code: `Service ID: service_stargaze
Provider: Gmail/Outlook/SMTP
Email: info@stargazevacations.com`
    },
    {
      id: 3,
      title: 'Create Email Template',
      description: 'Set up the email template with dynamic variables',
      action: 'Template Variables',
      code: `Template ID: template_refund

Required Variables:
- {{to_email}}
- {{from_name}}
- {{customer_name}}
- {{booking_number}}
- {{customer_email}}
- {{refund_method}}
- {{refund_reason}}
- {{digital_signature}}
- {{submission_date}}`
    },
    {
      id: 4,
      title: 'Get API Keys',
      description: 'Copy your EmailJS credentials',
      action: 'Update Configuration',
      code: `// Update in src/services/emailService.js
const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id_here',
  TEMPLATE_ID: 'your_template_id_here', 
  PUBLIC_KEY: 'your_public_key_here'
};`
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
          <SafeIcon icon={FiMail} className="text-white text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Email Setup Guide</h2>
          <p className="text-gray-600">Configure email notifications for refund requests</p>
        </div>
      </div>

      <div className="space-y-6">
        {setupSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold">{step.id}</span>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-3">{step.description}</p>
                
                {step.link && (
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {step.action}
                    <SafeIcon icon={FiExternalLink} className="text-sm" />
                  </a>
                )}
                
                {step.code && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{step.action}</span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyToClipboard(step.code, step.id)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <SafeIcon 
                          icon={copiedStep === step.id ? FiCheck : FiCopy} 
                          className="text-sm" 
                        />
                        {copiedStep === step.id ? 'Copied!' : 'Copy'}
                      </motion.button>
                    </div>
                    <pre className="bg-gray-50 rounded-lg p-3 text-sm overflow-x-auto border">
                      <code className="text-gray-800">{step.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start gap-3">
          <SafeIcon icon={FiCheck} className="text-green-600 mt-1" />
          <div>
            <h4 className="font-semibold text-green-800 mb-1">Testing Your Setup</h4>
            <p className="text-green-700 text-sm">
              After configuration, submit a test refund request to verify emails are being sent to 
              info@stargazevacations.com. Check the browser console for detailed logging.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <SafeIcon icon={FiSettings} className="text-yellow-600 mt-1" />
          <div>
            <h4 className="font-semibold text-yellow-800 mb-1">Alternative Options</h4>
            <p className="text-yellow-700 text-sm">
              If EmailJS doesn't work, the system includes fallback methods including webhook integration 
              and local storage with manual contact instructions.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailSetupGuide;