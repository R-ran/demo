/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // 启用图片优化
    unoptimized: false,
    // 配置允许的外部图片域名
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // 图片格式
    formats: ['image/avif', 'image/webp'],
  },
  turboPack: {
    root: 'C:/Users/R_ran/Desktop/web'
  },
  headers: [
    {
      key: 'Cache-Control',
      value: 'no-cache, no-store, must-revalidate',
    },
  ],
  // 重定向配置
  async redirects() {
    return [
      {
        source: '/successful-projects/default/海外项目1',
        destination: '/successful-projects', // 或者改成某个正式项目详情页
        permanent: true, // 永久重定向
      },
      // 如果有更多类似的测试路径需要重定向，可以在这里继续添加
      {
        source: '/successful-projects/default/海外项目2',
        destination: '/successful-projects',
        permanent: true,
      },
      {
        source: '/successful-projects/default/国内项目1',
        destination: '/successful-projects',
        permanent: true,
      },
      {
        source: '/successful-projects/default/国内项目2',
        destination: '/successful-projects',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
