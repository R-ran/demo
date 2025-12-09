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
    // 设置 Tawk.to API 回调函数
    if (typeof window !== 'undefined') {
      // 等待 Tawk_API 对象加载
      const setupTawkAPI = () => {
        const Tawk_API = (window as any).Tawk_API;
        
        if (!Tawk_API) {
          // 如果 Tawk_API 还没加载，等待一下再试
          setTimeout(setupTawkAPI, 100);
          return;
        }

        // 强制设置语言为英文的函数
        const setLanguageToEnglish = () => {
          try {
            // 方法1: 使用 setAttributes 设置访客语言（推荐方法）
            if (Tawk_API.setAttributes) {
              Tawk_API.setAttributes({
                'localeName': 'en', // 英文
                'language': 'en'
              }, function(error: any) {
                if (error) {
                  console.warn('⚠️ 设置 Tawk.to 语言失败:', error);
                } else {
                  console.log('✅ Tawk.to 语言已设置为英文 (en)');
                }
              });
            }

            // 方法2: 尝试直接设置语言（如果 API 支持）
            if (typeof Tawk_API.setLocale === 'function') {
              Tawk_API.setLocale('en');
              console.log('✅ Tawk.to 语言已通过 setLocale 设置为英文');
            }

            // 方法3: 设置访客对象属性
            if (Tawk_API.visitor) {
              Tawk_API.visitor.localeName = 'en';
              Tawk_API.visitor.language = 'en';
            }
          } catch (error) {
            console.warn('⚠️ 设置 Tawk.to 语言时出错:', error);
          }
        };

        // 当聊天窗口加载完成
        const originalOnLoad = Tawk_API.onLoad;
        Tawk_API.onLoad = function() {
          console.log('✅ Tawk.to 聊天窗口已加载');
          
          // 调用原始 onLoad（如果存在）
          if (typeof originalOnLoad === 'function') {
            originalOnLoad();
          }
          
          // 设置语言为英文
          setLanguageToEnglish();
          
          // 延迟再次设置，确保生效
          setTimeout(setLanguageToEnglish, 500);
        };

        // 当有新消息时
        Tawk_API.onChatMessageReceived = function(data: any) {
          console.log('📩 收到新消息:', data);
        };

        // 当聊天开始时
        Tawk_API.onChatStarted = function(data: any) {
          console.log('💬 聊天开始:', data);
        };

        // 当聊天结束时
        Tawk_API.onChatEnded = function(data: any) {
          console.log('👋 聊天结束:', data);
        };

        // 当聊天窗口显示时，再次确保语言设置
        Tawk_API.onWidgetShow = function() {
          setLanguageToEnglish();
        };

        // 如果 Tawk.to 已经加载，立即设置语言
        if (Tawk_API.isLoaded && Tawk_API.isLoaded()) {
          setLanguageToEnglish();
        }
      };

      // 开始设置
      setupTawkAPI();
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
          
          // 预先设置语言相关的回调
          Tawk_API.onLoad = function() {
            // 强制设置语言为英文
            if (Tawk_API.setAttributes) {
              Tawk_API.setAttributes({
                'localeName': 'en',
                'language': 'en'
              }, function(error) {
                if (!error) {
                  console.log('✅ Tawk.to 语言已设置为英文');
                }
              });
            }
          };
          
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

