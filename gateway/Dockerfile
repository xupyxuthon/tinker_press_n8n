# 使用阿里源或官方稳定的 node 版本
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制依赖定义
COPY package*.json ./

# 安装生产依赖
RUN npm install --production

# 复制源代码
COPY . .

# 暴露 3000 端口
EXPOSE 3000

# 默认环境变量 (可在启动时通过 podman/docker -e 覆盖)
ENV PORT=3000
ENV NODE_ENV=production
ENV WP_JWT_ENDPOINT=https://your-wp-site.com/wp-json/jwt-auth/v1/token
ENV N8N_VIP_WEBHOOK=http://localhost:5678/webhook/vip-debate-mode
ENV N8N_STANDARD_WEBHOOK=http://localhost:5678/webhook/standard-chat

# 启动命令
CMD ["node", "server.js"]
