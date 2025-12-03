/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turboPack: {
    root: 'C:/Users/R_ran/Desktop/web'
  },
  // experimental: {
  //   turbopack: {root: '.'}
  // },
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-cache, no-store, must-revalidate',
            },
          ],
        }
 



export default nextConfig
