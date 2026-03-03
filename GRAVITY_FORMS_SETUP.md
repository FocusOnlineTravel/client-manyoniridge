# Gravity Forms Integration Guide

This guide explains how to integrate Gravity Forms from WordPress into your Next.js frontend while maintaining full control over styling.

## Overview

This integration fetches form structure (fields, validation rules) from WordPress Gravity Forms but renders them using your own React components. This gives you:

- ✅ Full control over form styling and appearance
- ✅ Gravity Forms backend for data handling and notifications
- ✅ Your existing Input, Select, Textarea components
- ✅ Form validation managed by WordPress

## Prerequisites

1. WordPress installation with Gravity Forms plugin installed and activated
2. Gravity Forms REST API enabled
3. WordPress REST API accessible with Basic Auth

## Setup Steps

### 1. WordPress Configuration

#### Enable Gravity Forms REST API

Add this to your WordPress theme's `functions.php` or a custom plugin:

```php
<?php
// Enable Gravity Forms REST API
add_filter('gform_rest_api_enabled', '__return_true');
```

That's it! The Gravity Forms REST API v2 handles everything else.

#### Configure CORS (if WordPress is on a different domain)

Add this to your WordPress theme's `functions.php`:

```php
<?php
// Allow CORS for Next.js frontend
add_action('rest_api_init', function() {
  remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
  add_filter('rest_pre_serve_request', function($value) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Credentials: true');
    return $value;
  });
}, 15);
```

### 2. Environment Variables

Add these to your `.env.local` file:

```bash
# WordPress API Configuration
WORDPRESS_API_URL=https://backend-manyoni.focusonlinetravel.co.za
NEXT_PUBLIC_WORDPRESS_URL=https://backend-manyoni.focusonlinetravel.co.za

# WordPress Authentication (Required for Gravity Forms API)
WORDPRESS_USER=your_wordpress_username
WORDPRESS_APP_PASSWORD=your_application_password
```

**Creating an Application Password:**
1. Go to WordPress Admin → Users → Your Profile
2. Scroll to "Application Passwords"
3. Enter name (e.g., "Next.js Frontend")
4. Click "Add New Application Password"
5. Copy the password and add to `.env.local`

### 3. Usage in Next.js

#### Using the GravityFormRenderer Component (Recommended)

This component fetches the form structure from WordPress but renders it using your styled components:

```tsx
import { GravityFormRenderer } from '@/components/forms/GravityFormRenderer';

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <GravityFormRenderer
        formId={1}
        onSuccess={(data) => console.log('Form submitted!', data)}
        onError={(error) => console.error('Form error:', error)}
      />
    </div>
  );
}
```

#### Replace Existing Forms

To replace the existing contact form:

**Before:**
```tsx
<ContactForm />
```

**After:**
```tsx
<GravityFormRenderer formId={1} />
```

The form will use your existing Input, Select, Textarea, and Button components automatically!

## Form IDs

Common form IDs you'll need to create in Gravity Forms:

1. **Contact Form** (General enquiries)
   - Fields: Name, Email, Phone, Subject, Message
   - Form ID: 1

2. **Booking Enquiry Form**
   - Fields: Name, Email, Phone, Arrival Date, Departure Date, Adults, Children, Room Preference, Special Requests
   - Form ID: 2

3. **Newsletter Signup Form**
   - Fields: Email
   - Form ID: 3

## Styling Gravity Forms

Add these styles to your global CSS to match your site design:

```css
/* Gravity Forms Styling */
.gravity-form-container .gform_wrapper {
  max-width: 100%;
}

.gravity-form-container .gfield_label {
  @apply text-sm font-medium text-gray-700 mb-2 block;
}

.gravity-form-container input[type="text"],
.gravity-form-container input[type="email"],
.gravity-form-container input[type="tel"],
.gravity-form-container input[type="date"],
.gravity-form-container select,
.gravity-form-container textarea {
  @apply w-full px-4 py-3 border border-gray-300 rounded-none;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent;
  @apply transition-all duration-200;
}

.gravity-form-container .gform_button {
  @apply inline-flex items-center justify-center px-6 py-3;
  @apply bg-primary-gold text-primary-dark font-medium;
  @apply hover:bg-primary-gold/90 transition-colors;
  @apply rounded-none cursor-pointer;
}

.gravity-form-container .validation_error {
  @apply bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4;
}

.gravity-form-container .gfield_error {
  @apply border-red-500;
}

.gravity-form-container .validation_message {
  @apply text-red-600 text-sm mt-1;
}

.gravity-form-container .gform_confirmation_message {
  @apply bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded;
}
```

## Testing

1. Create a test form in WordPress Gravity Forms
2. Note the form ID
3. Use the GravityForm component with that ID
4. Test form submission and validation

## Troubleshooting

### Form Not Loading

1. Check that `WORDPRESS_API_URL` is correctly set in `.env.local`
2. Verify the Gravity Forms REST API is enabled
3. Check browser console for CORS errors
4. Verify the form ID exists in WordPress

### CORS Errors

Add the CORS configuration to your WordPress `functions.php` as shown above.

### Form Submission Not Working

1. Check Gravity Forms notification settings in WordPress
2. Verify the form is active and not in draft mode
3. Check WordPress and Gravity Forms logs for errors

## Alternative: Using Iframe

If the REST API approach doesn't work, you can embed forms via iframe:

```tsx
<iframe
  src="https://your-wordpress-site.com/?gf_page=preview&id=1"
  width="100%"
  height="800"
  frameBorder="0"
/>
```

## Support

For Gravity Forms documentation: https://docs.gravityforms.com/
For REST API documentation: https://docs.gravityforms.com/rest-api-v2/
