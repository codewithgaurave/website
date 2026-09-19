import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Lead from '@/models/Lead';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, sourceType, sourceUrl } = body;

    // Basic Validation
    if (!name || !phone || !email) {
      return NextResponse.json(
        { success: false, message: 'Name, Phone, and Email are required fields.' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Create a new lead record
    const newLead = await Lead.create({
      name,
      phone,
      email,
      sourceType: sourceType || 'General Contact',
      sourceUrl: sourceUrl || 'Unknown',
    });

    // Nodemailer Email Notification to Admin
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER || 'zomocookhelp@gmail.com',
          pass: process.env.SMTP_PASS || 'password', // Add credentials via .env in production
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER || '"Zomocook Leads" <zomocookhelp@gmail.com>',
        to: process.env.ADMIN_EMAIL || 'zomocookhelp@gmail.com',
        subject: `New Lead: ${sourceType || 'General Entry'}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-w: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="background-color: #024a9d; color: white; padding: 20px; text-align: center;">
                <h2 style="margin: 0;">New Zomocook Lead</h2>
              </div>
              <div style="padding: 30px;">
                <p>Hello Admin,</p>
                <p>A new lead has been submitted on the Zomocook platform. Below are the details:</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                  <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Name:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td></tr>
                  <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td></tr>
                  <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td></tr>
                  <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Source Type:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${sourceType || 'General Contact'}</td></tr>
                  <tr><td style="padding: 10px; font-weight: bold;">Source URL:</td><td style="padding: 10px;">${sourceUrl || 'Unknown'}</td></tr>
                </table>
              </div>
              <div style="background-color: #0f172a; color: white; text-align: center; padding: 15px; font-size: 12px;">
                <p style="margin: 0;">Zomocook Automated Lead System</p>
              </div>
            </div>
          </div>
        `,
      };

      // Send the email via Nodemailer
      await transporter.sendMail(mailOptions);
      console.log('Admin notification email dispatched successfully.');

    } catch (emailError) {
      console.error('Email dispatch failed, but lead was saved:', emailError);
    }

    return NextResponse.json(
      { success: true, message: 'Your requirement has been submitted successfully!', data: newLead },
      { status: 201 }
    );
    
  } catch (error: any) {
    console.error('API Contact Error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again later.', error: error.message },
      { status: 500 }
    );
  }
}
