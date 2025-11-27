/**
 * 页面标题组件
 * 用于在客户端组件中显示统一的页面标题
 */

import { getPageTitle } from "@/lib/page-titles"

interface PageTitleProps {
  pathname: string
  className?: string
}

export function PageTitle({ pathname, className = "text-4xl md:text-5xl font-bold text-center mb-4" }: PageTitleProps) {
  const pageConfig = getPageTitle(pathname)
  const title = pageConfig.h1Title || pageConfig.title

  // 如果标题包含 HTML，使用 dangerouslySetInnerHTML
  if (title.includes('<')) {
    return (
      <h1 
        className={className}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    )
  }

  // 普通文本标题
  return <h1 className={className}>{title}</h1>
}

