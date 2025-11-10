export type ArticleType = "news" | "blog"

export type Article = {
  id: string
  type: ArticleType
  title: string
  excerpt: string
  date: string
  image: string
  imageAlt: string
  category: string
  author?: string
  content: string
}

export const articles: Article[] = [
  {
    id: "1",
    type: "news",
    title: "New Generation Rock Bolt Technology Launched",
    excerpt:
      "We are excited to announce the launch of our latest rock bolt technology, featuring enhanced corrosion resistance and improved load capacity.",
    date: "2024-03-15",
    image: "/industrial-construction-site-with-rock-bolts.jpg",
    imageAlt: "Industrial construction site showcasing SINOROCK galvanized rock bolts",
    category: "Product News",
    content: `
      <p>We are thrilled to announce the launch of our latest innovation in rock bolt technology. This new generation of anchor bolts represents a significant leap forward in geotechnical anchoring solutions.</p>

      <h2>Key Features</h2>
      <ul>
        <li>Enhanced corrosion resistance with advanced coating technology</li>
        <li>Improved load capacity up to 30% compared to previous models</li>
        <li>Faster installation time, reducing project costs</li>
        <li>Extended service life in harsh environmental conditions</li>
      </ul>

      <h2>Technical Specifications</h2>
      <p>The new rock bolt system has been rigorously tested and certified to meet international standards. Our engineering team has worked tirelessly to ensure that this product delivers exceptional performance in the most demanding applications.</p>

      <p>For more information about our new rock bolt technology, please contact our technical support team or visit our products page.</p>
    `,
  },
  {
    id: "2",
    type: "news",
    title: "SINOROCK Participates in International Mining Conference",
    excerpt:
      "Our team showcased innovative anchoring solutions at the 2024 International Mining and Tunneling Conference in Singapore.",
    date: "2024-03-10",
    image: "/industrial-factory-production-floor.jpg",
    imageAlt: "SINOROCK team presenting anchoring solutions at an international mining conference",
    category: "Company News",
    content: `
      <p>SINOROCK was proud to participate in the 2024 International Mining and Tunneling Conference held in Singapore. This prestigious event brought together industry leaders, engineers, and innovators from around the world.</p>

      <h2>Exhibition Highlights</h2>
      <p>Our exhibition booth showcased our complete range of anchoring solutions, including our latest T Thread and R Thread self-drilling anchor bolts. Visitors had the opportunity to see live demonstrations and speak directly with our technical experts.</p>

      <h2>Networking and Partnerships</h2>
      <p>The conference provided an excellent platform for networking with potential partners and clients. We engaged in meaningful discussions about future collaborations and explored opportunities in emerging markets.</p>

      <p>We look forward to participating in more industry events and continuing to contribute to the advancement of geotechnical engineering.</p>
    `,
  },
  {
    id: "3",
    type: "news",
    title: "Case Study: Successful Tunnel Project in Europe",
    excerpt:
      "Learn how our T Thread self-drilling anchor bolts contributed to the successful completion of a major tunnel project in Switzerland.",
    date: "2024-03-05",
    image: "/galvanized-rock-bolt-system.jpg",
    imageAlt: "Close-up of a SINOROCK galvanized rock bolt system inside a tunnel",
    category: "Case Study",
    content: `
      <p>We are pleased to share the success story of a major tunnel construction project in Switzerland, where our T Thread self-drilling anchor bolts played a crucial role in ensuring project safety and efficiency.</p>

      <h2>Project Overview</h2>
      <p>The project involved the construction of a 5-kilometer tunnel through challenging geological conditions. Our anchoring solutions were selected for their reliability and proven performance in similar applications.</p>

      <h2>Challenges and Solutions</h2>
      <ul>
        <li>Variable rock conditions requiring flexible anchoring solutions</li>
        <li>Strict safety requirements and quality standards</li>
        <li>Tight project timeline demanding efficient installation</li>
      </ul>

      <h2>Results</h2>
      <p>The project was completed on schedule with zero safety incidents. Our anchor bolts performed exceptionally well, providing the required support and stability throughout the construction process.</p>

      <p>This case study demonstrates our commitment to delivering high-quality products and technical support for complex engineering projects worldwide.</p>
    `,
  },
  {
    id: "4",
    type: "blog",
    title: "Common Failures For Hollow Anchor Bar Tunnel Construction",
    excerpt:
      "Common failures in hollow anchor bar tunnel construction: causes, solutions, and Sinorock's self-drilling anchor technology advantages.",
    date: "2024-10-28",
    image: "/anchor-bolt-drilling-equipment.jpg",
    imageAlt: "Self-drilling anchor bolt drilling equipment set up for tunnel construction",
    category: "Technical Blog",
    author: "Engineering Team",
    content: `
      <p>Hollow anchor bar systems are widely used in tunnel construction, yet contractors still encounter recurring installation issues.</p>

      <h2>Frequent Failure Modes</h2>
      <ul>
        <li>Poor grout mixing that reduces pull-out capacity</li>
        <li>Incorrect drilling parameters that cause anchor bending</li>
        <li>Insufficient corrosion protection in high-moisture strata</li>
      </ul>

      <h2>How to Mitigate</h2>
      <p>Employ on-site grout quality tests, adhere to recommended drilling torque, and specify hot-dip galvanized accessories for aggressive environments.</p>

      <p>Our engineering specialists can assist with inspection checklists and training to ensure consistent results.</p>
    `,
  },
  {
    id: "5",
    type: "blog",
    title: "Top 6 Critical Steps For Self-Drilling Anchor Bolt Construction",
    excerpt:
      "Master the 6 critical steps for self-drilling anchor installation! Boost construction safety and efficiency with expert guidance.",
    date: "2024-10-23",
    image: "/anchor-accessories-and-tools.jpg",
    imageAlt: "SINOROCK anchor bolt accessories and installation tools on a jobsite table",
    category: "How-To Guide",
    author: "Project Support Team",
    content: `
      <p>Self-drilling anchor bolts streamline construction workflows. Following a repeatable installation sequence helps crews avoid delays.</p>

      <h2>Key Steps</h2>
      <ol>
        <li>Soil investigation and bolt selection</li>
        <li>Preparation of drilling equipment</li>
        <li>Continuous drilling and simultaneous grouting</li>
        <li>Torque inspection to confirm load transfer</li>
        <li>Grout curing verification</li>
        <li>Final documentation for quality records</li>
      </ol>

      <p>Download our field checklist to keep each project compliant and efficient.</p>
    `,
  },
  {
    id: "6",
    type: "blog",
    title: "Corrosion Prevention in Underground Anchoring Systems",
    excerpt:
      "Learn about the latest techniques and materials for preventing corrosion in harsh underground environments.",
    date: "2024-10-12",
    image: "/corrosion-resistant-anchor.jpg",
    imageAlt: "Corrosion-resistant SINOROCK anchor bolt components prepared for underground use",
    category: "Industry Insights",
    author: "Technical Department",
    content: `
      <p>Underground moisture and chemical exposure can rapidly deteriorate unprotected steel anchors. Selecting the right protection strategy is critical.</p>

      <h2>Protection Options</h2>
      <ul>
        <li>Hot-dip galvanizing for long-term durability</li>
        <li>Epoxy powder coatings to resist chloride ingress</li>
        <li>Cathodic protection systems for coastal projects</li>
      </ul>

      <p>Our laboratory testing confirms service life improvements of up to 40% when combining coating and grout enhancements.</p>
    `,
  },
]

export function getArticlesByType(type: ArticleType) {
  return articles.filter((article) => article.type === type)
}

export function getArticleById(id: string) {
  return articles.find((article) => article.id === id)
}

