import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY || 'no_key');

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is missing from environment variables');
    return NextResponse.json({ error: 'Mail server configuration missing' }, { status: 500 });
  }

  try {
    const { name, phone, age, concern } = await req.json();

    // Note: To use a custom 'from' email, you must verify your domain in Resend.
    // If not verified, you can only send from onboarding@resend.dev to your own email.
    const { data, error } = await resend.emails.send({
      from: 'The Blissful Station <onboarding@resend.dev>',
      to: ['kinstelsolutions@gmail.com'],
      subject: `New Consultation Request: ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #214D3E; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Lead Captured</h1>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 16px;">You have received a new consultation request from your landing page.</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Full Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone / WhatsApp:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Age:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${age || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Primary Concern:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${concern}</td>
              </tr>
            </table>
            <p style="margin-top: 30px; font-size: 14px; color: #666; text-align: center;">
              This request was sent from the <strong>The Blissful Station</strong> Google Ads Campaign.
            </p>
          </div>
          <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #999;">
            &copy; ${new Date().getFullYear()} The Blissful Station. All rights reserved.
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      // Resend errors often have a message property. Return it or the whole error.
      const errorMessage = (error as any).message || (typeof error === 'string' ? error : 'Failed to send email via Resend');
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
