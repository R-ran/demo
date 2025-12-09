import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

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
 * 验证 Tawk.to Webhook 签名 (HMAC-SHA1)
 */
function verifySignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) {
    return false;
  }

  // Tawk.to 使用 HMAC-SHA1 签名
  const hmac = crypto.createHmac('sha1', secret);
  hmac.update(payload);
  const expectedSignature = hmac.digest('hex');

  // 使用时间安全比较防止时序攻击
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * Tawk.to Webhook 处理
 * 
 * 配置说明：
 * 1. 登录 Tawk.to 后台 (https://dashboard.tawk.to/)
 * 2. 进入 Settings > Webhooks
 * 3. 添加新的 Webhook URL: https://yourdomain.com/api/tawk/webhook
 * 4. 选择触发事件：Chat Start, Chat Message 等
 * 5. 复制 Secret Key 到环境变量 TAWK_WEBHOOK_SECRET
 * 
 * 环境变量：
 * - TAWK_WEBHOOK_SECRET: Tawk.to Webhook Secret Key（用于验证请求）
 * - SMTP_USER, SMTP_PASS, RECV_MAIL: 邮件通知配置（可选）
 */
export async function POST(req: NextRequest) {
  try {
    // 获取原始请求体用于签名验证
    const rawBody = await req.text();
    
    // 记录所有请求头（用于调试）
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });
    console.log('📥 收到 Webhook 请求头:', JSON.stringify(headers, null, 2));

    // 解析请求体
    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('❌ JSON 解析失败:', parseError);
      return NextResponse.json({ 
        error: 'Invalid JSON payload' 
      }, { status: 400 });
    }

    // 记录收到的 webhook 数据（用于调试）
    console.log('📩 收到 Tawk.to Webhook 数据:', JSON.stringify(body, null, 2));
    console.log('📋 事件类型:', body.event || body.type || '未知');

    // 验证 webhook secret（如果设置了）
    const webhookSecret = process.env.TAWK_WEBHOOK_SECRET;
    if (webhookSecret) {
      // Tawk.to 可能使用不同的 header 名称，尝试多个可能的名称
      const signature = 
        req.headers.get('x-tawk-signature') ||
        req.headers.get('x-signature') ||
        req.headers.get('signature') ||
        req.headers.get('x-hub-signature');

      if (signature) {
        const isValid = verifySignature(rawBody, signature, webhookSecret);
        if (!isValid) {
          console.error('❌ Webhook 签名验证失败');
          return NextResponse.json({ 
            error: 'Invalid signature' 
          }, { status: 401 });
        }
        console.log('✅ Webhook 签名验证通过');
      } else {
        console.warn('⚠️ 未找到签名 header，跳过签名验证');
      }
    } else {
      console.warn('⚠️ TAWK_WEBHOOK_SECRET 未设置，跳过签名验证');
    }

    // 提取事件类型和消息信息
    const eventType = body.event || body.type || '';
    const chatData = body.chat || body.data || body;
    
    // 处理不同类型的消息事件
    const isChatStart = eventType === 'chat:start' || eventType === 'Chat Start' || eventType.toLowerCase().includes('start');
    const isChatMessage = eventType === 'chat:message' || eventType === 'Chat Message' || eventType.toLowerCase().includes('message');
    const isChatEnd = eventType === 'chat:end' || eventType === 'Chat End' || eventType.toLowerCase().includes('end');

    if (isChatStart || isChatMessage || isChatEnd || chatData) {
      // 提取访客信息
      const visitor = chatData.visitor || chatData.visitorData || {};
      const visitorName = visitor.name || chatData.name || visitor.displayName || '访客';
      const visitorEmail = visitor.email || chatData.email || '';
      const visitorPhone = visitor.phone || chatData.phone || '';
      const visitorId = visitor.id || chatData.visitorId || '';
      
      // 提取消息内容
      let messageText = '';
      if (chatData.messages && Array.isArray(chatData.messages) && chatData.messages.length > 0) {
        // 获取最后一条消息
        const lastMessage = chatData.messages[chatData.messages.length - 1];
        messageText = lastMessage.message || lastMessage.text || '';
      } else if (chatData.message) {
        messageText = chatData.message;
      } else if (chatData.text) {
        messageText = chatData.text;
      }

      // 提取聊天信息
      const chatId = chatData.id || chatData.chatId || '';
      const timestamp = chatData.timestamp 
        ? new Date(chatData.timestamp).toLocaleString('zh-CN')
        : new Date().toLocaleString('zh-CN');

      console.log('👤 访客信息:', {
        name: visitorName,
        email: visitorEmail,
        phone: visitorPhone,
        id: visitorId
      });
      console.log('💬 消息内容:', messageText || '(无消息内容)');
      console.log('🆔 聊天ID:', chatId);

      // 根据事件类型发送不同的邮件通知
      if (transporter && process.env.RECV_MAIL) {
        try {
          let subject = '';
          let emailContent = '';

          if (isChatStart) {
            subject = `新访客开始聊天 - ${visitorName}`;
            emailContent = `
              <h2>🟢 新访客开始聊天</h2>
              <p><strong>访客姓名:</strong> ${visitorName}</p>
              <p><strong>访客邮箱:</strong> ${visitorEmail || '未提供'}</p>
              <p><strong>访客电话:</strong> ${visitorPhone || '未提供'}</p>
              <p><strong>访客ID:</strong> ${visitorId || '未知'}</p>
              <p><strong>聊天ID:</strong> ${chatId || '未知'}</p>
              ${messageText ? `<p><strong>初始消息:</strong></p>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
                ${messageText.replace(/\n/g, '<br>')}
              </div>` : ''}
              <p><strong>时间:</strong> ${timestamp}</p>
              <hr/>
              <p><em>此通知来自网站 Tawk.to 聊天系统</em></p>
              <p><a href="https://dashboard.tawk.to/" target="_blank">查看完整对话</a></p>
            `;
          } else if (isChatMessage) {
            subject = `新消息来自 Tawk.to 聊天 - ${visitorName}`;
            emailContent = `
              <h2>💬 新的聊天消息</h2>
              <p><strong>访客姓名:</strong> ${visitorName}</p>
              <p><strong>访客邮箱:</strong> ${visitorEmail || '未提供'}</p>
              <p><strong>访客电话:</strong> ${visitorPhone || '未提供'}</p>
              <p><strong>聊天ID:</strong> ${chatId || '未知'}</p>
              <p><strong>消息内容:</strong></p>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
                ${messageText.replace(/\n/g, '<br>')}
              </div>
              <p><strong>时间:</strong> ${timestamp}</p>
              <hr/>
              <p><em>此消息来自网站 Tawk.to 聊天系统</em></p>
              <p><a href="https://dashboard.tawk.to/" target="_blank">查看完整对话</a></p>
            `;
          } else if (isChatEnd) {
            subject = `聊天结束 - ${visitorName}`;
            emailContent = `
              <h2>🔴 聊天已结束</h2>
              <p><strong>访客姓名:</strong> ${visitorName}</p>
              <p><strong>访客邮箱:</strong> ${visitorEmail || '未提供'}</p>
              <p><strong>聊天ID:</strong> ${chatId || '未知'}</p>
              <p><strong>时间:</strong> ${timestamp}</p>
              <hr/>
              <p><em>此通知来自网站 Tawk.to 聊天系统</em></p>
            `;
          } else {
            subject = `Tawk.to 事件通知 - ${visitorName}`;
            emailContent = `
              <h2>📢 Tawk.to 事件通知</h2>
              <p><strong>事件类型:</strong> ${eventType || '未知'}</p>
              <p><strong>访客姓名:</strong> ${visitorName}</p>
              <p><strong>访客邮箱:</strong> ${visitorEmail || '未提供'}</p>
              <p><strong>聊天ID:</strong> ${chatId || '未知'}</p>
              ${messageText ? `<p><strong>消息内容:</strong></p>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
                ${messageText.replace(/\n/g, '<br>')}
              </div>` : ''}
              <p><strong>时间:</strong> ${timestamp}</p>
              <hr/>
              <p><em>此通知来自网站 Tawk.to 聊天系统</em></p>
              <p><strong>原始数据:</strong></p>
              <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px; overflow-x: auto;">${JSON.stringify(body, null, 2)}</pre>
            `;
          }

          await transporter.sendMail({
            from: `"HBOWA Web" <${process.env.SMTP_USER}>`,
            to: process.env.RECV_MAIL,
            subject: subject,
            html: emailContent,
          });
          console.log('✅ Tawk.to 消息邮件通知已发送');
        } catch (emailError) {
          console.error('❌ 发送邮件失败:', emailError);
        }
      } else {
        console.log('ℹ️ 邮件通知未配置，跳过发送邮件');
      }

      // 这里可以添加其他处理逻辑，比如：
      // - 保存到数据库
      // - 发送到 Slack/Discord
      // - 触发其他业务逻辑
    } else {
      console.log('⚠️ 未识别的事件类型，记录原始数据');
    }

    // 返回成功响应
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook received successfully',
      event: eventType
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Tawk.to Webhook 处理错误:', error);
    console.error('错误堆栈:', error instanceof Error ? error.stack : '无堆栈信息');
    return NextResponse.json({ 
      error: 'Failed to process webhook',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// 支持 GET 请求用于测试
export async function GET() {
  const webhookSecret = process.env.TAWK_WEBHOOK_SECRET;
  return NextResponse.json({ 
    message: 'Tawk.to Webhook endpoint is active',
    instructions: 'Configure this URL in Tawk.to Dashboard > Settings > Webhooks',
    secretConfigured: !!webhookSecret,
    endpoint: '/api/tawk/webhook'
  });
}

