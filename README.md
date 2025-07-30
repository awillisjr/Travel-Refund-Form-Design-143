# StarGaze Vacations Refund Request System

## EmailJS Integration
This application uses **EmailJS** for reliable email delivery of refund requests to `info@stargazevacations.com`.

## 🚀 Quick Setup

### Step 1: Create EmailJS Account
1. Visit [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month included)

### Step 2: Add Email Service
1. Login to your EmailJS dashboard
2. Add a new email service (Gmail, Outlook, or custom SMTP)
3. Configure the service with your `info@stargazevacations.com` email

### Step 3: Create Email Template
1. Go to **Email Templates** in EmailJS
2. Create a new template with the required variables:
```
Subject: Refund Request - {{booking_number}}

Variables:
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
- {{formatted_details}} - Complete formatted request
```

### Step 4: Update Configuration
Replace the placeholder in `src/services/emailService.js`:
```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id',
  TEMPLATE_ID: 'your_template_id',
  PUBLIC_KEY: 'your_public_key'
};
```

## ✨ Features

### Email Service Features
- **Free Tier**: 200 emails/month included
- **Simple Integration**: No backend required
- **Multiple Providers**: Works with Gmail, Outlook, Yahoo
- **Template System**: Easy template management
- **Error Handling**: Graceful fallback system

### Form Features
- **Professional Design**: Clean, modern interface
- **Form Validation**: Complete input validation
- **Mobile Responsive**: Works on all devices
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during submission

### Security Features
- **Secure Transmission**: Data sent securely
- **Local Backup**: Fallback storage if needed
- **Error Recovery**: Multiple fallback methods
- **Input Validation**: Prevents invalid submissions

## 🔧 Development Mode

When running in development mode:
- Email sending is simulated
- Console logs show detailed information
- No actual emails are sent
- Local storage backup is active

## 📧 Support

For assistance:
- 📞 Phone: 1-844-782-7429
- ✉️ Email: info@stargazevacations.com
- 📚 [EmailJS Documentation](https://www.emailjs.com/docs/)

## 🔒 Privacy & Security

This system ensures:
- Secure handling of customer data
- No data stored permanently
- Encrypted transmission of information
- Multiple layers of error handling

---

For detailed setup instructions, click the "Setup Guide" button in the application.