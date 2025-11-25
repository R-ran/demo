// app/api/inquiry/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER, // @qq.com
    pass: process.env.SMTP_PASS, // 16位授权码
  },
})

export async function POST(req: NextRequest) {
  const { name, email, phone, country, message } = await req.json()

  await transporter.sendMail({
    from: `"HBOWA Web" <${process.env.SMTP_USER}>`,
    to: process.env.RECV_MAIL, // 可填同一个 QQ 邮箱
    subject: `New Inquiry from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p >
      <p><strong>Email:</strong> ${email}</p >
      <p><strong>Phone:</strong> ${phone}</p >
      <p><strong>Country:</strong> ${country}</p >
      <p><strong>Message:</strong><br/>${message}</p >
    `,
  })

  return NextResponse.json({ ok: true })
}