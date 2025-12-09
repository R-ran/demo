# Tawk.to Webhook 配置指南

## 问题说明

Tawk.to 聊天消息默认只会在 Tawk.to 后台显示。如果要让应用后台也收到消息通知，需要配置 Webhook。

## 配置步骤

### 1. 确认 Webhook API 路由已创建

确保 `app/api/tawk/webhook/route.ts` 文件已存在（已创建）。

### 2. 部署应用

确保应用已部署，并且可以通过公网访问。

### 3. 在 Tawk.to 后台配置 Webhook

1. 登录 [Tawk.to Dashboard](https://dashboard.tawk.to/)
2. 选择你的 Property（网站）
3. 进入 **Settings** > **Webhooks**（或 **Admin** > **Channels** > **Webhooks**）
4. 点击 **Add Webhook** 或 **Create Webhook**
5. 填写以下信息：
   - **Webhook URL**: `https://yourdomain.com/api/tawk/webhook`
     - 将 `yourdomain.com` 替换为你的实际域名
     - 如果是本地测试，可以使用 ngrok: `https://your-ngrok-url.ngrok.io/api/tawk/webhook`
   - **Events**: 选择以下事件（根据可用选项）：
     - `Chat Start` - 当聊天开始时（**推荐添加**）
     - `Chat Message` - 当收到新消息时（**推荐添加**）
     - `Chat End` - 当聊天结束时（可选）
   
   ⚠️ **注意：** 如果只选择了 "Chat Start"，那么只有在访客**开始**聊天时才会收到通知，后续的消息可能不会触发 Webhook。建议同时添加 "Chat Message" 事件。
6. 点击 **Save** 保存

### 4. 配置 Secret Key（重要！）

**Secret Key 的作用：**
- 用于验证 Webhook 请求的真实性，防止伪造请求
- Tawk.to 会使用 HMAC-SHA1 算法对请求进行签名
- 服务器端会验证签名，确保请求来自 Tawk.to

**配置步骤：**
1. 在 Tawk.to Webhook 配置页面，复制 **Secret Key**（图片中显示的长字符串）
2. 在项目根目录的 `.env.local` 文件中添加：

```env
TAWK_WEBHOOK_SECRET=13c15a8725e731448cecc972403dae1b22e6cbee24c9b33f998bbf571a96f
```

⚠️ **重要：** 将上面的值替换为你从 Tawk.to 后台复制的实际 Secret Key！

**如果没有配置 Secret Key：**
- Webhook 仍然可以工作，但会跳过签名验证
- 建议配置 Secret Key 以提高安全性

### 5. 测试 Webhook

1. 在网站上发送一条测试消息
2. 查看应用的服务器日志，应该能看到类似以下内容：
   ```
   📩 收到 Tawk.to Webhook: {...}
   ✅ Tawk.to 消息邮件通知已发送
   ```
3. 检查配置的接收邮箱是否收到通知邮件

## 消息通知方式

配置 Webhook 后，当有新消息时：

1. **邮件通知**（自动）
   - 如果配置了 SMTP 环境变量（`SMTP_USER`, `SMTP_PASS`, `RECV_MAIL`）
   - 消息会自动发送到 `RECV_MAIL` 邮箱

2. **自定义处理**（需要修改代码）
   - 在 `app/api/tawk/webhook/route.ts` 中添加你的业务逻辑
   - 例如：保存到数据库、发送到 Slack、触发其他 API 等

## 调试

### 查看 Webhook 日志

在应用服务器日志中查看：
```bash
# 开发环境
npm run dev

# 生产环境查看部署平台的日志
```

### 测试 Webhook 端点

访问：
```
GET https://yourdomain.com/api/tawk/webhook
```

应该返回：
```json
{
  "message": "Tawk.to Webhook endpoint is active",
  "instructions": "Configure this URL in Tawk.to Dashboard > Settings > Webhooks"
}
```

### 检查 Tawk.to Webhook 配置

在 Tawk.to Dashboard 中：
- 查看 Webhooks 列表，确认 Webhook URL 正确
- 查看 Webhook 日志/历史记录，确认请求是否成功发送

## 常见问题

### Q: Webhook 没有被触发？
A: 
- 确认 Webhook URL 可以从公网访问
- 确认 Tawk.to 中选择了正确的事件类型
- 检查 Tawk.to Dashboard 中的 Webhook 日志

### Q: 收到 404 错误？
A: 
- 确认 API 路由文件路径正确：`app/api/tawk/webhook/route.ts`
- 确认部署时包含了 API 路由
- 确认 URL 路径正确：`/api/tawk/webhook`

### Q: 收到消息但没有邮件通知？
A: 
- 检查 SMTP 环境变量是否配置正确
- 检查服务器日志中的错误信息
- 确认 `RECV_MAIL` 环境变量已设置

### Q: 本地开发如何测试？
A: 
- 使用 ngrok 将本地端口暴露到公网：
  ```bash
  ngrok http 3000
  ```
- 在 Tawk.to 中使用 ngrok 提供的 URL 配置 Webhook

## 参考链接

- [Tawk.to API 文档](https://developer.tawk.to/)
- [Tawk.to Webhooks 文档](https://developer.tawk.to/webhooks/)

