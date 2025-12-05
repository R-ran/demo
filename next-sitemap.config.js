module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cnxhanchor.com/',  // 站点 URL
    generateRobotsTxt: true, // 可选，生成 robots.txt 文件
    changefreq: 'daily', // 默认的更新频率
    priority: 0.6, // 默认的页面优先级
    sitemapSize: 8000, // 可选，限制 sitemap 文件的最大大小
    // 如果需要更复杂的配置，可以使用以下字段：
    // exclude: ['/path-to-exclude'],  // 排除某些页面
    // additionalPaths: async (config) => [{ url: '/additional-page', lastModified: new Date() }]
  }
  