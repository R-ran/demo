// 共享的新闻博客数据
// 所有 news & blogs 相关页面都从这里获取数据，确保数据一致性

export type StaticArticle = {
  id: string
  title: string
  excerpt: string
  publish_date: string
  featured_image: string
  content: string
  categories?: string[]
  type?: string
  author_name?: string
}

// 静态文章数据
export const staticArticles: StaticArticle[] = [
  {
    id: "1",
    title: "Wuxi Oriental Xinhong Shines at Mining Indonesia 2024: Superior Quality Wins Global Mining Trust",
    excerpt: "Oriental Xinhong showcased its high-performance anchoring portfolio at Mining Indonesia 2024, securing major deals and international acclaim.",
    publish_date: "2024-11-14",
    featured_image: "/anchor-accessories-and-tools.jpg",
    content: `
      <h2>Abstract</h2>
      <p>From September 11–14, 2024, Mining Indonesia convened at Jakarta International Expo. Wuxi Oriental Xinhong Environmental Protection Technology Co., Ltd. ("Oriental Xinhong"), a premier Chinese mine support solutions provider, showcased its high-performance anchoring portfolio including self-drilling anchor bolts, hollow anchor rockbolts, and expansion shell anchor bolts. With robust quality, competitive pricing, and technical expertise, the company secured major deals and unanimous praise from international clients, reinforcing Chinese mine support equipment's growing influence in Southeast Asia.</p>

      <h3>1. Mining Indonesia 2024: Asia's Mining Hub</h3>
      <p>Mining Indonesia 2024, Asia's premier mining equipment exhibition, ran September 11–14 at Jakarta International Expo, alongside four concurrent trade shows. The event drew 1,200+ exhibitors from 40+ countries and 30,000+ professionals. With Southeast Asia's mining sector increasingly focused on deep excavation safety, the demand for advanced support systems was paramount. Indonesia's position as a top coal, nickel, and copper producer created ideal conditions for Oriental Xinhong to demonstrate its solutions.</p>

      <h3>2. Oriental Xinhong: China's Mine Support Leader</h3>
      <p>Based in Wuxi, Jiangsu, Oriental Xinhong is a high-tech enterprise specializing in R&D, production, and sales of mine/tunnel/slope support systems. With ISO 9001, ISO 14001, and EU CE certifications, the company exports to 50+ countries. Its modern production base features automated lines, CNC centers, and CNAS-accredited labs, producing 10 million+ meters annually of self-drilling anchor bolts, hollow anchor rockbolts, expansion shell anchor bolts, resin bolts, and anchor cables.</p>
    `,
    categories: ["News"],
    type: "news",
    author_name: "XinHong Team"
  },
  {
    id: "2",
    title: "SINOROCK Participates in International Mining Conference",
    excerpt: "Our team showcased innovative anchoring solutions at the 2024 International Mining and Tunneling Conference.",
    publish_date: "2024-03-10",
    featured_image: "/anchor-bolt-drilling-equipment.jpg",
    content: "<p>Our team showcased innovative anchoring solutions at the 2024 International Mining and Tunneling Conference.</p>",
    categories: ["News"],
    type: "news",
    author_name: "SINOROCK Team"
  },
  {
    id: "3",
    title: "Case Study: Successful Tunnel Project in Europe",
    excerpt: "Learn how our T Thread self-drilling anchor bolts contributed to the successful completion of a major tunnel project.",
    publish_date: "2024-03-05",
    featured_image: "/news3.jpg",
    content: "<p>Learn how our T Thread self-drilling anchor bolts contributed to the successful completion of a major tunnel project.</p>",
    categories: ["News"],
    type: "news",
    author_name: "SINOROCK Team"
  },
  {
    id: "4",
    title: "Complete Guide to Rock Bolt Installation",
    excerpt: "Learn the best practices for installing rock bolts in various geological conditions.",
    publish_date: "2024-03-20",
    featured_image: "/blog1.jpg",
    content: "<p>Learn the best practices for installing rock bolts in various geological conditions.</p>",
    categories: ["Blogs"],
    type: "blogs",
    author_name: "SINOROCK Team"
  },
  {
    id: "5",
    title: "Corrosion Resistance Techniques for Anchor Bolts",
    excerpt: "Discover advanced techniques to enhance the corrosion resistance of anchor bolts in challenging environments.",
    publish_date: "2024-03-18",
    featured_image: "/blog2.jpg",
    content: "<p>Discover advanced techniques to enhance the corrosion resistance of anchor bolts in challenging environments.</p>",
    categories: ["Blogs"],
    type: "blogs",
    author_name: "SINOROCK Team"
  },
  {
    id: "6",
    title: "Best Practices for Tunneling Projects",
    excerpt: "Expert insights on selecting and using anchor bolts for tunneling applications.",
    publish_date: "2024-03-12",
    featured_image: "/blog3.jpg",
    content: "<p>Expert insights on selecting and using anchor bolts for tunneling applications.</p>",
    categories: ["Blogs"],
    type: "blogs",
    author_name: "SINOROCK Team"
  }
]

// 获取新闻文章（type: 'news'）
export function getNewsArticles(): StaticArticle[] {
  return staticArticles.filter(article => article.type === 'news')
}

// 获取博客文章（type: 'blogs'）
export function getBlogArticles(): StaticArticle[] {
  return staticArticles.filter(article => article.type === 'blogs')
}

// 根据 ID 获取文章
export function getArticleById(id: string): StaticArticle | undefined {
  return staticArticles.find(article => article.id === id)
}

// 获取最新的新闻文章（用于首页显示）
export function getLatestNews(count: number = 3): StaticArticle[] {
  return getNewsArticles()
    .sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime())
    .slice(0, count)
}

