import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiSettings, FiCheck, FiCopy, FiExternalLink, FiKey, FiUser, FiAlertCircle } = FiIcons;

const AcumbamailSetupGuide = () => {
  const [copiedStep, setCopiedStep] = useState(null);

  const copyToClipboard = (text, step) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const setupSteps = [
    {
      id: 1,
      title: 'Create Acumbamail Account',
      description: 'Sign up for an Acumbamail account to get started',
      action: 'Visit Acumbamail',
      link: 'https://acumbamail.com/',
      code: null
    },
    {
      id: 2,
      title: 'Get API Token',
      description: 'Generate your API token from the Acumbamail dashboard',
      action: 'API Token Steps',
      code: `1. Login to your Acumbamail account
2. Go to Settings > API
3. Generate a new API token
4. Copy the token (starts with 'acumba_')`
    },
    {
      id: 3,
      title: 'Configure Domain Authentication',
      description: 'Set up domain authentication for info@stargazevacations.com',
      action: 'Domain Setup',
      code: `1. Go to Settings > Domains
2. Add domain: stargazevacations.com
3. Verify DNS records:
   - SPF: v=spf1 include:acumbamail.com ~all
   - DKIM: Add provided DKIM record
   - DMARC: v=DMARC1;p=none;rua=mailto:dmarc@stargazevacations.com`
    },
    {
      id: 4,
      title: 'Update Service Configuration',
      description: 'Add your credentials to the email service',
      action: 'Configuration Code',
      code: `// Update in src/services/acumbamailService.js
const ACUMBAMAIL_CONFIG = {
  API_BASE_URL: 'https://acumbamail.com/api/1',
  API_TOKEN: 'your_acumbamail_api_token_here', // Replace with your token
  LIST_ID: 'your_list_id', // Optional: for contact management
  FROM_EMAIL: 'info@stargazevacations.com',
  FROM_NAME: 'StarGaze Vacations'
};`
    },
    {
      id: 5,
      title: 'Test Email Delivery',
      description: 'Send a test email to verify everything works',
      action: 'Test Configuration',
      code: `// Test in browser console:
import { sendRefundRequestEmail } from './services/acumbamailService';

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
      title: 'Professional Email Templates',
      description: 'Beautiful HTML emails with StarGaze Vacations branding'
    },
    {
      icon: FiKey,
      title: 'Secure API Integration',
      description: 'Enterprise-grade security with API token authentication'
    },
    {
      icon: FiUser,
      title: 'Contact Management',
      description: 'Automatically add customers to your mailing list'
    },
    {
      icon: FiSettings,
      title: 'Advanced Features',
      description: 'Email tracking, analytics, and delivery reports'
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
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
          <SafeIcon icon={FiMail} className="text-white text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Acumbamail Setup Guide</h2>
          <p className="text-gray-600">Configure professional email delivery for refund requests</p>
        </div>
      </div>

      {/* Development Mode Alert */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
        <SafeIcon icon={FiAlertCircle} className="text-blue-600 text-lg mt-0.5" />
        <div>
          <h3 className="font-medium text-blue-800">Development Mode Active</h3>
          <p className="text-blue-700 text-sm">
            This application is running in development mode. Email sending is currently simulated for testing purposes. 
            No actual emails will be sent until deployed to production with valid Acumbamail credentials.
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
            className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-100"
          >
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
              <SafeIcon icon={feature.icon} className="text-purple-600" />
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
            className="border border-gray-200 rounded-lg p-4 hover:border-purple-200 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-semibold text-sm">{step.id}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-3">{step.description}</p>

                {step.link && (
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium mb-3"
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
                        className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800"
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

      {/* Development Mode Tips */}
      <div className="mt-8 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <div className="flex items-start gap-3">
          <SafeIcon icon={FiSettings} className="text-indigo-600 mt-1" />
          <div>
            <h4 className="font-semibold text-indigo-800 mb-1">Development Mode Instructions</h4>
            <p className="text-indigo-700 text-sm mb-3">
              When testing in development mode, the application will:
            </p>
            <ul className="text-indigo-700 text-sm space-y-1 list-disc pl-4">
              <li>Simulate email sending without making actual API calls</li>
              <li>Log all operations to the browser console for verification</li>
              <li>Generate fake message IDs for testing confirmation flows</li>
              <li>Skip authentication with Acumbamail servers</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <SafeIcon icon={FiCheck} className="text-green-600 mt-1" />
            <div>
              <h4 className="font-semibold text-green-800 mb-1">Acumbamail Benefits</h4>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• High deliverability rates</li>
                <li>• Professional HTML templates</li>
                <li>• Real-time delivery tracking</li>
                <li>• Contact list management</li>
                <li>• Detailed analytics</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <SafeIcon icon={FiSettings} className="text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Email Features</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Branded email templates</li>
                <li>• Mobile-responsive design</li>
                <li>• Automatic contact addition</li>
                <li>• Fallback mechanisms</li>
                <li>• GDPR compliant</li>
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
              For assistance with Acumbamail configuration, visit their{' '}
              <a
                href="https://acumbamail.com/en/support/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline ml-1"
              >
                support documentation
              </a>{' '}
              or contact your development team.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AcumbamailSetupGuide;