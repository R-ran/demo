# Vercel 自动部署问题排查指南

## 问题：Git 推送后 Vercel 没有自动部署

### 快速检查清单

#### 1. 检查 Vercel 项目设置

**步骤：**
1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 进入 **Settings** → **Git**

**需要确认：**
- ✅ **Repository** 显示为 `R-ran/demo`
- ✅ **Production Branch** 设置为 `main`
- ✅ **Auto-deploy** 选项已启用（Production、Preview、Development）

#### 2. 检查 GitHub Webhook

**步骤：**
1. 访问 GitHub 仓库：`https://github.com/R-ran/demo`
2. 进入 **Settings** → **Webhooks**
3. 查找 Vercel 的 webhook

**应该看到：**
- Webhook URL 包含 `vercel.com`
- 状态为 **Active**（绿色）
- 最近有推送事件记录

**如果没有看到 Vercel webhook：**
- 说明 Vercel 没有正确连接到仓库
- 需要重新连接（见下方解决方案）

#### 3. 手动触发部署

**临时解决方案：**
1. 在 Vercel Dashboard → **Deployments**
2. 点击最新部署右侧的 **"..."** 菜单
3. 选择 **Redeploy**
4. 或者点击页面上的 **"Redeploy"** 按钮

### 解决方案

#### 方案 1：重新连接 GitHub 仓库（推荐）

**步骤：**
1. 在 Vercel Dashboard → 项目 → **Settings** → **Git**
2. 点击 **Disconnect** 断开当前连接
3. 点击 **Connect Git Repository**
4. 选择 **GitHub**
5. 授权并选择仓库 `R-ran/demo`
6. 确认设置：
   - **Production Branch**: `main`
   - **Root Directory**: `./`（如果项目在根目录）
   - **Framework Preset**: Next.js（自动检测）
7. 点击 **Deploy**

#### 方案 2：检查 Vercel CLI 连接

如果你使用过 Vercel CLI，可以检查连接状态：

```bash
# 安装 Vercel CLI（如果还没有）
npm i -g vercel

# 登录
vercel login

# 检查项目链接
vercel link

# 手动触发部署
vercel --prod
```

#### 方案 3：通过 Vercel CLI 手动部署

如果自动部署不工作，可以临时使用 CLI：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署到生产环境
vercel --prod
```

#### 方案 4：检查 GitHub 权限

**步骤：**
1. 访问 GitHub → **Settings** → **Applications** → **Authorized OAuth Apps**
2. 查找 **Vercel**
3. 确认权限包括：
   - ✅ Repository access
   - ✅ Webhook 权限

如果没有，需要：
1. 撤销 Vercel 授权
2. 在 Vercel 中重新连接 GitHub

### 验证部署

部署成功后，你应该看到：
- ✅ Vercel Dashboard 显示新的部署记录
- ✅ 部署状态为 **Ready**
- ✅ 有新的部署 URL

### 常见问题

#### Q: 为什么推送后没有自动部署？
**A:** 最常见的原因是：
- Vercel 项目没有连接到正确的 GitHub 仓库
- Webhook 配置丢失或失效
- 分支名称不匹配（Vercel 监听 `master` 但你在 `main`）

#### Q: 如何确认 Vercel 是否收到了推送事件？
**A:** 
1. 检查 GitHub Webhooks 页面，查看最近的推送事件
2. 检查 Vercel Dashboard → Deployments，看是否有新的部署尝试（即使失败）

#### Q: 重新连接仓库会丢失之前的部署吗？
**A:** 不会。重新连接只是更新 Git 集成，不会删除历史部署记录。

### 下一步

如果以上方案都不行，请：
1. 检查 Vercel Dashboard 的 **Deployments** 页面，看是否有任何错误信息
2. 检查 Vercel Dashboard 的 **Settings** → **General**，确认项目状态正常
3. 查看 Vercel 的 [状态页面](https://www.vercel-status.com/) 确认服务正常

