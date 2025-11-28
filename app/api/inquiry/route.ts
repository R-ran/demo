import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';


// 验证环境变量
if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.RECV_MAIL) {
  throw new Error('Missing required environment variables for SMTP');
}

const transporter = nodemailer.createTransport({
  host: 'smtp.ym.163.com',
  port: 994,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
 
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, country = 'Not provided', message } = body;

    // 基础验证
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    await transporter.sendMail({
      from: `"HBOWA Web" <${process.env.SMTP_USER}>`,
      to: process.env.RECV_MAIL,
      subject: `New Inquiry from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Country:</strong> ${country || 'Not provided'}</p>
        <p><strong>Message:</strong><br/>${message}</p>
        <hr/>
        <p><em>Sent from your website contact form</em></p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}