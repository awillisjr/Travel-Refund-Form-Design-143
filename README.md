# StarGaze Vacations Refund Request System

## Acumbamail Email Integration

This application now uses **Acumbamail** for professional email delivery of refund requests to `info@stargazevacations.com`.

## 🚀 Quick Setup

### Step 1: Create Acumbamail Account
1. Visit [Acumbamail.com](https://acumbamail.com/)
2. Sign up for an account
3. Choose a plan that fits your email volume needs

### Step 2: Get API Credentials
1. Login to your Acumbamail dashboard
2. Navigate to **Settings > API**
3. Generate a new API token
4. Copy the token (it starts with `acumba_`)

### Step 3: Configure Domain Authentication
1. Go to **Settings > Domains** in Acumbamail
2. Add domain: `stargazevacations.com`
3. Configure DNS records:
   ```
   SPF: v=spf1 include:acumbamail.com ~all
   DKIM: [Add the provided DKIM record]
   DMARC: v=DMARC1; p=none; rua=mailto:dmarc@stargazevacations.com
   ```

### Step 4: Update Configuration
Replace the placeholder in `src/services/acumbamailService.js`:

```javascript
const ACUMBAMAIL_CONFIG = {
  API_BASE_URL: 'https://acumbamail.com/api/1',
  API_TOKEN: 'your_actual_acumbamail_api_token', // Replace this
  FROM_EMAIL: 'info@stargazevacations.com',
  FROM_NAME: 'StarGaze Vacations'
};
```

## ✨ Features

### Professional Email Templates
- **Branded Design**: StarGaze Vacations styling
- **Mobile Responsive**: Looks great on all devices
- **Rich Content**: HTML and plain text versions
- **Professional Layout**: Clean, organized information display

### Advanced Email Capabilities
- ✅ **High Deliverability**: Enterprise-grade email delivery
- ✅ **Email Tracking**: Open and click tracking
- ✅ **Contact Management**: Automatic list additions
- ✅ **Error Handling**: Graceful fallback mechanisms
- ✅ **Security**: API token authentication

### Fallback Systems
1. **Primary**: Acumbamail API
2. **Secondary**: Webhook delivery (Zapier/Make.com)
3. **Tertiary**: Local storage with manual instructions

## 📧 Email Content Includes

- **Customer Information**: Name, booking number, contact details
- **Refund Details**: Method preference, reason, timeline
- **Digital Signature**: Legal acknowledgment
- **Professional Branding**: StarGaze Vacations styling
- **Action Items**: Clear next steps for staff
- **Contact Information**: Phone and email for follow-up

## 🔧 Testing Your Setup

1. **Submit a test refund request** through the form
2. **Check browser console** for detailed logging
3. **Verify email delivery** to `info@stargazevacations.com`
4. **Test fallback mechanisms** by temporarily using invalid credentials

## 📊 Email Analytics

Acumbamail provides detailed analytics:
- **Delivery Rates**: Track successful deliveries
- **Open Rates**: Monitor email engagement
- **Click Tracking**: See link interactions
- **Bounce Management**: Handle invalid addresses
- **List Growth**: Track contact additions

## 🛠️ Advanced Configuration

### Custom Webhooks
For additional reliability, configure webhook endpoints in `src/services/acumbamailService.js`:

```javascript
// Zapier webhook
const webhookUrl = 'https://hooks.zapier.com/hooks/catch/YOUR_ID/';

// Make.com webhook  
const makeUrl = 'https://hook.integromat.com/YOUR_ID';
```

### Contact List Management
Enable automatic contact addition:

```javascript
const ACUMBAMAIL_CONFIG = {
  LIST_ID: 'your_contact_list_id', // Add customers to this list
  // ... other config
};
```

## 🔒 Security Features

- **API Token Authentication**: Secure access to Acumbamail
- **Data Encryption**: All data transmitted securely
- **GDPR Compliance**: Privacy-compliant contact handling
- **Rate Limiting**: Prevents API abuse
- **Error Logging**: Detailed error tracking

## 📱 Mobile Optimization

The email templates are fully responsive and optimized for:
- **Desktop Email Clients**: Outlook, Thunderbird, Apple Mail
- **Web Email**: Gmail, Yahoo, Outlook.com
- **Mobile Devices**: iOS Mail, Android Gmail, mobile browsers

## 🆘 Support & Troubleshooting

### Common Issues

1. **API Token Error**: Verify token is correct and active
2. **Domain Authentication**: Ensure DNS records are properly configured
3. **Quota Exceeded**: Check your Acumbamail plan limits
4. **Delivery Issues**: Verify sender domain authentication

### Getting Help

- **Acumbamail Support**: [https://acumbamail.com/en/support/](https://acumbamail.com/en/support/)
- **Documentation**: Check the setup guide component in the app
- **Console Logging**: Detailed error messages in browser console

## 🎯 Benefits of Acumbamail

- **Professional Service**: Enterprise-grade email delivery
- **High Deliverability**: Better inbox placement than generic services
- **Rich Analytics**: Detailed reporting and insights
- **Scalability**: Grows with your business needs
- **Reliability**: Multiple fallback mechanisms
- **Compliance**: GDPR and CAN-SPAM compliant

---

**Note**: This system provides multiple layers of reliability to ensure refund requests always reach StarGaze Vacations, even if the primary email service experiences issues.