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
    console.log('📧 Sending refund request via EmailJS:', formData);

    // For development/testing - simulate successful email delivery
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('🧪 Development mode: Simulating successful email delivery');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
      
      return {
        success: true,
        response: {
          status: 200,
          text: 'OK'
        },
        message: 'Refund request email sent successfully to StarGaze Vacations via EmailJS (Simulated)',
        messageId: `SIM-${Date.now()}`
      };
    }

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

    console.log('✅ EmailJS email sent successfully:', response);

    return {
      success: true,
      response: response,
      message: 'Refund request email sent successfully to StarGaze Vacations via EmailJS',
      messageId: response.text || 'EmailJS-Success'
    };

  } catch (error) {
    console.error('❌ EmailJS Error:', error);
    
    // Detailed error handling
    let errorMessage = 'Failed to send email via EmailJS';
    
    if (error.status === 400) {
      errorMessage = 'EmailJS configuration error. Please check your setup.';
    } else if (error.status === 401) {
      errorMessage = 'EmailJS authentication failed. Check your public key.';
    } else if (error.status === 403) {
      errorMessage = 'EmailJS access denied. Verify your service and template IDs.';
    } else if (error.status === 404) {
      errorMessage = 'EmailJS template not found. Check your template ID.';
    } else if (error.text) {
      errorMessage = `EmailJS error: ${error.text}`;
    } else if (error.message) {
      errorMessage = `EmailJS error: ${error.message}`;
    }

    // Use fallback method
    console.log('⚠️ Using fallback method due to error');
    const fallbackResult = storeRefundRequestLocally(formData);

    return {
      success: false,
      error: error,
      message: errorMessage,
      fallback: true,
      fallbackResult: fallbackResult
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
  
  return methods[method] || method.charAt(0).toUpperCase() + method.slice(1);
};

// Helper function to create formatted details for email
const createFormattedDetails = (formData) => {
  return `
🚨 NEW REFUND REQUEST RECEIVED 🚨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 CUSTOMER INFORMATION:
• Full Name: ${formData.fullName}
• Booking Number: ${formData.bookingNumber}
• Email: ${formData.email}
• Phone: ${formData.phoneNumber}
• Preferred Refund Method: ${formatRefundMethod(formData.refundMethod)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 REFUND REASON:
${formData.refundReason}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✍️ DIGITAL SIGNATURE:
${formData.signature}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 SUBMISSION DETAILS:
• Submitted: ${new Date().toLocaleString()}
• Via: StarGaze Vacations Refund System
• Service: EmailJS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 NEXT STEPS:
This refund request should be processed within 1-2 business days.
The customer will receive email updates throughout the process.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 CONTACT INFORMATION:
Phone: 1-844-782-7429
Email: info@stargazevacations.com
  `;
};

// Alternative: Webhook-based email service
export const sendRefundRequestWebhook = async (formData) => {
  try {
    // For development/testing - simulate successful webhook
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('🧪 Development mode: Simulating successful webhook delivery');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      return {
        success: true,
        message: 'Refund request sent via webhook successfully (Simulated)'
      };
    }
    
    // This would be your webhook URL (e.g., Zapier, Make.com, or custom endpoint)
    const webhookUrl = 'https://hooks.zapier.com/hooks/catch/your_webhook_id/';
    
    const payload = {
      type: 'refund_request',
      timestamp: new Date().toISOString(),
      service: 'emailjs',
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
        priority: 'high'
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
      status: 'pending_email',
      service: 'emailjs'
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