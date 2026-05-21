import { NextResponse } from 'next/server';
import { z } from 'zod';

const bodySchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.error('[Newsletter] Mailchimp env vars not configured');
    return NextResponse.json(
      { error: 'Newsletter service is not configured.' },
      { status: 500 }
    );
  }

  const serverPrefix = apiKey.split('-')[1];
  if (!serverPrefix) {
    console.error('[Newsletter] MAILCHIMP_API_KEY missing server prefix (expected key-usXX)');
    return NextResponse.json(
      { error: 'Newsletter service is not configured.' },
      { status: 500 }
    );
  }

  let parsed;
  try {
    parsed = bodySchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  const response = await fetch(
    `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      },
      body: JSON.stringify({
        email_address: parsed.email,
        status: 'subscribed',
        tags: ['website signup'],
      }),
    }
  );

  if (response.ok) {
    return NextResponse.json({ ok: true });
  }

  const data = (await response.json().catch(() => ({}))) as {
    title?: string;
    detail?: string;
  };

  if (data.title === 'Member Exists') {
    return NextResponse.json({ ok: true, alreadySubscribed: true });
  }

  console.error('[Newsletter] Mailchimp error:', response.status, data);
  return NextResponse.json(
    { error: data.detail || 'Subscription failed. Please try again.' },
    { status: response.status }
  );
}
