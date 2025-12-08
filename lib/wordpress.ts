// ==================== 接口定义 ====================

export interface AboutSection {
  id: string
  title: string
  subtitle: string
  description: string
  detailedDescription: string
  icon: 'Award' | 'Factory' | 'Building2' | 'History' | 'Certificate'
  image: string
  imageAlt: string
  href: string
  order?: number
}

export interface Project {
  id: string
  title: string
  excerpt: string
  homepageDescription?: string  // 首页专用描述（可选，优先使用）
  content: string
  image: string
  imageAlt: string  // ✅ 修复：添加缺失字段
  location: string
  date: string
  slug: string
  categories: string[]
}

export interface ProjectCategory {
  id: string
  name: string
  slug: string
  count: number
}

// ==================== About Sections API ====================

export async function getAboutSections(): Promise<AboutSection[]> {
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  
  if (!wpApiUrl) {
    throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL is not defined in .env.local')
  }

  try {
    // 添加时间戳参数避免浏览器和服务器缓存
    const timestamp = Date.now()
    const res = await fetch(
      `${wpApiUrl}/wp-json/wp/v2/about_section?per_page=100&_embed&status=publish&_=${timestamp}`,
      {
        // 移除缓存，确保 WordPress 更新能及时显示
        cache: 'no-store', // 不缓存，每次都获取最新数据
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    )

    if (!res.ok) {
      throw new Error(`WordPress API error: ${res.status} ${res.statusText}`)
    }

    const wpPosts = await res.json()
    return transformAboutSections(wpPosts, wpApiUrl)

  } catch (error) {
    console.error('Failed to fetch from WordPress:', error)
    throw error
  }
}

async function transformAboutSections(wpPosts: any[], wpApiUrl: string): Promise<AboutSection[]> {
  // 定义模块的固定顺序和默认图标 - why choose us 必须在第一个
  const moduleOrder = ['why-choose-us', 'factory-overview', 'history', 'certificate', 'factory']

  console.log('Expected module order:', moduleOrder)
  const defaultIcons: Record<string, AboutSection['icon']> = {
    'why-choose-us': 'Award',
    'factory-overview': 'Factory',
    'factory': 'Factory',
    'history': 'History',
    'certificate': 'Certificate',
  }

  const defaultDescriptions: Record<string, string> = {
    'why-choose-us': 'Discover what sets us apart in the geotechnical anchoring industry with our commitment to quality and innovation.',
    'factory-overview': 'Explore our state-of-the-art manufacturing facilities equipped with advanced technology and quality control systems.',
    'factory': 'Explore our state-of-the-art manufacturing facilities equipped with advanced technology and quality control systems.',
    'history': 'Learn about our journey from inception to becoming a leading provider of geotechnical anchoring solutions.',
    'certificate': 'View our certifications and quality standards that demonstrate our commitment to excellence and safety.',
  }

  return Promise.all(
    wpPosts.map(async (post: any) => {
      const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
        || (post.featured_media ? await getMediaUrl(post.featured_media, wpApiUrl) : '/placeholder.svg')

      const slug = post.slug
      const sectionId = post.meta?.section_id || post.acf?.section_id || slug

      console.log(`Processing post: ${post.title.rendered}, slug: ${slug}, order index: ${moduleOrder.indexOf(slug)}`)

      // 从内容中提取描述作为fallback，如果没有excerpt的话
      const contentText = post.content?.rendered?.replace(/<[^>]*>/g, '').trim() || ''
      const excerptText = post.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim() || ''

      // 优先使用ACF description字段，然后使用excerpt，最后从content中截取
      let description = post.acf?.description || excerptText || contentText.substring(0, 150)
      if (!description && defaultDescriptions[slug]) {
        description = defaultDescriptions[slug]
      }

      return {
        id: sectionId,
        title: post.title.rendered,
        subtitle: post.meta?.subtitle || post.acf?.subtitle || post.title.rendered,
        description: description,
        detailedDescription: post.content?.rendered || '',
        icon: (post.meta?.icon || post.acf?.icon || defaultIcons[slug] || 'Award') as AboutSection['icon'],
        image: imageUrl,
        imageAlt: post.title.rendered,
        href: `/about?section=${sectionId}`,
        order: moduleOrder.indexOf(slug) !== -1 ? moduleOrder.indexOf(slug) : 999,
      }
    })
  ).then(sections => {
    // 按照order字段排序
    const sortedSections = sections.sort((a, b) => {
      const orderA = a.order || 999
      const orderB = b.order || 999
      console.log(`Comparing ${a.id} (order: ${orderA}) with ${b.id} (order: ${orderB})`)
      return orderA - orderB
    })
    console.log('Sections after sorting:', sortedSections.map(s => ({ id: s.id, order: s.order, title: s.title })))
    return sortedSections
  })
}

// ==================== Projects API ====================

export async function getProjects(): Promise<Project[]> {
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  if (!wpApiUrl) {
    console.warn('NEXT_PUBLIC_WORDPRESS_API_URL is not defined, returning empty array')
    return []
  }

  // 统一直接调用WordPress API，但确保服务器端和客户端使用相同的参数
  const apiUrl = `${wpApiUrl}/wp-json/wp/v2/successful_project?per_page=100&_embed&status=publish&_=${Date.now()}`

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 60 }, // 缓存60秒
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
        'User-Agent': 'Next.js-SSR-WordPress-Client'
      }
    })

    if (!res.ok) {
      console.error(`Projects API error: ${res.status} ${res.statusText}`)
      console.error(`API URL: ${apiUrl}`)
      return []
    }

    const wpPosts = await res.json()
    console.log(`WordPress API返回 ${wpPosts.length} 个项目`)

    // 简化调试信息
    if (wpPosts.length > 0) {
      console.log(`WordPress API返回 ${wpPosts.length} 个项目，开始处理ACF字段数据`)
    }

    return transformProjects(wpPosts, wpApiUrl)
  } catch (error) {
    console.error('获取项目数据失败:', error)
    console.error(`WordPress API URL: ${apiUrl}`)
    return []
  }
}

export async function getProjectsByCategory(categorySlug: string): Promise<Project[]> {
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  if (!wpApiUrl) {
    console.warn('NEXT_PUBLIC_WORDPRESS_API_URL is not defined')
    return []
  }

  // 统一直接调用WordPress API
  const apiUrl = `${wpApiUrl}/wp-json/wp/v2/successful_project?per_page=100&_embed&status=publish&project_category=${encodeURIComponent(categorySlug)}&_=${Date.now()}`

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 60 },
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    })

    if (!res.ok) {
      console.error(`Projects by category API error: ${res.status}`)
      return []
    }

    const wpPosts = await res.json()
    return transformProjects(wpPosts, wpApiUrl)
  } catch (error) {
    console.error('获取分类项目失败:', error)
    return []
  }
}

// ✅ 修复：删除重复声明，只保留一个函数
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  if (!wpApiUrl) {
    console.warn('NEXT_PUBLIC_WORDPRESS_API_URL is not defined')
    return null
  }

  // 尝试两种方式：原始slug和编码后的slug
  const slugsToTry = [slug, encodeURIComponent(slug)]

  for (const slugToTry of slugsToTry) {
    const apiUrl = `${wpApiUrl}/wp-json/wp/v2/successful_project?slug=${encodeURIComponent(slugToTry)}&_embed&status=publish&_=${Date.now()}`

    try {
      const res = await fetch(apiUrl, {
        next: { revalidate: 60 },
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
        }
      })

      if (!res.ok) {
        console.error(`Project by slug API error: ${res.status} ${res.statusText}`)
        console.error(`尝试获取的 slug: ${slugToTry}`)
        console.error(`API URL: ${apiUrl}`)
        continue // 尝试下一个slug
      }

      const wpPosts = await res.json()

      if (wpPosts.length === 0) {
        console.warn(`未找到 slug 为 "${slugToTry}" 的项目`)
        continue // 尝试下一个slug
      }

      // 详细调试：单个项目的ACF字段数据
      console.log(`获取项目详情: ${wpPosts[0].title.rendered}，ACF字段数量: ${wpPosts[0].acf ? Object.keys(wpPosts[0].acf).length : 0}`)

      const projects = await transformProjects(wpPosts, wpApiUrl)
      return projects[0]
    } catch (error) {
      console.error('获取项目详情失败:', error)
      continue // 尝试下一个slug
    }
  }

  // 如果所有尝试都失败了
  console.error(`所有尝试都失败，未找到项目，原slug: ${slug}`)
  return null
}

// ✅ 修复：删除重复声明，只保留一个函数
export async function getProjectCategories(): Promise<ProjectCategory[]> {
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  if (!wpApiUrl) {
    console.warn('NEXT_PUBLIC_WORDPRESS_API_URL is not defined')
    return []
  }

  // 统一直接调用WordPress API
  const apiUrl = `${wpApiUrl}/wp-json/wp/v2/project_category?per_page=100&_=${Date.now()}`

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 60 },
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    })

    if (!res.ok) {
      console.error(`Categories API error: ${res.status}`)
      return []
    }

    const wpCategories = await res.json()
    console.log(`WordPress API返回 ${wpCategories.length} 个分类`)

    return wpCategories.map((cat: any) => ({
      id: cat.id.toString(),
      name: cat.name,
      slug: cat.slug,
      count: cat.count,
    }))
  } catch (error) {
    console.error('获取分类失败:', error)
    return []
  }
}

// ✅ 修复：统一的项目数据转换函数
async function transformProjects(wpPosts: any[], wpApiUrl: string): Promise<Project[]> {
  return Promise.all(
    wpPosts.map(async (post: any) => {
      const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
        || (post.featured_media ? await getMediaUrl(post.featured_media, wpApiUrl) : '/placeholder.svg')

      // 获取分类信息 - 支持多种方式获取分类
      let categories: string[] = []

      // 方式1：从 _embedded.wp:term 获取
      if (post._embedded?.['wp:term']?.[0]) {
        categories = post._embedded['wp:term'][0].map((cat: any) => cat.slug)
      }

      // 方式2：从 project_category 字段获取
      else if (post.project_category && Array.isArray(post.project_category)) {
        // 如果是分类ID数组，我们需要获取对应的slug
        categories = post.project_category.map((catId: any) => catId.toString())
      }

      // 获取meta字段数据 - 支持多种可能的字段名和API端点
      let location = ''
      let date = ''
      let homepageDescription = ''

      // 尝试多种方法获取ACF字段数据
      let foundData = false

      // 方法1: 从原始的post meta中获取数据
      if (post.meta) {
        location = post.meta.project_location || post.meta.location || post.meta.项目地点 || ''
        date = post.meta.project_date || post.meta.date || post.meta.项目日期 || ''
        homepageDescription = post.meta.homepage_description || post.meta.homepageDescription || ''
        if (location || date) foundData = true
      }

      // 方法2: 从meta_box中获取数据
      if (!foundData && post.meta_box) {
        location = post.meta_box.project_location || post.meta_box.location || post.meta_box.项目地点 || ''
        date = post.meta_box.project_date || post.meta_box.date || post.meta_box.项目日期 || ''
        if (!homepageDescription) {
          homepageDescription = post.meta_box.homepage_description || post.meta_box.homepageDescription || ''
        }
        if (location || date) foundData = true
      }

      // 方法3: 从acf中获取数据
      if (!foundData && post.acf && Array.isArray(post.acf) === false) {
        location = post.acf.project_location || post.acf.location || ''
        date = post.acf.project_date || post.acf.date || ''
        homepageDescription = post.acf.homepage_description || post.acf.homepageDescription || homepageDescription
        if (location || date) foundData = true
      }

      // 方法3.5: 单独尝试从acf获取homepageDescription（即使foundData为true）
      if (!homepageDescription && post.acf && Array.isArray(post.acf) === false) {
        homepageDescription = post.acf.homepage_description || post.acf.homepageDescription || ''
      }

      // 方法4: 通过ACF API获取
      if (!foundData) {
        const acfFields = await getACFFields(post.id, wpApiUrl)
        if (acfFields && acfFields.acf) {
          const acfData = acfFields.acf
          location = acfData.project_location || acfData.location || ''
          date = acfData.project_date || acfData.date || ''
          homepageDescription = acfData.homepage_description || acfData.homepageDescription || homepageDescription
          if (location || date) foundData = true
        }
      }

      // 方法4.5: 单独通过ACF API获取homepageDescription（即使foundData为true）
      if (!homepageDescription) {
        const acfFields = await getACFFields(post.id, wpApiUrl)
        if (acfFields && acfFields.acf) {
          const acfData = acfFields.acf
          homepageDescription = acfData.homepage_description || acfData.homepageDescription || homepageDescription
        }
      }

      // 方法5: 通过post meta API获取
      if (!foundData) {
        const metaFields = await getPostMetaFields(post.id, wpApiUrl)
        if (metaFields) {
          location = metaFields.project_location || metaFields.location || metaFields.项目地点 || location
          date = metaFields.project_date || metaFields.date || metaFields.项目日期 || date
          if (!homepageDescription) {
            homepageDescription = metaFields.homepage_description || metaFields.homepageDescription || ''
          }
          if (location || date) foundData = true
        }
      }

      // 方法5.5: 单独通过post meta API获取homepageDescription（即使foundData为true）
      if (!homepageDescription) {
        const metaFields = await getPostMetaFields(post.id, wpApiUrl)
        if (metaFields) {
          homepageDescription = metaFields.homepage_description || metaFields.homepageDescription || ''
        }
      }

      // 方法6: 直接查询meta字段（最后备用方案）
      if (!foundData) {
        try {
          const locationMetaRes = await fetch(
            `${wpApiUrl}/wp-json/wp/v2/posts/${post.id}?context=edit`,
            {
              next: { revalidate: 60 },
              headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
              }
            }
          )

          if (locationMetaRes.ok) {
            const postData = await locationMetaRes.json()
            if (postData.meta) {
              // 尝试各种可能的meta键名
              const possibleLocationKeys = [
                'project_location', 'location', '项目地点',
                'project_location_cn', 'project_location_en',
                'field_project_location', 'field_location'
              ]
              const possibleDateKeys = [
                'project_date', 'date', '项目日期',
                'project_date_cn', 'project_date_en',
                'field_project_date', 'field_date'
              ]
              const possibleHomepageDescKeys = [
                'homepage_description', 'homepageDescription',
                'field_homepage_description', 'field_homepageDescription'
              ]

              for (const key of possibleLocationKeys) {
                if (postData.meta[key] && postData.meta[key] !== '') {
                  location = postData.meta[key]
                  foundData = true
                  break
                }
              }

              for (const key of possibleDateKeys) {
                if (postData.meta[key] && postData.meta[key] !== '') {
                  date = postData.meta[key]
                  foundData = true
                  break
                }
              }

              for (const key of possibleHomepageDescKeys) {
                if (postData.meta[key] && postData.meta[key] !== '') {
                  homepageDescription = postData.meta[key]
                  break
                }
              }
            }
          }
        } catch (error) {
          console.error('直接查询meta字段失败:', error)
        }
      }

      // 方法6.5: 单独查询homepageDescription（即使foundData为true）
      if (!homepageDescription) {
        try {
          const descMetaRes = await fetch(
            `${wpApiUrl}/wp-json/wp/v2/successful_project/${post.id}?context=edit`,
            {
              next: { revalidate: 60 },
              headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
              }
            }
          )

          if (descMetaRes.ok) {
            const postData = await descMetaRes.json()
            if (postData.meta) {
              const possibleHomepageDescKeys = [
                'homepage_description', 'homepageDescription',
                'field_homepage_description', 'field_homepageDescription',
                'acf_homepage_description', 'acf_homepageDescription'
              ]
              for (const key of possibleHomepageDescKeys) {
                if (postData.meta[key] && postData.meta[key] !== '') {
                  homepageDescription = postData.meta[key]
                  break
                }
              }
            }
          }
        } catch (error) {
          console.error('单独查询homepageDescription失败:', error)
        }
      }

      // 如果没有找到位置信息，根据分类和项目标题提供更具体的默认值
      if (!location) {
        if (categories.includes('china-projects')) {
          // 根据项目标题判断具体城市
          const title = post.title.rendered.toLowerCase()
          if (title.includes('北京') || title.includes('beijing')) {
            location = 'Beijing, China'
          } else if (title.includes('上海') || title.includes('shanghai')) {
            location = 'Shanghai, China'
          } else if (title.includes('广州') || title.includes('guangzhou')) {
            location = 'Guangzhou, China'
          } else if (title.includes('深圳') || title.includes('shenzhen')) {
            location = 'Shenzhen, China'
          } else {
            location = 'China'
          }
        } else if (categories.includes('overseas-projects')) {
          // 根据项目标题判断具体国家
          const title = post.title.rendered.toLowerCase()
          if (title.includes('美国') || title.includes('usa') || title.includes('america')) {
            location = 'United States'
          } else if (title.includes('欧洲') || title.includes('europe')) {
            location = 'Europe'
          } else if (title.includes('东南亚') || title.includes('southeast asia')) {
            location = 'Southeast Asia'
          } else if (title.includes('中东') || title.includes('middle east')) {
            location = 'Middle East'
          } else {
            location = 'Overseas'
          }
        }
      }

      // 如果没有找到日期信息，从项目创建日期中提取年份
      if (!date && post.date) {
        const projectDate = new Date(post.date)
        date = projectDate.getFullYear().toString()
      }

      // 处理 excerpt：移除 HTML 标签并解码 HTML 实体
      const cleanExcerpt = decodeHtmlEntities(post.excerpt?.rendered || '')

      // 处理 homepageDescription：解码 HTML 实体
      const cleanHomepageDescription = homepageDescription 
        ? decodeHtmlEntities(homepageDescription) 
        : undefined

      // 处理 title：解码 HTML 实体（如 &#8217; 等）
      const cleanTitle = decodeHtmlEntities(post.title?.rendered || '')

      // 调试信息：输出 homepageDescription 的获取情况
      if (cleanHomepageDescription) {
        console.log(`✅ 项目 "${cleanTitle}" 找到首页描述: ${cleanHomepageDescription.substring(0, 50)}...`)
      } else {
        console.log(`⚠️ 项目 "${cleanTitle}" 未找到首页描述，将使用 excerpt`)
      }

      if (!foundData) {
      console.log(`未找到项目 "${cleanTitle}" 的ACF字段数据，使用默认值: location=${location}, date=${date}`)
    }

      // 解码URL编码的slug，特别是中文slug
      let decodedSlug = post.slug
      try {
        decodedSlug = decodeURIComponent(post.slug)
      } catch (error) {
        console.warn(`无法解码slug: ${post.slug}`, error)
        decodedSlug = post.slug
      }

      return {
        id: post.id.toString(),
        title: cleanTitle,
        excerpt: cleanExcerpt,
        homepageDescription: cleanHomepageDescription,
        content: post.content.rendered,
        image: imageUrl,
        imageAlt: cleanTitle,
        location: location,
        date: date,
        slug: decodedSlug,
        categories: categories,
      }
    })
  )
}

// ==================== ACF和自定义字段辅助函数 ====================

// 尝试通过ACF REST API获取字段数据
async function getACFFields(postId: number, wpApiUrl: string): Promise<any> {
  try {
    // 方法1: 尝试ACF到REST API插件的端点
    const acfRes = await fetch(
      `${wpApiUrl}/wp-json/acf/v3/posts/${postId}`,
      {
        next: { revalidate: 60 },
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    )

    if (acfRes.ok) {
      const acfData = await acfRes.json()
      return acfData.acf || {}
    }

    // 方法2: 尝试ACF v2 API
    const acfV2Res = await fetch(
      `${wpApiUrl}/wp-json/acf/v2/posts/${postId}`,
      {
        next: { revalidate: 60 },
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    )

    if (acfV2Res.ok) {
      const acfV2Data = await acfV2Res.json()
      return acfV2Data.acf || {}
    }

    // 方法3: 尝试通过自定义文章类型的ACF端点
    const customAcfRes = await fetch(
      `${wpApiUrl}/wp-json/acf/v3/successful_project/${postId}`,
      {
        next: { revalidate: 60 },
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    )

    if (customAcfRes.ok) {
      const customAcfData = await customAcfRes.json()
      return customAcfData.acf || {}
    }

    // 方法4: 尝试通过 WP REST API 直接获取（ACF 可能已经包含在响应中）
    // 这个方法会在 transformProjects 中通过 post.acf 访问，但这里也尝试一下
    const wpRes = await fetch(
      `${wpApiUrl}/wp-json/wp/v2/successful_project/${postId}?_embed`,
      {
        next: { revalidate: 60 },
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    )

    if (wpRes.ok) {
      const wpData = await wpRes.json()
      if (wpData.acf && Array.isArray(wpData.acf) === false) {
        return { acf: wpData.acf }
      }
    }

    return {}
  } catch (error) {
    console.error('获取ACF字段数据失败:', error)
    return {}
  }
}

// 尝试通过WordPress post meta API获取字段数据
async function getPostMetaFields(postId: number, wpApiUrl: string): Promise<Record<string, any>> {
  try {
    const metaRes = await fetch(
      `${wpApiUrl}/wp-json/wp/v2/posts/${postId}?_embed&context=edit`,
      {
        next: { revalidate: 60 },
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    )

    if (metaRes.ok) {
      const postData = await metaRes.json()
      return postData.meta || {}
    }

    return {}
  } catch (error) {
    console.error('获取post meta数据失败:', error)
    return {}
  }
}

// ==================== 通用工具函数 ====================

/**
 * 截断文本并移除 "read more" 相关文本
 * @param text 要处理的文本
 * @param maxLength 最大长度（默认 120）
 * @returns 处理后的文本
 */
export function truncateExcerpt(text: string, maxLength: number = 120): string {
  if (!text) return ''
  
  // 移除 "read more" 相关文本（不区分大小写）
  // 注意：HTML 实体应该已经在 decodeHtmlEntities 中解码了
  // 所以这里主要处理普通点和 Unicode 省略号
  let cleaned = text
  
  // 使用更强大的正则表达式来匹配所有 "read more" 变体
  // 匹配模式：可选的省略号/点（1-3个）+ 可选的空格 + read more + 可选的空格 + 可选的省略号/点（1-3个）
  // 先匹配前后都有省略号的情况
  cleaned = cleaned.replace(/\.{1,3}\s*[Rr]ead\s+[Mm]ore\s*\.{1,3}/gi, '')
  cleaned = cleaned.replace(/…\s*[Rr]ead\s+[Mm]ore\s*…/gi, '')
  cleaned = cleaned.replace(/\.{1,3}\s*…\s*[Rr]ead\s+[Mm]ore/gi, '')
  cleaned = cleaned.replace(/[Rr]ead\s+[Mm]ore\s*…\s*\.{1,3}/gi, '')
  
  // 匹配前面有省略号的
  cleaned = cleaned.replace(/\.{1,3}\s*[Rr]ead\s+[Mm]ore/gi, '')
  cleaned = cleaned.replace(/…\s*[Rr]ead\s+[Mm]ore/gi, '')
  
  // 匹配后面有省略号的
  cleaned = cleaned.replace(/[Rr]ead\s+[Mm]ore\s*\.{1,3}/gi, '')
  cleaned = cleaned.replace(/[Rr]ead\s+[Mm]ore\s*…/gi, '')
  
  // 匹配单独的 read more（前后可能有空格、标点等）
  cleaned = cleaned.replace(/\s*[Rr]ead\s+[Mm]ore\s*/gi, '')
  
  // 清理多余的标点和空格
  cleaned = cleaned
    // 清理连续的多个省略号（合并为一个）
    .replace(/\.{4,}/g, '...')  // 4个或更多点合并为三个点
    .replace(/…\s*…/g, '...')
    // 清理多余的点和空格组合
    .replace(/\s*\.{2,3}\s*\.{2,3}/g, '...')  // 多个省略号合并
    .replace(/\s*…\s*\.{2,3}/g, '...')
    .replace(/\s*\.{2,3}\s*…/g, '...')
    // 清理末尾多余的省略号（只保留一个）
    .replace(/\.{4,}$/g, '...')
    // 清理开头和结尾的多余空格和标点
    .replace(/^[\s\.…]+/, '')
    .replace(/[\s\.…]+$/, '')
    .trim()
  
  // 如果文本超过最大长度，截断并添加省略号
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength).trim()
    // 确保不以标点符号结尾（除非是省略号）
    if (!cleaned.endsWith('...') && !cleaned.endsWith('…')) {
      // 尝试在最后一个空格处截断
      const lastSpace = cleaned.lastIndexOf(' ')
      if (lastSpace > maxLength * 0.8) {
        cleaned = cleaned.substring(0, lastSpace)
      }
      cleaned += '...'
    }
  }
  
  return cleaned
}

/**
 * 从 HTML 内容中提取第一张图片的 URL
 * @param htmlContent HTML 内容字符串
 * @returns 第一张图片的 URL，如果没有找到则返回 null
 */
export function extractFirstImageFromContent(htmlContent: string): string | null {
  if (!htmlContent || typeof htmlContent !== 'string') return null

  // 方法1: 使用更健壮的正则表达式匹配 img 标签
  // 支持多种格式：src="...", src='...', src=..., src = "..."
  // 使用非贪婪匹配，找到第一个 img 标签
  const imgRegex = /<img[^>]*?\ssrc\s*=\s*["']([^"']+)["'][^>]*?>/i
  let match = htmlContent.match(imgRegex)
  
  // 如果第一种格式没匹配到，尝试无引号的格式
  if (!match) {
    const imgRegexNoQuote = /<img[^>]*?\ssrc\s*=\s*([^\s>]+)[^>]*?>/i
    match = htmlContent.match(imgRegexNoQuote)
  }
  
  if (match && match[1]) {
    let imageUrl = match[1].trim()
    
    // 清理 URL：移除 HTML 实体编码
    imageUrl = imageUrl
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/')
    
    // 验证是否是有效的图片 URL（排除 data: URL 和占位符）
    if (imageUrl && 
        imageUrl.length > 0 &&
        !imageUrl.startsWith('data:') && 
        imageUrl !== '/placeholder.svg' &&
        !imageUrl.toLowerCase().includes('placeholder') &&
        (imageUrl.startsWith('http') || imageUrl.startsWith('/') || imageUrl.startsWith('./'))) {
      // 如果是相对路径且以 ./ 开头，移除 ./
      if (imageUrl.startsWith('./')) {
        imageUrl = imageUrl.substring(2)
      }
      return imageUrl
    }
  }

  // 方法2: 尝试匹配 WordPress 的图片格式（可能在 figure 或其他标签中）
  const figureImgRegex = /<figure[^>]*>[\s\S]*?<img[^>]*?\ssrc\s*=\s*["']([^"']+)["'][^>]*?>/i
  const figureMatch = htmlContent.match(figureImgRegex)
  
  if (figureMatch && figureMatch[1]) {
    let imageUrl = figureMatch[1].trim()
    imageUrl = imageUrl
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
    
    if (imageUrl && 
        imageUrl.length > 0 &&
        !imageUrl.startsWith('data:') && 
        imageUrl !== '/placeholder.svg' &&
        !imageUrl.toLowerCase().includes('placeholder') &&
        (imageUrl.startsWith('http') || imageUrl.startsWith('/') || imageUrl.startsWith('./'))) {
      if (imageUrl.startsWith('./')) {
        imageUrl = imageUrl.substring(2)
      }
      return imageUrl
    }
  }

  // 方法3: 尝试匹配 background-image: url(...)
  const bgImageRegex = /background-image:\s*url\(["']?([^"')]+)["']?\)/i
  const bgMatch = htmlContent.match(bgImageRegex)
  
  if (bgMatch && bgMatch[1]) {
    let imageUrl = bgMatch[1].trim()
    imageUrl = imageUrl
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
    
    if (imageUrl && 
        imageUrl.length > 0 &&
        !imageUrl.startsWith('data:') && 
        imageUrl !== '/placeholder.svg' &&
        !imageUrl.toLowerCase().includes('placeholder') &&
        (imageUrl.startsWith('http') || imageUrl.startsWith('/') || imageUrl.startsWith('./'))) {
      if (imageUrl.startsWith('./')) {
        imageUrl = imageUrl.substring(2)
      }
      return imageUrl
    }
  }

  return null
}

/**
 * 处理文章内容，如果 h1 标签内容与文章标题一致则隐藏它
 * @param htmlContent HTML 内容字符串
 * @param articleTitle 文章标题
 * @returns 处理后的 HTML 内容
 */
export function processArticleContent(htmlContent: string, articleTitle: string): string {
  if (!htmlContent || !articleTitle) return htmlContent

  // 清理标题：移除 HTML 标签、空白字符、转换为小写进行比较
  const cleanTitle = articleTitle
    .replace(/<[^>]*>/g, '') // 移除 HTML 标签
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ') // 规范化空白字符

  // 使用正则表达式匹配所有 h1 标签
  return htmlContent.replace(/<h1([^>]*)>([\s\S]*?)<\/h1>/gi, (match, attributes, content) => {
    // 清理 h1 内容：移除 HTML 标签、空白字符、转换为小写
    const cleanH1Content = content
      .replace(/<[^>]*>/g, '') // 移除 HTML 标签
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ') // 规范化空白字符

    // 如果 h1 内容与标题一致，添加隐藏样式
    if (cleanH1Content === cleanTitle) {
      // 检查是否已有 style 属性
      if (attributes.includes('style=')) {
        // 在现有 style 中添加 display: none
        return `<h1${attributes.replace(/style=["']([^"']*)["']/, (styleMatch, styleValue) => {
          return `style="${styleValue}; display: none !important;"`
        })}>${content}</h1>`
      } else {
        // 添加新的 style 属性
        return `<h1${attributes} style="display: none !important;">${content}</h1>`
      }
    }

    // 如果不一致，保持原样
    return match
  })
}

/**
 * 解码 HTML 实体编码
 * 将 HTML 实体（如 &#8230;、&hellip; 等）转换为普通字符
 */
function decodeHtmlEntities(text: string): string {
  if (!text) return ''
  
  // 移除 HTML 标签
  let decoded = text.replace(/<[^>]*>/g, '')
  
  // 处理常见的 HTML 实体
  decoded = decoded
    .replace(/&#8230;/g, '...')        // 省略号
    .replace(/&hellip;/g, '...')       // 省略号
    .replace(/&nbsp;/g, ' ')           // 非断行空格
    .replace(/&amp;/g, '&')            // & 符号
    .replace(/&lt;/g, '<')             // < 符号
    .replace(/&gt;/g, '>')             // > 符号
    .replace(/&quot;/g, '"')            // 双引号
    .replace(/&#39;/g, "'")             // 单引号
    .replace(/&apos;/g, "'")            // 单引号
    // 处理数字实体（如 &#8230;）
    .replace(/&#(\d+);/g, (match, dec) => {
      const code = parseInt(dec, 10)
      // 只处理有效的 Unicode 字符
      if (code >= 0 && code <= 0x10FFFF) {
        return String.fromCharCode(code)
      }
      return match
    })
    // 处理十六进制实体（如 &#x2026;）
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
      const code = parseInt(hex, 16)
      // 只处理有效的 Unicode 字符
      if (code >= 0 && code <= 0x10FFFF) {
        return String.fromCharCode(code)
      }
      return match
    })
  
  // 清理多余的空格和换行
  decoded = decoded.trim().replace(/\s+/g, ' ')
  
  return decoded
}

async function getMediaUrl(mediaId: number, wpApiUrl: string): Promise<string> {
  try {
    const res = await fetch(
      `${wpApiUrl}/wp-json/wp/v2/media/${mediaId}`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) return '/placeholder.svg'

    const media = await res.json()
    return media.source_url || '/placeholder.svg'
  } catch (error) {
    console.error('Failed to fetch media:', error)
    return '/placeholder.svg'
  }
}
// ==================== News & Blogs API ====================

export interface NewsBlogArticle {
  id: string
  title: string
  content: string
  excerpt: string
  featured_image?: string
  author_name?: string
  publish_date: string
  read_time?: string
  type: 'news' | 'blogs'
  categories: string[]
  slug: string
}

/**
 * 获取 News & Blogs 文章列表
 * @param params.type - 可选：'news' | 'blogs' 用于过滤类型
 */
export async function getNewsBlogs(params: {
  page?: number
  perPage?: number
  type?: 'news' | 'blogs'
} = {}): Promise<{ data: NewsBlogArticle[]; total: number; total_pages: number }> {
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  if (!wpApiUrl) {
    throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL is not defined')
  }

  try {
    // 构建查询参数
    const queryParams = new URLSearchParams({
      page: String(params.page || 1),
      per_page: String(params.perPage || 10),
      status: 'publish',
      _embed: 'wp:featuredmedia', // 获取特色图片
      _: Date.now().toString() // 防止缓存
    })

    // 如果指定了类型，使用 content_type 分类过滤
    if (params.type) {
      const contentTypeMap = {
        'news': '72',   // 根据 WordPress API，news 的 content_type ID 是 72
        'blogs': '74'   // 根据 WordPress API，blogs 的 content_type ID 是 74
      }
      queryParams.set('content_type', contentTypeMap[params.type])
    }

    const res = await fetch(
      `${wpApiUrl}/wp-json/wp/v2/news_blog?${queryParams.toString()}`,
      {
        next: { revalidate: 60 }, // 1分钟缓存
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    )

    if (!res.ok) {
      throw new Error(`News & Blogs API error: ${res.status} ${res.statusText}`)
    }

    const wpPosts = await res.json()
    const total = parseInt(res.headers.get('X-WP-Total') || '0')
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '0')

    // 转换 WordPress 数据到前端格式
    const articles: NewsBlogArticle[] = wpPosts.map((post: any) => {
      // 获取图片 URL
      const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'

      // 确定 type (news 或 blogs)
      const contentType = post.content_type?.[0] || post._embedded?.['wp:term']?.[2]?.[0]
      const type = (contentType === 18 || contentType?.slug === 'news') ? 'news' : 'blogs'

      // 获取分类
      const categories = post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) || []

      // 处理 excerpt：移除 HTML 标签并解码 HTML 实体
      const cleanExcerpt = decodeHtmlEntities(post.excerpt?.rendered || '')

      return {
        id: post.id.toString(),
        title: post.title.rendered,
        content: post.content.rendered,
        excerpt: cleanExcerpt,
        featured_image: featuredImage,
        author_name: post.acf?.author_name || 'Admin',
        publish_date: post.acf?.publish_date || post.date?.split('T')[0] || '',
        read_time: post.acf?.read_time || '',
        type: type as 'news' | 'blogs',
        categories: categories,
        slug: post.slug
      }
    })

    console.log(`✅ WordPress API返回 ${articles.length}篇 News & Blogs 文章`)

    return {
      data: articles,
      total,
      total_pages: totalPages
    }

  } catch (error) {
    console.error('❌ Failed to fetch News & Blogs from WordPress:', error)
    throw error
  }
}

/**
 * 获取单篇 News & Blog 文章详情
 * @returns 文章详情，如果文章不存在则返回 null
 */
export async function getNewsBlogDetail(id: string): Promise<NewsBlogArticle | null> {
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  if (!wpApiUrl) {
    console.warn('⚠️ NEXT_PUBLIC_WORDPRESS_API_URL is not defined')
    return null
  }

  try {
    const res = await fetch(
      `${wpApiUrl}/wp-json/wp/v2/news_blog/${id}?_embed=wp:featuredmedia`,
      {
        next: { revalidate: 3600 },
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    if (!res.ok) {
      // 如果是 404，返回 null 而不是抛出错误
      if (res.status === 404) {
        console.warn(`⚠️ Article ${id} not found (404)`)
        return null
      }
      // 其他错误也返回 null，避免构建失败
      console.warn(`⚠️ News & Blog detail API error: ${res.status} for article ${id}`)
      return null
    }

    const post = await res.json()

    // 验证返回的数据是否有效
    if (!post || !post.id) {
      console.warn(`⚠️ Invalid article data for ID ${id}`)
      return null
    }

    // 获取图片 URL
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'

    // 确定 type (news 或 blogs)
    const contentType = post.content_type?.[0] || post._embedded?.['wp:term']?.[2]?.[0]
    const type = (contentType === 18 || contentType?.slug === 'news') ? 'news' : 'blogs'

    // 获取分类
    const categories = post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) || []

    // 处理 excerpt：移除 HTML 标签并解码 HTML 实体
    const cleanExcerpt = decodeHtmlEntities(post.excerpt?.rendered || '')

    const article: NewsBlogArticle = {
      id: post.id.toString(),
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: cleanExcerpt,
      featured_image: featuredImage,
      author_name: post.acf?.author_name || 'Admin',
      publish_date: post.acf?.publish_date || post.date?.split('T')[0] || '',
      read_time: post.acf?.read_time || '',
      type: type as 'news' | 'blogs',
      categories: categories,
      slug: post.slug
    }

    console.log(`✅ 获取文章详情: ${article.title} (ID: ${article.id})`)

    return article

  } catch (error) {
    // 捕获所有错误，返回 null 而不是抛出，避免构建失败
    console.warn(`⚠️ Failed to fetch article ${id}:`, error instanceof Error ? error.message : 'Unknown error')
    return null
  }
}

/**
 * 获取所有 News & Blogs 文章路径（用于 generateStaticParams）
 */
export async function getAllNewsBlogPaths(): Promise<Array<{ id: string; slug: string }>> {
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  if (!wpApiUrl) {
    console.warn('⚠️ NEXT_PUBLIC_WORDPRESS_API_URL is not defined, returning empty paths')
    return []
  }

  try {
    const res = await fetch(
      `${wpApiUrl}/wp-json/wp/v2/news_blog?per_page=100&fields=id,slug&_=${Date.now()}`,
      {
        next: { revalidate: 60 },
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    )

    if (!res.ok) {
      // 如果是 404 或其他错误，记录警告但不抛出错误，返回空数组
      console.warn(`⚠️ News & Blogs paths API returned ${res.status}, returning empty paths`)
      return []
    }

    const posts = await res.json()

    if (!Array.isArray(posts)) {
      console.warn('⚠️ News & Blogs paths API returned invalid data, returning empty paths')
      return []
    }

    console.log(`✅ 共获取 ${posts.length} 条 News & Blogs 路径`)

    return posts.map((post: any) => ({
      id: post.id?.toString() || '',
      slug: post.slug || ''
    })).filter((item: { id: string; slug: string }) => item.id && item.slug)

  } catch (error) {
    // 捕获所有错误，记录但不抛出，返回空数组以避免构建失败
    console.warn('⚠️ Failed to fetch News & Blogs paths:', error instanceof Error ? error.message : 'Unknown error')
    console.warn('⚠️ Returning empty paths to allow build to continue')
    return []
  }
}

// ==================== 数据转换工具函数 ====================

/**
 * 转换WordPress News & Blogs数据到前端格式
 * （目前API已返回标准格式，此函数保留以备未来扩展）
 */
export function transformNewsBlog(article: any): NewsBlogArticle {
  return {
    id: article.id.toString(),
    title: article.title,
    content: article.content,
    excerpt: article.excerpt || '',
    featured_image: article.featured_image,
    author_name: article.author_name,
    publish_date: article.publish_date,
    read_time: article.read_time,
    type: article.type,
    categories: article.categories || [],
    slug: article.slug,
  }
}


// ==================== Products API ====================

export interface Product {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image?: string
  model?: string
  specs?: string
  tech_params?: string
  application_areas?: string
  features?: Array<{ feature: string }>
  case_images?: Array<{ url: string; alt?: string; id?: string }>  // Case studies images gallery
  categories: string[]
}

/**
 * 获取产品列表
 */
export async function getProducts(params: {
  page?: number
  perPage?: number
  category?: string
} = {}): Promise<{ data: Product[]; total: number; total_pages: number }> {
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  if (!wpApiUrl) {
    throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL is not defined')
  }

  try {
    const queryParams = new URLSearchParams({
      page: String(params.page || 1),
      per_page: String(params.perPage || 12),
      status: 'publish',
      _embed: 'wp:featuredmedia,wp:term', // 获取特色图片和分类信息
      _: Date.now().toString()
    })

    // 注意：不在 API 调用中传递分类参数，因为 WordPress REST API 
    // 对于自定义文章类型可能不支持 categories 参数，或者使用了不同的 taxonomy 名称
    // 我们将在客户端进行过滤，这样更可靠
    // 如果需要在 API 端过滤，需要先获取 WordPress 中实际使用的 taxonomy 名称

    const apiUrl = `${wpApiUrl}/wp-json/wp/v2/xinghongproduct?${queryParams.toString()}`
    console.log(`🔗 WordPress API URL: ${apiUrl}`)

    const res = await fetch(
      apiUrl,
      {
        next: { revalidate: 3600 },
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    )

    if (!res.ok) {
      throw new Error(`Products API error: ${res.status}`)
    }

    const wpPosts = await res.json()
    const total = parseInt(res.headers.get('X-WP-Total') || '0')
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '0')

    console.log(`📊 WordPress API 返回 ${wpPosts.length} 个产品 (总计: ${total})`)

    // 转换 WordPress 数据到前端格式
    const products: Product[] = wpPosts.map((post: any) => {
      // 获取图片 URL
      const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'

      // 获取分类 - 检查所有可能的 taxonomy terms
      // WordPress 的 _embedded.wp:term 是一个数组，包含所有 taxonomies
      let categories: string[] = []
      if (post._embedded?.['wp:term']) {
        // wp:term 是一个二维数组，每个元素是一个 taxonomy 的 terms 数组
        // 通常第一个数组是主要的分类法（可能是 categories 或其他自定义分类法）
        for (const termArray of post._embedded['wp:term']) {
          if (Array.isArray(termArray)) {
            const slugs = termArray.map((cat: any) => cat.slug)
            categories.push(...slugs)
          }
        }
      }
      
      // 去重
      categories = [...new Set(categories)]

      // 处理 ACF 字段
      const acf = post.acf || {}

      // 处理案例研究图片库
      let caseImages: Array<{ url: string; alt?: string; id?: string }> = []
      if (acf.case_studies_images && Array.isArray(acf.case_studies_images)) {
        caseImages = acf.case_studies_images.map((img: any) => ({
          url: img.url || img.sizes?.large?.url || img.sizes?.medium?.url || img,
          alt: img.alt || img.title || `Case study image`,
          id: img.id
        }))
      }

      return {
        id: post.id.toString(),
        title: post.title.rendered,
        slug: post.slug,
        content: post.content.rendered,
        excerpt: post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
        featured_image: featuredImage,
        model: acf.product_model || '',
        specs: acf.product_specifications || '',
        tech_params: acf.technical_parameters || '',
        application_areas: acf.application_areas || '',
        features: [], // 可以根据需要从其他字段获取
        case_images: caseImages,
        categories: categories
      }
    })

    console.log(`✅ WordPress API返回 ${products.length} 个产品`)

    return {
      data: products,
      total,
      total_pages: totalPages
    }

  } catch (error) {
    console.error('Failed to fetch products:', error)
    throw error
  }
}

/**
 * 根据 slug 获取单个产品
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  if (!wpApiUrl) {
    throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL is not defined')
  }

  try {
    const res = await fetch(
      `${wpApiUrl}/wp-json/wp/v2/xinghongproduct?slug=${slug}&_embed=wp:featuredmedia&_=${Date.now()}`,
      {
        next: { revalidate: 3600 },
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    )

    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error(`Product detail API error: ${res.status}`)
    }

    const wpPosts = await res.json()

    if (wpPosts.length === 0) return null

    const post = wpPosts[0]

    // 获取图片 URL
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'

    // 获取分类
    const categories = post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.slug) || []

    // 处理 ACF 字段
    const acf = post.acf || {}

    // 处理案例研究图片库
    let caseImages: Array<{ url: string; alt?: string; id?: string }> = []
    if (acf.case_studies_images && Array.isArray(acf.case_studies_images)) {
      caseImages = acf.case_studies_images.map((img: any) => ({
        url: img.url || img.sizes?.large?.url || img.sizes?.medium?.url || img,
        alt: img.alt || img.title || `Case study image`,
        id: img.id
      }))
    }

    return {
      id: post.id.toString(),
      title: post.title.rendered,
      slug: post.slug,
      content: post.content.rendered,
      excerpt: post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
      featured_image: featuredImage,
      model: acf.product_model || '',
      specs: acf.product_specifications || '',
      tech_params: acf.technical_parameters || '',
      application_areas: acf.application_areas || '',
      features: [], // 可以根据需要从其他字段获取
      case_images: caseImages,
      categories: categories
    }

  } catch (error) {
    console.error(`Failed to fetch product ${slug}:`, error)
    throw error
  }
}

/**
 * 获取所有产品路径（用于 generateStaticParams）
 */
export async function getAllProductSlugs(): Promise<Array<{ slug: string }>> {
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  if (!wpApiUrl) {
    throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL is not defined')
  }

  try {
    const res = await fetch(
      `${wpApiUrl}/wp-json/wp/v2/xinghongproduct?per_page=100&fields=slug&_=${Date.now()}`,
      {
        next: { revalidate: 60 },
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    )

    if (!res.ok) {
      throw new Error(`Product slugs API error: ${res.status}`)
    }

    const posts = await res.json()

    return posts.map((post: any) => ({
      slug: post.slug
    }))

  } catch (error) {
    console.error('Failed to fetch product slugs:', error)
    return []
  }
}