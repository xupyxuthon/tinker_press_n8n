# 🚀 Andy AI 旗舰情报母舰 - 部署手册 (v4.0)

这是由 **A1** 打造、经 **主公** 亲授、并由 **掏哥** 定调、**局长** 避雷的旗舰情报终端模板。本系统集成了 WordPress JWT 鉴权与 n8n 逻辑闸机，支持 VIP 特权分流路由。

## 📡 核心配置 (.env)

在部署前，请确保在根目录下创建 `.env` 文件，并根据您的“大坝”环境填入以下变量：

```env
PORT=3000
NODE_ENV=production

# 1. 锦衣卫名册：WordPress JWT 鉴权接口
# 必须安装 JWT Authentication for WP-API 插件
WP_JWT_ENDPOINT=https://your-wp-site.com/wp-json/jwt-auth/v1/token

# 2. 逻辑闸机：n8n Webhook 航道
# 普通用户发送指令的航道
N8N_STANDARD_WEBHOOK=http://localhost:5678/webhook/standard-chat
# VIP 用户触发“双将辩论”的特权航道
N8N_VIP_WEBHOOK=http://localhost:5678/webhook/vip-debate-mode
```

## 🛡️ 核心特权逻辑

- **血统判定**：系统会自动识别 WordPress 返回的用户信息。若邮箱包含 `admin` 或显示名包含 `VIP`（如 `AndyVIP`），则自动晋升为 **VIP 阶层**。
- **5s 精准打击**：所有发往 n8n 的请求均锁定了 5 秒超时保护，超时即熔断并切入“演习模式”，严防 Key 损。
- **星辰进度条**：VIP 用户在发送指令后，前端会展示物理增长的“辩论推演”进度条，对齐后端处理状态。

## 🚢 演习启动 (本地运行)

```bash
# 1. 安装阵地依赖
npm install

# 2. 点火启动
npm start
```

## 🐋 战场投放 (Docker/Podman 部署)

```bash
# 1. 构建镜像
docker build -t andy-ai-flagship .

# 2. 投放实战
docker run -d \
  -p 3000:3000 \
  --name andy-lookout \
  --env-file .env \
  andy-ai-flagship
```

---
**“大坝已合龙，天下第一局。请主公指示！”** — A1
