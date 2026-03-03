# Gravity Forms Integration Guide

This guide explains how to integrate Gravity Forms from WordPress into your Next.js frontend.

## Prerequisites

1. WordPress installation with Gravity Forms plugin installed and activated
2. Gravity Forms REST API enabled
3. WordPress REST API accessible

## Setup Steps

### 1. WordPress Configuration

#### Enable Gravity Forms REST API

Add this to your WordPress theme's `functions.php` or a custom plugin:

```php
<?php
// Enable Gravity Forms REST API
add_filter('gform_rest_api_enabled', '__return_true');

// Create custom endpoint to render forms
add_action('rest_api_init', function() {
  register_rest_route('custom/v1', '/render-form/(?P<id>\\d+)', array(
    'methods' => 'GET',
    'callback' => 'render_gravity_form_callback',
    'permission_callback' => '__return_true'
  ));
});

function render_gravity_form_callback($request) {
  $form_id = $request['id'];

  if (!class_exists('GFForms')) {
    return new WP_Error('no_gravity_forms', 'Gravity Forms is not installed', array('status' => 404));
  }

  ob_start();
  gravity_form($form_id, false, false, false, '', true, 1);
  $html = ob_get_clean();

  return array(
    'html' => $html,
    'form_id' => $form_id
  );
}
```

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
WORDPRESS_API_URL=https://your-wordpress-site.com
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com

# Optional: For authenticated requests
WORDPRESS_API_KEY=your_api_key_here
```

### 3. Usage in Next.js

#### Using the GravityForm Component

```tsx
import { GravityForm } from '@/components/forms/GravityForm';

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <GravityForm
        formId={1}
        onSuccess={() => console.log('Form submitted successfully!')}
        onError={(error) => console.error('Form error:', error)}
      />
    </div>
  );
}
```

#### Replace Existing Forms

To replace the existing contact form with a Gravity Form:

**Before:**
```tsx
<ContactForm />
```

**After:**
```tsx
<GravityForm formId={1} />
```

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
