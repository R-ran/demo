# 文章内容添加指南

## 📝 问题分析

当你在WordPress中添加大段文章内容时，如果显示成代码而不是正常的HTML格式，通常有以下几个原因：

1. **WordPress安全设置过滤**
2. **HTML转义问题**
3. **内容格式不正确**
4. **前端渲染配置问题**

## 🛠️ 解决方案

### 方案1：使用静态数据文件（推荐）

这是最简单直接的方法，可以完全控制内容格式。

#### 步骤1：修改静态数据文件

编辑 `lib/news-blog-data.ts` 文件，在 `content` 字段中添加你的HTML内容：

```typescript
{
  id: "1",
  title: "你的文章标题",
  excerpt: "文章摘要",
  publish_date: "2024-11-17",
  featured_image: "/your-image.jpg",
  content: `
    <h2>大标题</h2>
    <p>这是第一段内容。你可以在这里添加完整的HTML内容。</p>

    <h3>子标题</h3>
    <p>更多的段落内容...</p>

    <ul>
      <li>列表项1</li>
      <li>列表项2</li>
      <li>列表项3</li>
    </ul>

    <blockquote>
      <p>引用内容</p>
      <cite>— 作者</cite>
    </blockquote>

    <img src="/images/your-image.jpg" alt="图片描述" />

    <p>更多内容...</p>
  `,
  categories: ["News"],
  type: "news",
  author_name: "作者名称"
}
```

#### 优势：
- ✅ 完全控制内容格式
- ✅ 无WordPress兼容性问题
- ✅ 立即生效，无需配置
- ✅ 支持完整HTML格式

### 方案2：修复WordPress HTML显示问题

如果你想继续使用WordPress，需要进行以下修复：

#### 2.1 检查WordPress设置

1. **移除HTML过滤器**：
   - 在WordPress管理后台
   - 设置 → 撰写 → 格式化
   - 确保"修正无效内嵌的 XHTML"已取消勾选

2. **检查用户角色权限**：
   - 确保你的用户角色有"unfiltered_html"权限

#### 2.2 修改前端渲染逻辑

如果问题在前端，需要检查HTML渲染：

```typescript
// 确保正确设置HTML内容
<div
  className="prose prose-lg max-w-none"
  dangerouslySetInnerHTML={{
    __html: article.content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
  }}
/>
```

### 方案3：创建新文章

如果你想添加全新的文章：

#### 3.1 在静态数据中添加新文章

```typescript
{
  id: "your-article-id",
  title: "新文章标题",
  excerpt: "新文章摘要",
  publish_date: "2024-11-17",
  featured_image: "/new-article-image.jpg",
  content: `你的完整HTML内容`,
  categories: ["Blogs"], // 或 ["News"]
  type: "blogs", // 或 "news"
  author_name: "作者名称"
}
```

#### 3.2 生成访问链接

- News文章：`/news-blogs/news/your-article-id`
- Blog文章：`/news-blogs/blogs/your-article-id`

## 🧨 HTML内容格式建议

### 标签使用：
- ✅ `<h2>`, `<h3>`, `<h4>` - 标题
- ✅ `<p>` - 段落
- ✅ `<ul>`, `<ol>`, `<li>` - 列表
- ✅ `<blockquote>`, `<cite>` - 引用
- ✅ `<img>` - 图片
- ✅ `<a>` - 链接
- ✅ `<strong>`, `<em>` - 强调

### 避免的标签：
- ❌ `<script>` - 脚本
- ❌ `<style>` - 样式
- ❌ `<iframe>` - 嵌入内容
- ❌ 复杂的表单元素

### 图片处理：
```html
<img src="/images/your-image.jpg" alt="图片描述" className="w-full rounded-lg" />
```

## 🔧 快速修复当前问题

如果你已经在WordPress中添加了内容但显示为代码：

1. **立即解决**：使用方案1，直接修改静态数据文件
2. **保存内容**：复制你的WordPress内容
3. **格式化**：确保是有效的HTML格式
4. **粘贴到**：`lib/news-blog-data.ts` 的 `content` 字段中

## 📋 验证步骤

1. **添加内容后**：
   ```bash
   npm run dev
   ```
2. **访问文章页面**：
   - News: `http://localhost:3000/news-blogs/news/1`
   - Blog: `http://localhost:3000/news-blogs/blogs/4`

3. **检查显示**：
   - 内容应该正常显示，不是代码
   - HTML标签应该正确渲染

## 💡 最佳实践建议

1. **优先使用静态数据**：更稳定，无WordPress问题
2. **备份内容**：重要内容先备份
3. **格式检查**：确保HTML格式正确
4. **图片优化**：使用适当大小的图片
5. **响应式设计**：确保在移动端显示正常

**如果遇到具体问题，请告诉我你的具体需求，我可以帮你创建完整的文章内容！**