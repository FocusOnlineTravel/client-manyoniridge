import { NextRequest, NextResponse } from 'next/server';

/**
 * Submit Gravity Form Entry
 *
 * Submits form data to WordPress Gravity Forms via REST API
 */

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ formId: string }> }
) {
  const { formId } = await params;

  const wordpressUrl = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_URL;

  if (!wordpressUrl) {
    return NextResponse.json(
      { error: 'WordPress API URL not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    // Gravity Forms expects input_ prefix for all fields
    const transformedData: any = {};

    Object.keys(body).forEach(key => {
      // Extract field ID from field name (e.g., "input_1" -> "1")
      const match = key.match(/input_(\d+)(?:_(.+))?/);
      if (match) {
        const fieldId = match[1];
        const subField = match[2];
        const value = body[key];

        // Keep the input_ prefix as Gravity Forms expects it
        if (subField) {
          // Handle complex fields like name (input_1_3, input_1_6)
          transformedData[key] = value;
        } else {
          // Handle checkboxes - convert [true] to {"10.1": "Yes"}
          if (Array.isArray(value) && value.length > 0) {
            transformedData[`input_${fieldId}_1`] = value[0] ? 'Yes' : '';
          } else {
            transformedData[key] = value;
          }
        }
      }
    });

    // Submit to Gravity Forms REST API
    const apiUrl = `${wordpressUrl}/wp-json/gf/v2/forms/${formId}/submissions`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add authentication if configured
    const username = process.env.WORDPRESS_USER;
    const password = process.env.WORDPRESS_APP_PASSWORD;

    if (username && password) {
      const auth = Buffer.from(`${username}:${password}`).toString('base64');
      headers['Authorization'] = `Basic ${auth}`;
    }

    console.log('Submitting to:', apiUrl);
    console.log('Form data:', transformedData);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(transformedData),
    });

    console.log('Submission response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('WordPress submission error:', errorText);
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      throw new Error(errorData.message || `Submission failed: ${response.statusText}`);
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      entry_id: result.entry_id,
      confirmation_message: result.confirmation_message || 'Thank you for your submission!',
    });
  } catch (error) {
    console.error('Error submitting Gravity Form:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit form',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
