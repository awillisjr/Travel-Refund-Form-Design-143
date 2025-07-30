import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FormField from './FormField';
import RefundMethodSelector from './RefundMethodSelector';
import DigitalSignature from './DigitalSignature';
import TermsAgreement from './TermsAgreement';
import { sendRefundRequestEmail, storeRefundRequestLocally, sendRefundRequestWebhook } from '../services/emailService';

const RefundForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    bookingNumber: '',
    email: '',
    phoneNumber: '',
    refundReason: '',
    refundMethod: '',
    signature: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.bookingNumber.trim()) newErrors.bookingNumber = 'Booking number is required';
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.refundReason.trim()) newErrors.refundReason = 'Refund reason is required';
    if (!formData.refundMethod) newErrors.refundMethod = 'Please select a refund method';
    if (!formData.signature.trim()) newErrors.signature = 'Digital signature is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      console.log('📧 Submitting refund request via EmailJS:', formData);
      
      // Attempt to send email via EmailJS
      const emailResult = await sendRefundRequestEmail(formData);
      
      if (emailResult.success) {
        console.log('✅ EmailJS email sent successfully');
        
        setSubmitStatus({
          type: 'success',
          message: 'Your refund request has been sent to StarGaze Vacations successfully!',
          details: {
            messageId: emailResult.messageId,
            service: 'EmailJS'
          }
        });
        
        onSubmit(formData);
      } else if (emailResult.fallback && emailResult.fallbackResult?.success) {
        console.log('⚠️ Using fallback method:', emailResult.fallbackResult);
        
        setSubmitStatus({
          type: 'warning',
          message: 'Request submitted but email delivery failed. Please contact StarGaze Vacations directly.',
          details: emailResult.fallbackResult.manualInstructions
        });
        
        onSubmit(formData);
      } else {
        throw new Error('Both EmailJS and fallback methods failed');
      }
    } catch (error) {
      console.error('❌ Complete submission failure:', error);
      
      // Last resort - store locally and show manual instructions
      const localResult = storeRefundRequestLocally(formData);
      
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit request. Please contact StarGaze Vacations directly.',
        contact: {
          email: 'info@stargazevacations.com',
          phone: '1-844-782-7429'
        },
        details: localResult.success ? localResult.manualInstructions : null
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Service Information Banner */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <h3 className="font-medium text-blue-800">✉️ Email Service: EmailJS</h3>
            <p className="text-sm text-blue-600">Reliable email delivery for your refund request</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-blue-800">📧</span>
              <a href="mailto:info@stargazevacations.com" className="text-sm text-blue-600 hover:underline">
                info@stargazevacations.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-800">📞</span>
              <a href="tel:18447827429" className="text-sm text-blue-600 hover:underline">
                1-844-782-7429
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {submitStatus && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg border ${
            submitStatus.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : submitStatus.type === 'warning'
              ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <p className="font-medium">{submitStatus.message}</p>
          
          {submitStatus.details?.messageId && (
            <div className="mt-2 text-sm">
              <p>📨 Message ID: <code className="bg-white px-2 py-1 rounded">{submitStatus.details.messageId}</code></p>
              <p>🔧 Service: {submitStatus.details.service}</p>
            </div>
          )}
          
          {submitStatus.details?.email && (
            <div className="mt-2 text-sm">
              <p>Please contact:</p>
              <p>📧 {submitStatus.details.email}</p>
              <p>📞 {submitStatus.details.phone}</p>
            </div>
          )}
          
          {submitStatus.contact && (
            <div className="mt-2 text-sm">
              <p>Contact StarGaze Vacations:</p>
              <p>📧 {submitStatus.contact.email}</p>
              <p>📞 {submitStatus.contact.phone}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Form Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Full Name"
          type="text"
          value={formData.fullName}
          onChange={(value) => updateFormData('fullName', value)}
          error={errors.fullName}
          placeholder="Enter your full name"
          required
        />
        
        <FormField
          label="Booking Number"
          type="text"
          value={formData.bookingNumber}
          onChange={(value) => updateFormData('bookingNumber', value)}
          error={errors.bookingNumber}
          placeholder="e.g., SG-2024-001234"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(value) => updateFormData('email', value)}
          error={errors.email}
          placeholder="your.email@example.com"
          required
        />
        
        <FormField
          label="Phone Number"
          type="tel"
          value={formData.phoneNumber}
          onChange={(value) => updateFormData('phoneNumber', value)}
          error={errors.phoneNumber}
          placeholder="(555) 123-4567"
          required
        />
      </div>

      <FormField
        label="Reason for Refund Request"
        type="textarea"
        value={formData.refundReason}
        onChange={(value) => updateFormData('refundReason', value)}
        error={errors.refundReason}
        placeholder="Please provide details about why you're requesting a refund..."
        required
        rows={4}
      />

      <RefundMethodSelector
        value={formData.refundMethod}
        onChange={(value) => updateFormData('refundMethod', value)}
        error={errors.refundMethod}
      />

      <DigitalSignature
        value={formData.signature}
        onChange={(value) => updateFormData('signature', value)}
        error={errors.signature}
      />

      <TermsAgreement
        checked={formData.agreeToTerms}
        onChange={(value) => updateFormData('agreeToTerms', value)}
        error={errors.agreeToTerms}
      />

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
        } text-white`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending via EmailJS...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span>📧</span> Submit Refund Request
          </div>
        )}
      </motion.button>

      {/* Service Info */}
      <div className="text-center text-sm text-gray-500">
        <p>✅ Secure email delivery powered by EmailJS</p>
        <p>🔒 Your information is encrypted and protected</p>
        <p className="text-xs mt-1 text-blue-500">In development mode, emails are simulated for testing</p>
      </div>
    </motion.form>
  );
};

export default RefundForm;