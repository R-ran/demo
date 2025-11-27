# 页面标题管理指南

## 概述

所有页面的标题现在统一在 `lib/page-titles.ts` 文件中管理。这样可以：
- ✅ 在一个地方管理所有页面标题
- ✅ 自动同步到 metadata（SEO）和 h1 标签
- ✅ 方便维护和更新

## 如何更新页面标题

### 1. 编辑配置文件

打开 `lib/page-titles.ts` 文件，找到对应的页面配置：

```typescript
export const pageTitles: Record<string, PageTitleConfig> = {
  '/about': {
    title: 'About Us',  // 浏览器标签和SEO标题
    h1Title: 'About <span className="text-primary">Us</span>',  // H1标签（支持HTML）
    description: '页面描述...',
    keywords: ['关键词1', '关键词2'],
  },
}
```

### 2. 更新标题字段

- **title**: 用于浏览器标签和 SEO，会显示为 "About Us | XINHONG"
- **h1Title**: 用于页面上的 H1 标签（可选，如果不设置则使用 title）
- **description**: 页面描述，用于 SEO
- **keywords**: 关键词数组，用于 SEO

### 3. 在页面中使用

#### 在服务器组件中使用（用于 metadata）

```typescript
import { getPageTitle, getFullPageTitle } from "@/lib/page-titles"

const pageConfig = getPageTitle('/about')

export const metadata: Metadata = {
  title: pageConfig.title,
  description: pageConfig.description,
  keywords: pageConfig.keywords,
  openGraph: {
    title: getFullPageTitle('/about'),
    description: pageConfig.description,
  },
}
```

#### 在客户端组件中使用（用于 H1 标签）

```typescript
import { getPageTitle } from "@/lib/page-titles"

// 在组件中
const pageConfig = getPageTitle('/about')

// 在 JSX 中
<h1 className="text-4xl font-bold" dangerouslySetInnerHTML={{ __html: pageConfig.h1Title || pageConfig.title }} />
```

## 已配置的页面

- `/` - 首页
- `/about` - About Us 页面
- `/products` - Products 页面
- `/contact` - Contact 页面
- `/news-blogs` - News & Blogs 页面
- `/successful-projects` - Successful Projects 页面

## 添加新页面

1. 在 `pageTitles` 对象中添加新配置：

```typescript
'/new-page': {
  title: 'New Page',
  h1Title: 'New <span className="text-primary">Page</span>',
  description: '页面描述',
  keywords: ['关键词1', '关键词2'],
}
```

2. 在页面文件中导入并使用：

```typescript
import { getPageTitle, getFullPageTitle } from "@/lib/page-titles"

const pageConfig = getPageTitle('/new-page')
```

## 注意事项

1. **路径匹配**: 动态路由（如 `/products/[slug]`）会自动匹配到父级配置
2. **H1 标签**: 如果 `h1Title` 包含 HTML，需要使用 `dangerouslySetInnerHTML`
3. **默认值**: 如果路径未找到，会返回首页配置

## 示例：更新 About Us 页面标题

```typescript
// lib/page-titles.ts
'/about': {
  title: 'About XINHONG',  // 修改这里
  h1Title: 'About <span className="text-primary">XINHONG</span>',  // 修改这里
  description: '新的描述...',  // 修改这里
  keywords: ['新关键词1', '新关键词2'],  // 修改这里
}
```

保存后，页面的 metadata 和 h1 标签会自动更新！

