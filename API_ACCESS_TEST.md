# WordPress API 访问验证指南

本文档提供了验证Vercel服务器能否正常访问WordPress API的多种方法。

## 🧪 验证方法

### 方法1: Web界面测试（推荐）

**部署后测试：**
1. 将项目部署到Vercel
2. 访问 `https://your-domain.vercel.app/api/test-wordpress`
3. 查看测试结果

**本地测试：**
1. 启动本地开发服务器：`npm run dev`
2. 访问 `http://localhost:3000/api/test-wordpress`
3. 查看测试结果

### 方法2: 脚本测试

**本地执行：**
```bash
# 确保已安装node-fetch（如果使用Node.js < 18）
npm install node-fetch

# 运行测试脚本
NEXT_PUBLIC_WORDPRESS_API_URL=https://test2.wxlanyun.com node scripts/test-wordpress-api.js
```

**Vercel环境变量测试：**
```bash
# 在Vercel CLI环境中测试
vercel env pull .env.local
npm run dev
# 然后访问 http://localhost:3000/api/test-wordpress
```

### 方法3: 命令行直接测试

```bash
# 基础连通性测试
curl -H "User-Agent: Test-Client" https://test2.wxlanyun.com/wp-json/

# 成功案例API测试
curl -H "User-Agent: Test-Client" "https://test2.wxlanyun.com/wp-json/wp/v2/successful_project?per_page=5&_embed&status=publish"

# 项目分类API测试
curl -H "User-Agent: Test-Client" "https://test2.wxlanyun.com/wp-json/wp/v2/project_category?per_page=10"
```

### 方法4: 浏览器直接访问

直接在浏览器中打开以下URL：

```
https://test2.wxlanyun.com/wp-json/
https://test2.wxlanyun.com/wp-json/wp/v2/successful_project?per_page=5&_embed&status=publish
https://test2.wxlanyun.com/wp-json/wp/v2/project_category?per_page=10
```

## 📊 测试结果解读

### 成功的响应应该包含：

1. **基础连通性测试**：
   - 状态码：200
   - 返回WordPress REST API基本信息

2. **成功案例API测试**：
   - 状态码：200
   - 返回项目数据数组
   - 每个项目应包含：`title`, `slug`, `_embedded.wp:featuredmedia`, `_embedded.wp:term`

3. **项目分类API测试**：
   - 状态码：200
   - 返回分类数据数组
   - 每个分类应包含：`name`, `slug`, `count`

### 常见错误及解决方案：

| 错误类型 | 可能原因 | 解决方案 |
|---------|---------|---------|
| 404错误 | API端点不存在 | 检查WordPress REST API是否启用 |
| 403错误 | 访问被拒绝 | 检查服务器安全策略和防火墙设置 |
| 连接超时 | 网络问题 | 检查网络连接和服务器响应时间 |
| CORS错误 | 跨域限制 | 在WordPress中配置CORS头部 |

## 🔧 故障排除步骤

### 1. 环境变量验证
确保在Vercel中正确设置了环境变量：
```
NEXT_PUBLIC_WORDPRESS_API_URL = https://test2.wxlanyun.com
```

### 2. WordPress站点检查
- WordPress站点是否正常运行
- REST API是否已启用
- `successful_project` 自定义文章类型是否存在

### 3. Vercel部署检查
- 重新部署项目以确保最新代码生效
- 检查Vercel函数日志是否有错误信息

### 4. 网络连接检查
```bash
# 从Vercel服务器测试网络连接
# 在Vercel CLI中运行：
vercel logs
```

## 📋 验证清单

- [ ] 环境变量已正确设置
- [ ] WordPress站点可以正常访问
- [ ] `/wp-json/` 端点返回200状态码
- [ ] `/wp-json/wp/v2/successful_project` 端点返回项目数据
- [ ] 项目数据包含必要的字段（title, slug, featured media, categories）
- [ ] Vercel部署后API访问测试通过
- [ ] 首页成功案例显示正确

## 🚨 重要提醒

1. **CORS问题**：WordPress API需要允许Vercel域名的跨域访问
2. **缓存**：测试时可能需要清除WordPress和Vercel的缓存
3. **用户代理**：某些服务器可能阻止没有User-Agent的请求
4. **速率限制**：WordPress可能有API调用速率限制

如果所有测试都通过，那么Vercel部署后的首页成功案例应该能够正常显示WordPress的项目数据。