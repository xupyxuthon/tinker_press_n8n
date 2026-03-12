# 商用级站群管理系统：全流程技术实施手册

本文档旨在记录并指导如何将本 AI 聊天项目从“单站 JSON 版”迁移到“多域名、可视化后台、全场景分发”的商用级站群架构。

---

## 一、 系统架构：渲染引擎模式
**核心理念**：不再为每个网站写代码，而是开发一套通用的“渲染引擎”，通过域名识别（Middleware）实时加载对应的后台配置。

### 1. 域名分发逻辑 (Middleware)
在 `src/middleware.ts` 中实现：
*   **动作**：捕获访客的 `hostname` (如 `fuxi.com`)。
*   **映射**：将流量重定向至内部路由 `/_sites/[domain]/...`。
*   **注入**：在 Header 中注入 `x-site-id`，方便前端组件获取对应的站点配置。

### 2. 多租户数据库模型 (PostgreSQL + Prisma)
我们将目前的 JSON 结构迁移到以下数据库表：

#### **Site (站点主表)**
```prisma
model Site {
  id            String      @id @default(uuid())
  domain        String      @unique // 绑定的域名
  siteName      String      // 网站标题
  themeConfig   Json        // 存储配色、字体、Favicon URL
  seoConfig     Json        // 关键词、描述、OG 图
  characters    Character[] // 该站点挂载的角色
  users         User[]      // 从该站点注册的用户
}
```

#### **Character (角色/智库表)**
```prisma
model Character {
  id            String      @id
  slug          String      // URL 路径名
  nameKey       String      // 翻译键名
  persona       Text        // 人格设定
  greeting      Text        // 初始问候
  sites         Site[]      // 多对多映射：一个角色可发布到多个站点
}
```

---

## 二、 后台管理 (Payload CMS 集成)
引入 **Payload CMS 3.0**，实现真正的“点点鼠标管全站”。

*   **可视化操作**：直接在网页上上传角色头像、修改欢迎语、设置会员价格。
*   **站点快照**：支持一键复制站点配置给新域名。
*   **媒体库管理**：集中管理所有角色的声音片段和背景图，跨站共享。

---

## 三、 详细迁移路线图 (Roadmap)

### 第一阶段：环境与数据库加固
1.  **基础设施**：在服务器部署 PostgreSQL。
2.  **ORM 接入**：安装 Prisma，根据上述 Schema 生成数据库表。
3.  **数据接力**：编写 `migrate.ts` 脚本，将现有的 `data/*.json` 自动导入 PostgreSQL。

### 第二阶段：引擎化改造 (Refactor)
1.  **路由重构**：将 `src/app/[character]/page.tsx` 移动到 `src/app/_sites/[domain]/[character]/page.tsx`。
2.  **配置中心化**：创建一个 `getSiteConfig(domain)` 函数，作为全站数据的唯一取数口。
3.  **主题引擎**：修改 `Layout.tsx`，根据站点配置动态插入 CSS 变量（如 `--primary-color`）。

### 第三阶段：多域名自动化绑定
1.  **域名泛解析**：在 Vercel 或 Nginx 服务器上配置通配符域名绑定。
2.  **HTTPS 自动续期**：确保每一个新加入的域名都能自动获得 SSL 证书。

---

## 四、 执行示例：如果你注册了一个新域名 `einstein-ai.com`
1.  **后台录入**：登录 `/admin`，点击“新增站点”，填入域名 `einstein-ai.com`。
2.  **角色关联**：在角色列表中勾选“爱因斯坦”、“牛顿”。
3.  **选择主题**：在选择框中点选“极简白样式”。
4.  **上线**：保存后，用户访问 `einstein-ai.com` 即可看到一个全新的科学系 AI 网站，对话逻辑完全复用，但品牌完全独立。

---

## 五、 重点风险告知与备忘
*   **跨站登录**：默认采用独立站点登录。如需“一套账号走天下”，需配置主域名 SSO。
*   **流量配额**：多站点共享统一的 API 密钥库（如 Groq/OpenAI），建议在后台增加站点级的 Token 消耗监控。
*   **静态资源**：所有的 Favicon 和 Logo 必须存储在公共云存储（如 S3/OSS），不能放在 `public` 文件夹下以防体积爆炸。

---

## 六、 用户准备清单 (Pre-flight Checklist)

在正式启动迁移任务前，您需要准备或确认以下资源：

### 1. 域名 (Domains)
*   **当前阶段**：**无需立即购买**。我们可以在开发环境中使用 `localhost` 或通过本地 `hosts` 文件模拟任意域名。
*   **上线阶段**：当您准备面向公众时，需要购买对应的域名，并确保您可以修改域名的 DNS 解析。
*   **省钱技巧**：支持使用单域名的子域名进行测试（如 `site1.test.com`, `site2.test.com`）。

### 2. 数据库 (PostgreSQL)
*   **本地开发**：如果您的开发机支持 Docker，我可以帮您配置本地数据库。
*   **生产环境**：由于 JSON 文件无法支持大规模并发，您需要一个 PostgreSQL 实例。推荐使用：
    *   **Supabase / Neon** (有免费额度的 Serverless 数据库)
    *   **自建 Docker 版 PostgreSQL** (部署在您的 Linux 服务器上)

### 3. 运行环境与托管
*   **推荐方案 (Vercel)**：最适合 Next.js，支持一键部署和自动 SSL。
*   **自建服务器方案**：一台 **Linux VPS** (最低配置建议 2核 4G 内存)，需安装 Docker 和 Node.js。

### 4. AI 接口资源
*   确认您的 Groq、OpenAI 或 Claude 的 API Key 正常可用，且账户内有剩余额度，因为我们将开始支持多站点的高频率测试。

### 5. 存储空间 (S3/OSS)
*   准备一个兼容 S3 协议的对象存储（或者使用 Payload 原生支持的本地文件存储），用于存放各站点的 Logo、角色图片和录音文件。

## 七、 附加资源：利用 Google Cloud (GCP) 赠金进行零成本部署

针对您拥有的 **$300 Google Cloud 赠金**，我们建议将其作为站群系统的核心动力源。

### 1. 核心推荐：Google Cloud SQL (PostgreSQL 版)
这是承载多租户数据的最佳选择。
*   **实例规格**：选择 **db-f1-micro** (共享核心, 0.614 GB 内存)。
*   **成本估算**：约 **$10 - $15 / 月**。
*   **赠金耐用度**：您的 $300 赠金足以支撑数据库运行 **20个月以上**。
*   **优势**：全托管服务，自动备份，企业级稳定性。

### 2. GCP 快速创建指南
1.  **创建实例**：进入 GCP 控制台 -> SQL -> 创建实例 -> 选择 PostgreSQL。
2.  **机型配置**：在“配置实例”时，展开“机器配置”，务必选择 **“共享核心” (Shared Core)** 下的 `db-f1-micro` 以最大化节省赠金。
3.  **网络安全**：
    *   在“连接”选项中，启用“公共 IP”。
    *   将您的开发环境 IP 地址加入“授权网络”白名单。
4.  **连接参数**：创建完成后，暂存您的 **Connection Name** 和所设置的 **密码**。

### 3. 应用层接入 (Prisma/Payload)
在项目环境变量 `.env` 中，您的数据库连接字符串将如下所示：
`DATABASE_URL="postgresql://USER:PASSWORD@PUBLIC_IP:5432/DATABASE_NAME?schema=public"`

---
**本手册已锁定项目核心逻辑，请在任务启动后优先读取此文件。**
