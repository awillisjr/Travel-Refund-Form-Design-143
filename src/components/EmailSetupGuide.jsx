import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiSettings, FiCheck, FiCopy, FiExternalLink, FiKey, FiUser, FiAlertCircle } = FiIcons;

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
- {{to_email}} - Recipient email
- {{from_name}} - Customer name
- {{customer_name}} - Customer full name
- {{booking_number}} - Booking reference
- {{customer_email}} - Customer email
- {{customer_phone}} - Customer phone
- {{refund_method}} - Preferred refund method
- {{refund_reason}} - Reason for refund
- {{digital_signature}} - Customer signature
- {{submission_date}} - When submitted
- {{formatted_details}} - Complete formatted request`
    },
    {
      id: 4,
      title: 'Get API Keys',
      description: 'Copy your EmailJS credentials from the dashboard',
      action: 'Update Configuration',
      code: `// Update in src/services/emailService.js
const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id_here', // From EmailJS dashboard
  TEMPLATE_ID: 'your_template_id_here', // Your template ID
  PUBLIC_KEY: 'your_public_key_here' // Your EmailJS public key
};`
    },
    {
      id: 5,
      title: 'Test Email Delivery',
      description: 'Send a test email to verify everything works',
      action: 'Test Configuration',
      code: `// Test in browser console:
import { sendRefundRequestEmail } from './services/emailService';

const testData = {
  fullName: 'Test Customer',
  bookingNumber: 'TEST-001',
  email: 'test@example.com',
  phoneNumber: '555-0123',
  refundReason: 'Test refund request',
  refundMethod: 'paypal',
  signature: 'Test Signature'
};

sendRefundRequestEmail(testData);`
    }
  ];

  const features = [
    {
      icon: FiMail,
      title: 'Free Email Service',
      description: 'Send up to 200 emails per month for free'
    },
    {
      icon: FiKey,
      title: 'Easy Integration',
      description: 'Simple JavaScript SDK with no server required'
    },
    {
      icon: FiUser,
      title: 'Multiple Providers',
      description: 'Works with Gmail, Outlook, Yahoo, and custom SMTP'
    },
    {
      icon: FiSettings,
      title: 'Template Management',
      description: 'Create and manage email templates in the dashboard'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <SafeIcon icon={FiMail} className="text-white text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">EmailJS Setup Guide</h2>
          <p className="text-gray-600">Configure reliable email delivery for refund requests</p>
        </div>
      </div>

      {/* Development Mode Alert */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
        <SafeIcon icon={FiAlertCircle} className="text-blue-600 text-lg mt-0.5" />
        <div>
          <h3 className="font-medium text-blue-800">Development Mode Active</h3>
          <p className="text-blue-700 text-sm">
            This application is running in development mode. Email sending is currently simulated for testing purposes. 
            No actual emails will be sent until deployed to production with valid EmailJS credentials.
          </p>
        </div>
      </div>

      {/* Features Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
              <SafeIcon icon={feature.icon} className="text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h4>
            <p className="text-gray-600 text-xs">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Setup Steps */}
      <div className="space-y-6">
        {setupSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-sm">{step.id}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-3">{step.description}</p>

                {step.link && (
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-3"
                  >
                    {step.action} <SafeIcon icon={FiExternalLink} className="text-sm" />
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
                        <SafeIcon icon={copiedStep === step.id ? FiCheck : FiCopy} className="text-sm" />
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

      {/* EmailJS Template Example */}
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start gap-3">
          <SafeIcon icon={FiMail} className="text-green-600 mt-1" />
          <div>
            <h4 className="font-semibold text-green-800 mb-1">Email Template Example</h4>
            <p className="text-green-700 text-sm mb-3">
              Create your EmailJS template with this structure:
            </p>
            <div className="bg-white rounded p-3 border text-sm">
              <strong>Subject:</strong> New Refund Request - {`{{booking_number}}`}<br /><br />
              <strong>Body:</strong><br />
              New refund request from {`{{customer_name}}`}<br /><br />
              {`{{formatted_details}}`}<br /><br />
              Please process this request promptly.<br />
              <em>Sent via EmailJS from StarGaze Vacations</em>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <SafeIcon icon={FiCheck} className="text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">EmailJS Benefits</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• No backend server required</li>
                <li>• Free tier with 200 emails/month</li>
                <li>• Multiple email provider support</li>
                <li>• Easy template management</li>
                <li>• Real-time delivery tracking</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <div className="flex items-start gap-3">
            <SafeIcon icon={FiSettings} className="text-indigo-600 mt-1" />
            <div>
              <h4 className="font-semibold text-indigo-800 mb-1">Form Features</h4>
              <ul className="text-indigo-700 text-sm space-y-1">
                <li>• Professional email formatting</li>
                <li>• Automatic form validation</li>
                <li>• Multiple fallback methods</li>
                <li>• Local storage backup</li>
                <li>• Development mode simulation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <SafeIcon icon={FiMail} className="text-yellow-600 mt-1" />
          <div>
            <h4 className="font-semibold text-yellow-800 mb-1">Need Help?</h4>
            <p className="text-yellow-700 text-sm">
              For assistance with EmailJS configuration, visit their{' '}
              <a
                href="https://www.emailjs.com/docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline ml-1"
              >
                documentation
              </a>{' '}
              or contact your development team.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailSetupGuide;