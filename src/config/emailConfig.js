// Acumbamail Configuration for StarGaze Vacations

export const ACUMBAMAIL_CONFIG = {
  // API Configuration
  API_BASE_URL: 'https://acumbamail.com/api/1',
  API_TOKEN: 'YOUR_ACUMBAMAIL_API_TOKEN', // Replace with your actual API token
  
  // Email Settings
  FROM_EMAIL: 'info@stargazevacations.com',
  FROM_NAME: 'StarGaze Vacations',
  
  // Optional: List management
  LIST_ID: 'YOUR_LIST_ID', // For adding contacts to mailing list
  
  // Email preferences
  TRACK_OPENS: true,
  TRACK_CLICKS: true,
  
  // Retry settings
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000 // milliseconds
};

// Email template configuration
export const EMAIL_TEMPLATES = {
  REFUND_REQUEST: {
    SUBJECT: 'Refund Request - {BOOKING_NUMBER}',
    PRIORITY: 'high',
    TAGS: ['refund-request', 'customer-service']
  }
};

// Acumbamail API endpoints
export const API_ENDPOINTS = {
  SEND_EMAIL: '/sendMail/',
  ADD_SUBSCRIBER: '/addSubscriber/',
  GET_LISTS: '/getLists/',
  GET_CAMPAIGNS: '/getCampaigns/'
};

// Email validation rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[+]?[1-9][\d]{0,15}$/, // Fixed the unnecessary escape character
  BOOKING_REGEX: /^[A-Z]{2}-\d{4}-\d{6}$/
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_API_TOKEN: 'Invalid Acumbamail API token. Please check your configuration.',
  QUOTA_EXCEEDED: 'Email quota exceeded. Please contact your Acumbamail administrator.',
  INVALID_EMAIL: 'Invalid email address format.',
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  TEMPLATE_ERROR: 'Email template error. Please contact support.',
  RATE_LIMIT: 'Rate limit exceeded. Please wait before sending another email.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  EMAIL_SENT: 'Refund request email sent successfully via Acumbamail',
  CONTACT_ADDED: 'Customer contact added to mailing list',
  FALLBACK_SUCCESS: 'Request saved locally for manual processing'
};

// Development/Testing configuration
export const DEV_CONFIG = {
  ENABLE_LOGGING: true,
  TEST_EMAIL: 'test@stargazevacations.com',
  MOCK_RESPONSES: false // Set to true for testing without API calls
};

// Webhook configuration (alternative delivery method)
export const WEBHOOK_CONFIG = {
  ZAPIER_URL: 'https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/',
  MAKE_URL: 'https://hook.integromat.com/YOUR_WEBHOOK_ID',
  CUSTOM_WEBHOOK: 'https://your-custom-webhook.com/refund-requests'
};

// Local storage keys
export const STORAGE_KEYS = {
  PENDING_REQUESTS: 'pending_refund_requests',
  EMAIL_PREFERENCES: 'email_preferences',
  USER_SETTINGS: 'user_settings'
};

// Contact form field mapping for Acumbamail
export const FIELD_MAPPING = {
  EMAIL: 'email',
  FNAME: 'firstName', 
  LNAME: 'lastName',
  PHONE: 'phoneNumber',
  BOOKING: 'bookingNumber',
  REFUND_METHOD: 'refundMethod',
  SUBMISSION_DATE: 'submittedAt'
};

export default {
  ACUMBAMAIL_CONFIG,
  EMAIL_TEMPLATES,
  API_ENDPOINTS,
  VALIDATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  DEV_CONFIG,
  WEBHOOK_CONFIG,
  STORAGE_KEYS,
  FIELD_MAPPING
};