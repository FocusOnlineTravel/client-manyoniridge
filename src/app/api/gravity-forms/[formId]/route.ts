import { NextRequest, NextResponse } from 'next/server';

/**
 * Gravity Forms API Route
 *
 * This endpoint fetches a Gravity Form from WordPress and returns its HTML.
 * Requires Gravity Forms REST API to be enabled in WordPress.
 *
 * Environment Variables Required:
 * - WORDPRESS_API_URL: The base URL of your WordPress installation
 * - WORDPRESS_API_KEY: (Optional) API key for authenticated requests
 */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ formId: string }> }
) {
  const { formId } = await params;

  // Get WordPress API URL from environment
  const wordpressUrl = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_URL;

  if (!wordpressUrl) {
    return NextResponse.json(
      { error: 'WordPress API URL not configured' },
      { status: 500 }
    );
  }

  try {
    // Fetch form from Gravity Forms REST API
    const apiUrl = `${wordpressUrl}/wp-json/gf/v2/forms/${formId}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add authentication if API key is configured
    const apiKey = process.env.WORDPRESS_API_KEY;
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(apiUrl, {
      headers,
      cache: 'no-store', // Don't cache form data
    });

    if (!response.ok) {
      throw new Error(`WordPress API returned ${response.status}: ${response.statusText}`);
    }

    const formData = await response.json();

    // Generate form HTML
    // Note: In production, you might want to render the form server-side
    // or use Gravity Forms' shortcode rendering endpoint
    const html = await renderGravityForm(wordpressUrl, formId);

    return NextResponse.json({
      success: true,
      formId,
      html,
      formData,
    });
  } catch (error) {
    console.error('Error fetching Gravity Form:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch form',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Render a Gravity Form by fetching its HTML from WordPress
 */
async function renderGravityForm(wordpressUrl: string, formId: string): Promise<string> {
  try {
    // Option 1: Use WordPress REST API to render shortcode
    // This requires a custom endpoint in WordPress
    const renderUrl = `${wordpressUrl}/wp-json/custom/v1/render-form/${formId}`;

    const response = await fetch(renderUrl, {
      cache: 'no-store',
    });

    if (response.ok) {
      const data = await response.json();
      return data.html || '';
    }

    // Option 2: Fallback - Return a message to embed via iframe
    return `
      <div class="gravity-form-embed">
        <p class="text-gray-600 mb-4">
          To display this form, please add the following code to your WordPress theme:
        </p>
        <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
add_action('rest_api_init', function() {
  register_rest_route('custom/v1', '/render-form/(?P<id>\\d+)', array(
    'methods' => 'GET',
    'callback' => function($request) {
      $form_id = $request['id'];
      ob_start();
      gravity_form($form_id, false, false, false, '', true, 1);
      $html = ob_get_clean();
      return array('html' => $html);
    },
  ));
});
        </pre>
        <p class="text-sm text-gray-600 mt-4">
          Or embed using iframe:
          <code class="bg-gray-100 px-2 py-1 rounded">${wordpressUrl}/?gf_page=form&id=${formId}</code>
        </p>
      </div>
    `;
  } catch (error) {
    console.error('Error rendering form:', error);
    return `<div class="text-red-600">Error rendering form: ${error instanceof Error ? error.message : 'Unknown error'}</div>`;
  }
}
