import emailjs from '@emailjs/browser';

// EmailJS Configuration - Replace with your actual values
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_stargaze', // Your EmailJS service ID
  TEMPLATE_ID: 'template_refund', // Your EmailJS template ID
  PUBLIC_KEY: 'your_public_key_here' // Your EmailJS public key
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

// Main email sending function
export const sendRefundRequestEmail = async (formData) => {
  try {
    // Prepare template parameters for EmailJS
    const templateParams = {
      to_email: 'info@stargazevacations.com',
      from_name: formData.fullName,
      from_email: formData.email,
      reply_to: formData.email,
      subject: `Refund Request - ${formData.bookingNumber}`,
      
      // Customer details
      customer_name: formData.fullName,
      booking_number: formData.bookingNumber,
      customer_email: formData.email,
      customer_phone: formData.phoneNumber,
      refund_method: formatRefundMethod(formData.refundMethod),
      refund_reason: formData.refundReason,
      digital_signature: formData.signature,
      submission_date: new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }),
      
      // Formatted HTML content for better email display
      formatted_details: createFormattedDetails(formData)
    };

    console.log('Sending email with template params:', templateParams);

    // Send email via EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    
    return {
      success: true,
      response: response,
      message: 'Refund request email sent successfully to StarGaze Vacations'
    };

  } catch (error) {
    console.error('EmailJS Error Details:', error);
    
    // Provide detailed error information
    let errorMessage = 'Failed to send email notification';
    
    if (error.status === 400) {
      errorMessage = 'Email configuration error. Please contact support.';
    } else if (error.status === 401) {
      errorMessage = 'Email service authentication failed.';
    } else if (error.status === 403) {
      errorMessage = 'Email service access denied.';
    } else if (error.status === 404) {
      errorMessage = 'Email template not found.';
    } else if (error.text) {
      errorMessage = `Email service error: ${error.text}`;
    }

    return {
      success: false,
      error: error,
      message: errorMessage,
      fallback: true
    };
  }
};

// Helper function to format refund method for display
const formatRefundMethod = (method) => {
  const methods = {
    'paypal': 'PayPal (3-5 business days)',
    'venmo': 'Venmo (3-5 business days)',
    'check': 'Company Check (10-15 business days)'
  };
  
  return methods[method] || method;
};

// Helper function to create formatted details for email
const createFormattedDetails = (formData) => {
  return `
    Customer Information:
    • Full Name: ${formData.fullName}
    • Booking Number: ${formData.bookingNumber}
    • Email: ${formData.email}
    • Phone: ${formData.phoneNumber}
    • Preferred Refund Method: ${formatRefundMethod(formData.refundMethod)}
    
    Refund Reason:
    ${formData.refundReason}
    
    Digital Signature: ${formData.signature}
    Submitted: ${new Date().toLocaleString()}
  `;
};

// Alternative: Webhook-based email service
export const sendRefundRequestWebhook = async (formData) => {
  try {
    // This would be your webhook URL (e.g., Zapier, Make.com, or custom endpoint)
    const webhookUrl = 'https://hooks.zapier.com/hooks/catch/your_webhook_id/';
    
    const payload = {
      type: 'refund_request',
      timestamp: new Date().toISOString(),
      customer: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        bookingNumber: formData.bookingNumber
      },
      refund: {
        method: formData.refundMethod,
        reason: formData.refundReason,
        signature: formData.signature
      },
      notification: {
        to: 'info@stargazevacations.com',
        subject: `Refund Request - ${formData.bookingNumber}`,
        priority: 'normal'
      }
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Refund request sent via webhook successfully'
      };
    } else {
      throw new Error(`Webhook failed with status: ${response.status}`);
    }

  } catch (error) {
    console.error('Webhook Error:', error);
    return {
      success: false,
      error: error,
      message: 'Failed to send via webhook'
    };
  }
};

// Fallback: Store locally and provide manual instructions
export const storeRefundRequestLocally = (formData) => {
  try {
    const requestId = `REF-${Date.now()}`;
    const refundRequest = {
      id: requestId,
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'pending_email'
    };

    // Store in localStorage for backup
    const existingRequests = JSON.parse(localStorage.getItem('pending_refund_requests') || '[]');
    existingRequests.push(refundRequest);
    localStorage.setItem('pending_refund_requests', JSON.stringify(existingRequests));

    console.log('Refund request stored locally:', refundRequest);

    return {
      success: true,
      requestId: requestId,
      message: 'Request saved locally. Please contact StarGaze Vacations directly.',
      manualInstructions: {
        email: 'info@stargazevacations.com',
        phone: '1-844-782-7429',
        details: refundRequest
      }
    };

  } catch (error) {
    console.error('Error storing locally:', error);
    return {
      success: false,
      error: error,
      message: 'Failed to save request locally'
    };
  }
};

// Utility function to get stored requests (for admin/debugging)
export const getStoredRequests = () => {
  try {
    return JSON.parse(localStorage.getItem('pending_refund_requests') || '[]');
  } catch (error) {
    console.error('Error retrieving stored requests:', error);
    return [];
  }
};

// Clear stored requests (for cleanup)
export const clearStoredRequests = () => {
  try {
    localStorage.removeItem('pending_refund_requests');
    return true;
  } catch (error) {
    console.error('Error clearing stored requests:', error);
    return false;
  }
};