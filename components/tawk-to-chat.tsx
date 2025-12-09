'use client'

import Script from 'next/script'
import { useEffect } from 'react'

/**
 * Tawk.to 在线客服聊天组件
 * 
 * 使用说明：
 * 1. 访问 https://www.tawk.to/ 注册账户
 * 2. 创建新的 Property（网站）
 * 3. 在 Dashboard 中找到你的 Property ID 和 Widget ID
 * 4. 在项目根目录创建 .env.local 文件，添加以下内容：
 *    NEXT_PUBLIC_TAWK_PROPERTY_ID=你的PropertyID
 *    NEXT_PUBLIC_TAWK_WIDGET_ID=你的WidgetID
 * 
 * 接收消息到后台：
 * 5. 在 Tawk.to Dashboard > Settings > Webhooks 中配置 Webhook URL
 * 6. Webhook URL: https://yourdomain.com/api/tawk/webhook
 * 7. 选择触发事件：Chat Message (当有新消息时)
 * 
 * 或者，如果你想直接在这里设置，可以取消下面的注释并填入你的 ID：
 */
// const TAWK_PROPERTY_ID = '你的PropertyID'
// const TAWK_WIDGET_ID = '你的WidgetID'

// 从环境变量获取 tawk.to 配置，如果没有则使用默认值
const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || '69328685c5b7fb19815b36f1'
const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || 'default'

export function TawkToChat() {
  // 如果没有配置，不渲染任何内容
  if (!TAWK_PROPERTY_ID || !TAWK_WIDGET_ID) {
    // 开发环境下显示提示信息
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Tawk.to 未配置。请在 .env.local 文件中设置 NEXT_PUBLIC_TAWK_PROPERTY_ID 和 NEXT_PUBLIC_TAWK_WIDGET_ID'
      )
    }
    return null
  }

  useEffect(() => {
    // 监听 Tawk.to API 事件，用于调试
    if (typeof window !== 'undefined' && (window as any).Tawk_API) {
      const Tawk_API = (window as any).Tawk_API;

      // 当聊天窗口加载完成
      Tawk_API.onLoad = function() {
        console.log('✅ Tawk.to 聊天窗口已加载');
      };

      // 当有新消息时（这个事件在 Tawk.to 中可能不总是可用）
      Tawk_API.onChatMessageReceived = function(data: any) {
        console.log('📩 收到新消息:', data);
        // 注意：这个事件可能不会触发，主要依赖 Webhook
      };

      // 当聊天开始时
      Tawk_API.onChatStarted = function(data: any) {
        console.log('💬 聊天开始:', data);
      };

      // 当聊天结束时
      Tawk_API.onChatEnded = function(data: any) {
        console.log('👋 聊天结束:', data);
      };
    }
  }, []);

  return (
    <Script
      id="tawk-to-script"
      strategy="afterInteractive"
      onLoad={() => {
        // 确保 Tawk_API 对象可用
        if (typeof window !== 'undefined') {
          (window as any).Tawk_API = (window as any).Tawk_API || {};
          (window as any).Tawk_LoadStart = new Date();
        }
      }}
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `,
      }}
    />
  )
}

