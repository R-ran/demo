'use client'

import Script from 'next/script'

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

  return (
    <Script
      id="tawk-to-script"
      strategy="afterInteractive"
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

