import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY || "no_key");

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is missing from environment variables");
    return NextResponse.json(
      { error: "Mail server configuration missing" },
      { status: 500 },
    );
  }

  try {
    const { name, phone, age, concern, email } = await req.json();

    // 1. Send Notification to Clinic
    const clinicEmailPromise = resend.emails.send({
      from: "The Blissful Station Website <inquiry@theblissfulstation.com>",
      to: ["kinstelsolutions@gmail.com"],
      subject: `New Lead: ${name} (${concern})`,
      replyTo: email,
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
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email Address:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone / WhatsApp:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Age:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${age || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Primary Concern:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${concern}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #999;">
            &copy; ${new Date().getFullYear()} The Blissful Station. All rights reserved.
          </div>
        </div>
      `,
    });

    // 2. Send Confirmation to User
    const userEmailPromise = resend.emails.send({
      from: "The Blissful Station <inquiry@theblissfulstation.com>",
      to: [email],
      subject: "We Have Received Your Request - The Blissful Station",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background-color: #214D3E; color: white; padding: 40px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-family: serif;">The Blissful Station</h1>
            <p style="margin-top: 10px; opacity: 0.9; font-size: 16px;">Expert Psychological Counseling</p>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="color: #214D3E; margin-top: 0;">Hello ${name},</h2>
            <p style="font-size: 16px;">Thank you for reaching out to us. We have received your consultation request regarding <strong>${concern}</strong>.</p>
            <p style="font-size: 16px;">Our team is reviewing your details, and a therapist will contact you within the next <strong>2 to 4 hours</strong> to schedule your initial session.</p>
            <div style="margin: 30px 0; padding: 20px; background-color: #fcfcfc; border-left: 4px solid #B49463;">
              <p style="margin: 0; font-style: italic; color: #555;">"Your healing journey is a marathon, not a sprint. We are honored to walk this path with you."</p>
            </div>
            <p style="font-size: 16px;">If you have any urgent queries, feel free to reply to this email or call us at <a href="tel:+919793743769" style="color: #214D3E; font-weight: bold; text-decoration: none;">+91 97937 43769</a>.</p>
            <p style="margin-top: 30px; font-size: 16px;">Warm regards,<br><strong>Team Blissful Station</strong></p>
          </div>
          <div style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eee;">
            <p style="margin: 0; font-size: 12px; color: #999;">Vikalp Khand, Gomti Nagar, Lucknow, UP 226010</p>
          </div>
        </div>
      `,
    });

    // Wait for both emails to send
    const [clinicRes, userRes] = await Promise.all([
      clinicEmailPromise,
      userEmailPromise,
    ]);

    if (clinicRes.error) {
      console.error("Clinic Email Error:", clinicRes.error);
      return NextResponse.json(
        {
          error: (clinicRes.error as any).message || "Failed to notify clinic",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, id: clinicRes.data?.id });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
