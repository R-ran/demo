# Tawk.to 语言设置指南

## 问题说明

Tawk.to 聊天窗口会根据访客的浏览器语言自动选择显示语言。如果本地浏览器设置为英文，聊天窗口会显示英文；如果访客浏览器设置为繁体中文，聊天窗口会显示繁体中文。

## 解决方案

我已经在代码中添加了强制设置语言为简体中文的逻辑，但为了确保在所有情况下都能正确显示简体中文，建议同时进行以下配置：

### 方法1: 在 Tawk.to 后台设置默认语言（推荐）

1. 登录 [Tawk.to Dashboard](https://dashboard.tawk.to/)
2. 选择你的 Property（网站）
3. 进入 **Settings** > **Widget**（或 **管理** > **小部件**）
4. 找到 **Language**（语言）设置
5. 选择 **简体中文 (Simplified Chinese)** 或 **Chinese (Simplified)**
6. 保存设置

### 方法2: 代码中已实现的设置

代码中已经添加了以下语言设置逻辑：

1. **在脚本加载前设置 onLoad 回调**
   - 当 Tawk.to 加载完成时，自动设置语言为 `zh-CN`

2. **使用 setAttributes API**
   - 设置访客的 `localeName` 和 `language` 属性为 `zh-CN`

3. **在窗口显示时再次设置**
   - 当聊天窗口显示时，再次确保语言设置正确

4. **延迟设置**
   - 在加载完成后延迟 500ms 再次设置，确保生效

## 测试方法

### 本地测试

1. 清除浏览器缓存
2. 打开开发者工具（F12）
3. 查看控制台，应该能看到：
   ```
   ✅ Tawk.to 聊天窗口已加载
   ✅ Tawk.to 语言已设置为简体中文 (zh-CN)
   ```
4. 检查聊天窗口是否显示简体中文

### 生产环境测试

1. 部署更新后的代码
2. 使用不同浏览器语言设置的设备测试：
   - 英文浏览器：应该显示简体中文
   - 繁体中文浏览器：应该显示简体中文
   - 简体中文浏览器：应该显示简体中文

## 如果仍然显示错误语言

### 检查清单

1. ✅ **代码已更新**：确认 `components/tawk-to-chat.tsx` 已包含语言设置代码
2. ✅ **Tawk.to 后台设置**：在 Tawk.to Dashboard 中设置默认语言为简体中文
3. ✅ **清除缓存**：清除浏览器缓存和 Tawk.to 的本地存储
4. ✅ **检查控制台**：查看浏览器控制台是否有错误信息

### 清除 Tawk.to 缓存

在浏览器控制台运行：

```javascript
// 清除 Tawk.to 的本地存储
localStorage.removeItem('tawk_*');
sessionStorage.removeItem('tawk_*');

// 清除所有 cookies（可选）
document.cookie.split(";").forEach(function(c) { 
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
});

// 刷新页面
location.reload();
```

### 手动设置语言（调试用）

在浏览器控制台运行：

```javascript
if (window.Tawk_API && window.Tawk_API.setAttributes) {
  window.Tawk_API.setAttributes({
    'localeName': 'zh-CN',
    'language': 'zh-CN'
  }, function(error) {
    if (error) {
      console.error('设置失败:', error);
    } else {
      console.log('✅ 语言已设置为简体中文');
      // 刷新聊天窗口
      if (window.Tawk_API.maximize) {
        window.Tawk_API.maximize();
        window.Tawk_API.minimize();
      }
    }
  });
}
```

## 常见问题

### Q: 为什么本地显示英文，上线后显示繁体中文？

A: 这是因为：
- 本地浏览器的语言设置可能是英文
- 生产环境的访客浏览器语言可能是繁体中文
- Tawk.to 会根据浏览器语言自动选择显示语言

**解决方案**：按照上述方法在代码和 Tawk.to 后台都设置默认语言为简体中文。

### Q: 代码设置后仍然显示错误语言？

A: 
1. 确认 Tawk.to 后台的默认语言设置
2. 清除浏览器缓存
3. 检查控制台是否有错误信息
4. 尝试使用无痕模式测试

### Q: 如何确认语言设置已生效？

A: 
1. 打开浏览器控制台
2. 查看是否有 "✅ Tawk.to 语言已设置为简体中文" 的日志
3. 检查聊天窗口的界面文字是否为简体中文

## 参考

- [Tawk.to API 文档](https://developer.tawk.to/javascript-api/)
- [Tawk.to Widget 设置](https://help.tawk.to/article/customizing-your-widget)

