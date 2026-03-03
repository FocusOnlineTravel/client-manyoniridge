import { NextRequest, NextResponse } from 'next/server';

/**
 * Fetch Gravity Form Structure
 *
 * Returns the form structure (fields, labels, validation) without the HTML.
 * This allows the frontend to render the form using custom components.
 */

export async function GET(
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
    // Fetch form structure from Gravity Forms REST API
    const apiUrl = `${wordpressUrl}/wp-json/gf/v2/forms/${formId}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add authentication if configured
    const username = process.env.WORDPRESS_USER;
    const password = process.env.WORDPRESS_APP_PASSWORD;

    console.log('Fetching form from:', apiUrl);
    console.log('Has auth credentials:', !!(username && password));

    if (username && password) {
      const auth = Buffer.from(`${username}:${password}`).toString('base64');
      headers['Authorization'] = `Basic ${auth}`;
    }

    const response = await fetch(apiUrl, {
      headers,
      cache: 'no-store',
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('WordPress API error:', errorText);
      throw new Error(`WordPress API returned ${response.status}: ${response.statusText} - ${errorText}`);
    }

    const formData = await response.json();

    // Transform Gravity Forms structure to simpler format
    const transformedData = {
      id: formData.id,
      title: formData.title,
      description: formData.description || '',
      fields: formData.fields.map((field: any) => ({
        id: field.id,
        type: field.type,
        label: field.label,
        isRequired: field.isRequired || false,
        placeholder: field.placeholder || '',
        description: field.description || '',
        choices: field.choices || [],
        inputs: field.inputs || [],
        defaultValue: field.defaultValue || '',
      })),
      button: {
        text: formData.button?.text || 'Submit',
      },
      confirmations: formData.confirmations?.[0] || {},
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching Gravity Form structure:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch form structure',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
