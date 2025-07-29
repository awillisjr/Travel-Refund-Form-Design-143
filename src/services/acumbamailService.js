// Acumbamail API Service for StarGaze Vacations

const ACUMBAMAIL_CONFIG = {
  API_BASE_URL: 'https://acumbamail.com/api/1',
  API_TOKEN: 'YOUR_ACUMBAMAIL_API_TOKEN', // Replace with your actual API token
  LIST_ID: 'YOUR_LIST_ID', // Optional: for contact management
  FROM_EMAIL: 'info@stargazevacations.com',
  FROM_NAME: 'StarGaze Vacations'
};

// Main function to send refund request email via Acumbamail
export const sendRefundRequestEmail = async (formData) => {
  try {
    console.log('📧 Sending refund request via Acumbamail:', formData);

    // Prepare email content
    const emailContent = {
      auth_token: ACUMBAMAIL_CONFIG.API_TOKEN,
      template: 'custom',
      from: ACUMBAMAIL_CONFIG.FROM_EMAIL,
      from_name: ACUMBAMAIL_CONFIG.FROM_NAME,
      to: [
        {
          email: 'info@stargazevacations.com',
          name: 'StarGaze Vacations Support'
        }
      ],
      reply_to: formData.email,
      subject: `Refund Request - ${formData.bookingNumber}`,
      html_body: createRefundEmailHTML(formData),
      text_body: createRefundEmailText(formData),
      // Optional: Add tracking
      track_opens: true,
      track_clicks: true
    };

    // Send email via Acumbamail API
    const response = await fetch(`${ACUMBAMAIL_CONFIG.API_BASE_URL}/sendMail/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailContent)
    });

    const result = await response.json();

    if (response.ok && result.response === 'OK') {
      console.log('✅ Acumbamail email sent successfully:', result);
      
      return {
        success: true,
        response: result,
        message: 'Refund request email sent successfully to StarGaze Vacations via Acumbamail',
        messageId: result.message_id || 'N/A'
      };
    } else {
      throw new Error(result.error || 'Acumbamail API error');
    }

  } catch (error) {
    console.error('❌ Acumbamail Error:', error);
    
    // Detailed error handling
    let errorMessage = 'Failed to send email via Acumbamail';
    
    if (error.message.includes('auth_token')) {
      errorMessage = 'Acumbamail authentication failed. Check API token.';
    } else if (error.message.includes('quota')) {
      errorMessage = 'Email quota exceeded. Contact your Acumbamail administrator.';
    } else if (error.message.includes('network')) {
      errorMessage = 'Network error. Please try again.';
    } else if (error.message) {
      errorMessage = `Acumbamail error: ${error.message}`;
    }

    return {
      success: false,
      error: error,
      message: errorMessage,
      fallback: true
    };
  }
};

// Create HTML email template for Acumbamail
const createRefundEmailHTML = (formData) => {
  const submissionDate = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Refund Request - ${formData.bookingNumber}</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                max-width: 600px; 
                margin: 0 auto; 
                background-color: #f8f9fa;
            }
            .header { 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                color: white; 
                padding: 30px; 
                text-align: center; 
                border-radius: 10px 10px 0 0;
            }
            .header h1 { 
                margin: 0; 
                font-size: 28px; 
                font-weight: bold;
            }
            .header p { 
                margin: 10px 0 0 0; 
                opacity: 0.9; 
                font-size: 16px;
            }
            .content { 
                background: white; 
                padding: 30px; 
                border-radius: 0 0 10px 10px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .section { 
                margin: 25px 0; 
                padding: 20px; 
                border-radius: 8px; 
                border-left: 4px solid #667eea;
            }
            .customer-info { background-color: #f8f9ff; }
            .refund-reason { background-color: #fff8f0; border-left-color: #ffa726; }
            .signature { background-color: #f0f8ff; border-left-color: #42a5f5; }
            .table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            .table td { padding: 12px 0; border-bottom: 1px solid #eee; }
            .label { font-weight: bold; color: #555; width: 35%; }
            .value { color: #333; }
            .method-badge { 
                background: #667eea; 
                color: white; 
                padding: 6px 12px; 
                border-radius: 20px; 
                font-size: 14px; 
                font-weight: bold;
            }
            .signature-text { 
                font-family: 'Brush Script MT', cursive, sans-serif; 
                font-size: 24px; 
                font-style: italic; 
                color: #667eea; 
                margin: 10px 0;
            }
            .footer { 
                background: #667eea; 
                color: white; 
                padding: 20px; 
                text-align: center; 
                margin-top: 20px; 
                border-radius: 10px;
            }
            .contact-info { 
                margin: 10px 0; 
                font-size: 14px;
            }
            .contact-info a { 
                color: white; 
                text-decoration: none;
            }
            .urgent { 
                background: #fff3cd; 
                border: 1px solid #ffeaa7; 
                padding: 15px; 
                border-radius: 8px; 
                margin: 20px 0;
            }
            .urgent strong { color: #856404; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>⭐ StarGaze Vacations</h1>
            <p>New Refund Request Received</p>
        </div>

        <div class="content">
            <div class="urgent">
                <strong>🚨 Action Required:</strong> A new refund request has been submitted and requires your attention.
            </div>

            <div class="section customer-info">
                <h3 style="color: #667eea; margin-top: 0;">👤 Customer Information</h3>
                <table class="table">
                    <tr>
                        <td class="label">Full Name:</td>
                        <td class="value"><strong>${formData.fullName}</strong></td>
                    </tr>
                    <tr>
                        <td class="label">Booking Number:</td>
                        <td class="value">
                            <code style="background: #f1f3f4; padding: 4px 8px; border-radius: 4px; font-weight: bold;">
                                ${formData.bookingNumber}
                            </code>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">Email Address:</td>
                        <td class="value">
                            <a href="mailto:${formData.email}" style="color: #667eea; text-decoration: none;">
                                ${formData.email}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">Phone Number:</td>
                        <td class="value">
                            <a href="tel:${formData.phoneNumber}" style="color: #667eea; text-decoration: none;">
                                ${formData.phoneNumber}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">Preferred Method:</td>
                        <td class="value">
                            <span class="method-badge">
                                ${formatRefundMethod(formData.refundMethod)}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="section refund-reason">
                <h3 style="color: #ff8f00; margin-top: 0;">📝 Refund Reason</h3>
                <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #ffe0b2;">
                    <p style="margin: 0; font-size: 16px; line-height: 1.6;">
                        ${formData.refundReason}
                    </p>
                </div>
            </div>

            <div class="section signature">
                <h3 style="color: #1976d2; margin-top: 0;">✍️ Digital Signature</h3>
                <div class="signature-text">${formData.signature}</div>
                <p style="color: #666; font-size: 14px; margin: 5px 0;">
                    <strong>Submitted:</strong> ${submissionDate}
                </p>
            </div>

            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; text-align: center; margin-top: 25px;">
                <h4 style="color: #2e7d32; margin-top: 0;">📋 Next Steps</h4>
                <p style="color: #388e3c; margin-bottom: 0;">
                    This refund request should be processed within 1-2 business days. 
                    The customer will receive email updates throughout the process.
                </p>
            </div>
        </div>

        <div class="footer">
            <h4 style="margin: 0 0 10px 0;">StarGaze Vacations Customer Service</h4>
            <div class="contact-info">
                📞 <a href="tel:18447827429">1-844-782-7429</a> | 
                ✉️ <a href="mailto:info@stargazevacations.com">info@stargazevacations.com</a>
            </div>
            <p style="font-size: 12px; opacity: 0.8; margin: 15px 0 0 0;">
                This email was sent via Acumbamail API from the StarGaze Vacations refund system.
            </p>
        </div>
    </body>
    </html>
  `;
};

// Create plain text email for Acumbamail
const createRefundEmailText = (formData) => {
  const submissionDate = new Date().toLocaleString();
  
  return `
STARGAZE VACATIONS - NEW REFUND REQUEST
=======================================

🚨 ACTION REQUIRED: A new refund request has been submitted.

CUSTOMER INFORMATION:
--------------------
Name: ${formData.fullName}
Booking Number: ${formData.bookingNumber}
Email: ${formData.email}
Phone: ${formData.phoneNumber}
Preferred Method: ${formatRefundMethod(formData.refundMethod)}

REFUND REASON:
--------------
${formData.refundReason}

DIGITAL SIGNATURE:
------------------
${formData.signature}

SUBMISSION DETAILS:
-------------------
Submitted: ${submissionDate}
Via: StarGaze Vacations Refund System

NEXT STEPS:
-----------
This refund request should be processed within 1-2 business days.
The customer will receive email updates throughout the process.

CONTACT INFORMATION:
--------------------
Phone: 1-844-782-7429
Email: info@stargazevacations.com

---
This email was sent via Acumbamail API.
  `;
};

// Helper function to format refund method
const formatRefundMethod = (method) => {
  const methods = {
    'paypal': 'PayPal (3-5 business days)',
    'venmo': 'Venmo (3-5 business days)', 
    'check': 'Company Check (10-15 business days)'
  };
  
  return methods[method] || method.charAt(0).toUpperCase() + method.slice(1);
};

// Optional: Add contact to Acumbamail list for future communications
export const addContactToAcumbamail = async (formData) => {
  try {
    const contactData = {
      auth_token: ACUMBAMAIL_CONFIG.API_TOKEN,
      list_id: ACUMBAMAIL_CONFIG.LIST_ID,
      merge_fields: {
        EMAIL: formData.email,
        FNAME: formData.fullName.split(' ')[0] || '',
        LNAME: formData.fullName.split(' ').slice(1).join(' ') || '',
        PHONE: formData.phoneNumber,
        BOOKING: formData.bookingNumber
      },
      double_optin: false, // Skip confirmation for service requests
      tags: ['refund-request', 'customer-service']
    };

    const response = await fetch(`${ACUMBAMAIL_CONFIG.API_BASE_URL}/addSubscriber/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Contact added to Acumbamail list:', result);
      return { success: true, result };
    } else {
      console.log('ℹ️ Contact not added (may already exist):', result);
      return { success: false, result };
    }

  } catch (error) {
    console.error('⚠️ Error adding contact to Acumbamail:', error);
    return { success: false, error };
  }
};

// Alternative webhook method (fallback)
export const sendRefundRequestWebhook = async (formData) => {
  try {
    // Zapier or Make.com webhook URL
    const webhookUrl = 'https://hooks.zapier.com/hooks/catch/your_webhook_id/';
    
    const payload = {
      type: 'refund_request',
      timestamp: new Date().toISOString(),
      service: 'acumbamail',
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

// Local storage fallback (unchanged)
export const storeRefundRequestLocally = (formData) => {
  try {
    const requestId = `REF-${Date.now()}`;
    const refundRequest = {
      id: requestId,
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'pending_email',
      service: 'acumbamail'
    };

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

// Utility functions (unchanged)
export const getStoredRequests = () => {
  try {
    return JSON.parse(localStorage.getItem('pending_refund_requests') || '[]');
  } catch (error) {
    console.error('Error retrieving stored requests:', error);
    return [];
  }
};

export const clearStoredRequests = () => {
  try {
    localStorage.removeItem('pending_refund_requests');
    return true;
  } catch (error) {
    console.error('Error clearing stored requests:', error);
    return false;
  }
};