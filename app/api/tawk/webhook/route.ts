import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// 验证环境变量
if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.RECV_MAIL) {
  console.warn('⚠️ SMTP 环境变量未配置，Tawk.to webhook 邮件通知功能将不可用');
}

const transporter = process.env.SMTP_USER && process.env.SMTP_PASS
  ? nodemailer.createTransport({
      host: 'smtp.ym.163.com',
      port: 994,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

/**
 * Tawk.to Webhook 处理
 * 
 * 配置说明：
 * 1. 登录 Tawk.to 后台 (https://dashboard.tawk.to/)
 * 2. 进入 Settings > Webhooks
 * 3. 添加新的 Webhook URL: https://yourdomain.com/api/tawk/webhook
 * 4. 选择触发事件：Chat Message (当有新消息时触发)
 * 
 * 可选：设置环境变量 TAWK_WEBHOOK_SECRET 用于验证请求
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 记录收到的 webhook 数据（用于调试）
    console.log('📩 收到 Tawk.to Webhook:', JSON.stringify(body, null, 2));

    // 验证 webhook secret（如果设置了）
    const webhookSecret = process.env.TAWK_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = req.headers.get('x-tawk-signature');
      // 这里可以根据 Tawk.to 的文档实现签名验证
      // 目前 Tawk.to 可能不提供签名验证，所以这是可选的
    }

    // 提取消息信息
    const messageType = body.type || body.event;
    const message = body.message || body.chat || body.visitor;

    // 处理不同类型的消息事件
    if (messageType === 'chat:start' || messageType === 'chat:message' || body.chat) {
      const chatData = body.chat || body;
      const visitorName = chatData.visitor?.name || chatData.name || '访客';
      const visitorEmail = chatData.visitor?.email || chatData.email || '';
      const messageText = chatData.messages?.[0]?.message || chatData.message || '';
      const timestamp = new Date().toLocaleString('zh-CN');

      // 发送邮件通知
      if (transporter && process.env.RECV_MAIL) {
        try {
          await transporter.sendMail({
            from: `"HBOWA Web" <${process.env.SMTP_USER}>`,
            to: process.env.RECV_MAIL,
            subject: `新消息来自 Tawk.to 聊天 - ${visitorName}`,
            html: `
              <h2>新的聊天消息</h2>
              <p><strong>访客姓名:</strong> ${visitorName}</p>
              <p><strong>访客邮箱:</strong> ${visitorEmail || '未提供'}</p>
              <p><strong>消息内容:</strong></p>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
                ${messageText.replace(/\n/g, '<br>')}
              </div>
              <p><strong>时间:</strong> ${timestamp}</p>
              <hr/>
              <p><em>此消息来自网站 Tawk.to 聊天系统</em></p>
              <p><a href="https://dashboard.tawk.to/" target="_blank">查看完整对话</a></p>
            `,
          });
          console.log('✅ Tawk.to 消息邮件通知已发送');
        } catch (emailError) {
          console.error('❌ 发送邮件失败:', emailError);
        }
      }

      // 这里可以添加其他处理逻辑，比如：
      // - 保存到数据库
      // - 发送到 Slack/Discord
      // - 触发其他业务逻辑
    }

    // 返回成功响应
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook received successfully' 
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Tawk.to Webhook 处理错误:', error);
    return NextResponse.json({ 
      error: 'Failed to process webhook',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// 支持 GET 请求用于测试
export async function GET() {
  return NextResponse.json({ 
    message: 'Tawk.to Webhook endpoint is active',
    instructions: 'Configure this URL in Tawk.to Dashboard > Settings > Webhooks'
  });
}

