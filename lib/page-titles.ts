/**
 * 页面标题配置
 * 统一管理所有页面的标题，自动同步到 metadata 和 h1 标签
 */

export interface PageTitleConfig {
  // 页面标题（用于浏览器标签和SEO）
  title: string
  // H1标签显示的标题（可以包含HTML，如高亮部分）
  h1Title?: string
  // 页面描述
  description: string
  // 关键词
  keywords?: string[]
}

// 所有页面的标题配置
export const pageTitles: Record<string, PageTitleConfig> = {
  // 首页
  '/': {
    title: 'Home',
    h1Title: 'Home',
    description: 'XINHONG - Leading provider of geotechnical anchoring solutions including self-drilling anchor bolts, rock bolts, and tunnel support systems. Quality anchor solutions for mining, construction, and infrastructure projects worldwide.',
    keywords: ['XINHONG', 'anchor bolt', 'rock bolt', 'geotechnical anchoring', 'self-drilling anchor', 'tunnel support', 'mining solutions'],
  },

  // About Us 页面
  '/about': {
    title: 'About Us',
    h1Title: 'About <span class="text-primary">Us</span>',
    description: 'Learn more about XINHONG company, team, and state-of-the-art manufacturing facilities. Leading provider of geotechnical anchoring solutions with over 20 years of experience.',
    keywords: ['XINHONG', 'about us', 'company history', 'manufacturing facilities', 'geotechnical solutions'],
  },

  // Products 页面
  '/products': {
    title: 'Products',
    h1Title: 'Products',
    description: 'XINHONG offers a comprehensive range of high-quality anchor bolt products including self-drilling anchor bolts, common anchor bolts, combination hollow anchor bolts, expansion-shell anchor bolts, and accessories for geotechnical applications.',
    keywords: ['XINHONG', 'anchor bolt', 'self-drilling anchor', 'rock bolt', 'geotechnical products', 'tunnel support', 'mining equipment'],
  },

  // Contact 页面
  '/contact': {
    title: 'Contact Us',
    h1Title: 'Contact Us',
    description: 'Contact XINHONG for inquiries about anchor bolt products, technical support, or partnership opportunities. Get in touch with our team for geotechnical anchoring solutions.',
    keywords: ['XINHONG', 'contact', 'inquiry', 'anchor bolt', 'geotechnical solutions', 'technical support'],
  },

  // News & Blogs 页面
  '/news-blogs': {
    title: 'News & Blogs',
    h1Title: '<span class="text-foreground">NEWS & </span><span class="text-primary">BLOGS</span>',
    description: 'Stay updated with the latest news, product launches, industry insights, and success stories from XINHONG. Read about anchor bolt technology, tunnel construction, and geotechnical engineering.',
    keywords: ['XINHONG', 'news', 'blogs', 'anchor bolt news', 'geotechnical engineering', 'industry insights', 'tunnel construction'],
  },

  // Successful Projects 页面
  '/successful-projects': {
    title: 'Successful Projects',
    h1Title: 'Successful Projects',
    description: 'Explore XINHONG\'s successful projects worldwide. See how our anchor bolt solutions have been used in tunnel construction, mining operations, and infrastructure projects across different continents.',
    keywords: ['XINHONG', 'successful projects', 'case studies', 'tunnel projects', 'mining projects', 'anchor bolt applications'],
  },
}

/**
 * 获取页面标题配置
 * @param pathname 页面路径
 * @returns 页面标题配置
 */
export function getPageTitle(pathname: string): PageTitleConfig {
  // 精确匹配
  if (pageTitles[pathname]) {
    return pageTitles[pathname]
  }

  // 动态路由匹配（如 /about/[section], /products/[slug] 等）
  if (pathname.startsWith('/about/')) {
    return pageTitles['/about']
  }
  if (pathname.startsWith('/products/')) {
    return {
      title: 'Product Details',
      h1Title: 'Product Details',
      description: 'Detailed information about XINHONG anchor bolt products including specifications, applications, and technical details.',
      keywords: ['XINHONG', 'anchor bolt', 'product details', 'specifications', 'geotechnical products'],
    }
  }
  if (pathname.startsWith('/news-blogs/')) {
    return pageTitles['/news-blogs']
  }
  if (pathname.startsWith('/successful-projects/')) {
    return pageTitles['/successful-projects']
  }

  // 默认返回首页配置
  return pageTitles['/']
}

/**
 * 生成完整的页面标题（包含网站名称）
 * @param pathname 页面路径
 * @returns 完整标题，如 "About Us | XINHONG"
 */
export function getFullPageTitle(pathname: string): string {
  const config = getPageTitle(pathname)
  return `${config.title} | XINHONG`
}

