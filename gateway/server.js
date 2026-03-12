/**
 * Andy AI 旗舰模板 - 核心服务端 (server.js)
 * 职责：处理鉴权分流、中转 n8n 指令、聚合本地及外网情报
 */

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const path = require('path');

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:3001', 'http://127.0.0.1:3001', 'http://localhost:3000', 'http://127.0.0.1:3000'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 配置视图引擎与静态资源
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

// --- 路由层 ---

// 1. 首页预览
app.get('/', (req, res) => {
    // 构造用户对象
    const user = req.cookies.user_name ? {
        name: req.cookies.user_name,
        role: req.cookies.user_role
    } : null;

    res.render('index', {
        title: "Andy AI - 旗舰情报终端",
        user: user
    });
});

// --- 极简鉴权助手 ---
async function validateSaintToken(token) {
    if (!token || token === 'pioneer-dev-token') return { valid: token === 'pioneer-dev-token', role: 'vip', user: { user_nicename: 'admin', user_email: 'admin@saint.com', avatar: '' } };
    try {
        console.log(`[Auth] 正在验证圣印令牌...`);
        // 1. 验证令牌有效性
        const valResp = await axios.post("http://localhost:8083/wp-json/jwt-auth/v1/token/validate", {}, {
            headers: { 'Authorization': `Bearer ${token}` },
            timeout: 10000
        });

        if (valResp.status !== 200) {
            console.warn(`[Auth] 令牌验证未通过: ${valResp.status}`);
            return { valid: false };
        }

        // 2. 获取详尽神识 (尝试获取角色)
        const userResp = await axios.get("http://localhost:8083/wp-json/wp/v2/users/me?context=edit", {
            headers: { 'Authorization': `Bearer ${token}` },
            timeout: 10000
        });

        const wpUser = userResp.data;
        const wpRoles = wpUser.roles || [];
        const wpDisplayName = wpUser.name || "";
        const wpSlug = wpUser.slug || "";
        const wpId = wpUser.id;

        console.log(`[Auth] UserID: ${wpId} | Slug: ${wpSlug} | Display: ${wpDisplayName} | Roles: ${JSON.stringify(wpRoles)}`);

        // 判定角色等级
        let role = 'standard';

        // 🏮 圣域铁律：ID 为 1 (暗合 admin) 或 名讳含有 admin 的直接降临 VIP
        if (wpId === 1 || wpSlug.toLowerCase() === 'admin' || wpDisplayName.toLowerCase().includes('admin') || wpUser.email?.toLowerCase().includes('admin')) {
            role = 'vip';
            console.log(`[Auth] 检出圣主级特权 (Detected Admin/VIP privilege)`);
        } else if (wpRoles.includes('saint_master') || wpRoles.includes('administrator') || wpRoles.includes('saint_vip')) {
            role = 'vip';
        } else if (wpRoles.includes('common_seeker')) {
            role = 'standard';
        } else {
            role = 'guest';
        }

        return {
            valid: true,
            role: role,
            user: {
                // 如果是 admin，确保返回一个能被前端识别的名字，或者保留原始名讳
                user_nicename: (wpId === 1) ? "admin" : wpDisplayName,
                user_email: wpUser.email || "",
                avatar: wpUser.avatar_urls?.['96'] || ""
            }
        };
    } catch (e) {
        console.error("[Auth Error]", e.message);
        return { valid: false };
    }
}

// 2. 鉴权模块 (AndyAuth 2.0)
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`[Login] 收到登录请求: ${username}`);

    // 🏮 圣域特权：主公通行证硬跳转
    if (username === 'admin' && password === 'admin123') {
        console.log(`[Login] 检出圣主级特权，显圣授印！`);
        const token = 'pioneer-dev-token';
        res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });
        res.cookie('user_role', 'vip', { maxAge: 86400000 });
        return res.json({
            success: true,
            user: {
                name: "admin",
                role: "vip",
                avatar: "https://ui-avatars.com/api/?name=Admin&background=8b5cf6&color=fff"
            },
            token: token
        });
    }

    const WP_API = "http://localhost:8083/wp-json/jwt-auth/v1/token";

    try {
        const response = await axios.post(WP_API, { username, password }, { timeout: 15000 });
        if (response.data && response.data.token) {
            const token = response.data.token;
            console.log(`[Login] JWT 签发成功，正在检索权限...`);
            // 立即获取详尽神识与角色
            const authStatus = await validateSaintToken(token);

            if (authStatus.valid) {
                res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });
                res.cookie('user_role', authStatus.role, { maxAge: 86400000 });
                res.json({
                    success: true,
                    user: {
                        name: authStatus.user.user_nicename,
                        role: authStatus.role,
                        avatar: authStatus.user.avatar
                    },
                    token: token
                });
                console.log(`[Login] 授印成功: ${authStatus.user.user_nicename}`);
            } else {
                throw new Error('Identity retrieval failed');
            }
        } else {
            throw new Error('Verification failed');
        }
    } catch (error) {
        console.error(`[Login Error] ${error.message}`);
        res.status(401).json({ success: false, message: '大坝验证未通过：圣域拒收此神识' });
    }
});

// 🏮 [用户身份透传]
app.get('/api/me', async (req, res) => {
    console.log(`[Session Check] 触发神识同步探测...`);
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    const authStatus = await validateSaintToken(token);
    if (authStatus.valid) {
        res.json({ success: true, user: { name: authStatus.user.user_nicename, email: authStatus.user.user_email, role: authStatus.role } });
    } else {
        res.status(401).json({ success: false, message: '神识已散，请重新授印' });
    }
});

// 3. 核心分流闸机 (Andy AI 4.0 - 超时保护与离线备用驱动)
app.post('/api/chat', async (req, res) => {
    const payload = req.body; // 🏮 [神识全通] 捕获完整嵌套载荷
    const userToken = req.headers.authorization?.split(' ')[1] || req.cookies.token;

    // 🏮 [鉴权死律：无授权，则乱棍打出]
    const authStatus = await validateSaintToken(userToken);
    if (!authStatus.valid) {
        return res.status(403).json({ reply: "🛡️ [大坝禁令牌] 身份不明，乱棍打出！请重回圣经阁授印。", forbidden: true });
    }

    const userRole = authStatus.role;
    // 🏮 [圣域铁律：固定轰击生产航道] 数据库 ID ECFDV0dNUBL5xTT5 状态为 1，严禁再轰击 -test 后缀
    const N8N_URL = "http://localhost:5678/webhook/vip-debate";

    console.log(`[Router 7.0] 模式辨识: ${payload.mode || 'standard'} | 身份: ${userRole}`);
    console.log(`[Router 7.0] 正在接入神识节点 -> ${N8N_URL}`);

    try {
        let finalReply;
        try {
            console.log(`[Router 7.0] 🚀 [圣域直通] 发送载荷详情:`, JSON.stringify(payload, null, 2));

            const n8nResponse = await axios.post(N8N_URL, payload, { timeout: 30000 });

            finalReply = n8nResponse.data;
            if (Array.isArray(finalReply) && finalReply.length > 0) finalReply = finalReply[0];
            if (finalReply.output) finalReply = finalReply.output;

            console.log(`[Backhaul] n8n 响应成功`);
        } catch (e) {
            if (e.response) {
                console.error(`[Router 6.0] n8n 拒收报文 (Status ${e.response.status}):`, JSON.stringify(e.response.data));
            }
            // [A1 显圣逻辑：三位一体本地引擎 (Bypass n8n)]
            console.warn(`[Local Engine Activation] n8n 阵地未响应，先锋官 A1 强制开启本地三位一体演兵...`);

            const LM_BASE = process.env.LM_STUDIO_API_URL || "http://localhost:1234/v1";
            const modelName = process.env.LM_STUDIO_MODEL || "qwen2.5-14b-instruct-1m";

            const userContent = payload.messages?.user_input || payload.user_input || payload.message || "请显圣";

            const lmResponse = await axios.post(`${LM_BASE}/chat/completions`, {
                model: modelName,
                messages: [
                    {
                        role: "system",
                        content: `你现在是大坝中枢的三位一体演兵引擎。请基于主公的话题，同时模拟三方视角并返回 JSON 格式：
                        1. Alpha (Pros): 激进派，前瞻、冒险、不计代价。
                        2. Beta (Cons): 保守派，审慎、稳健、防御至上。
                        3. Gamma (Judge): 裁判官，权衡利弊给出最终判语。
                        请务必返回 JSON 格式，包含字段: { "pros": "...", "cons": "...", "judge": "...", "judge_json": { "summary": "...", "conflict": "...", "final_decision": "..." } }`
                    },
                    { role: "user", content: userContent }
                ],
                temperature: 0.7,
                stream: false
            }, { timeout: 180000 }); // 3分钟内必须回传

            const content = lmResponse.data.choices[0].message.content;
            console.log(`[Trinity Response] 原生回响载荷已捕获`);

            // 智能提取 JSON
            try {
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const parsed = JSON.parse(jsonMatch[0]);
                    // 🏮 灵力对齐：将本地引擎的 pros/cons 映射为请求中的具体先贤 ID
                    const charIds = payload.messages?.characters || [];
                    finalReply = {
                        ...parsed,
                        [charIds[0] || 'a']: parsed.pros || parsed.a || parsed[charIds[0]],
                        [charIds[1] || 'b']: parsed.cons || parsed.b || parsed[charIds[1]],
                        judge: parsed.judge_json || parsed.judge || parsed.gamma || parsed.output
                    };
                } else {
                    finalReply = { judge: content };
                }
            } catch (je) {
                finalReply = { judge: content };
            }
        }

        // [长生殿实战：记忆命中模拟]
        const memoryHit = Math.random() > 0.7; // 本地模式模拟记忆命中

        const finalSessionId = payload.messages?.session_id || payload.session_id || "unknown_session";

        // [长生殿实战：WP 物理刻录 (如果 Token 存在)]
        if (userToken && finalReply && finalReply.judge) {
            const WP_SYNC_URL = process.env.WP_SYNC_ENDPOINT || "http://localhost:8083/?rest_route=/andy-ai/v1/sync-intelligence";
            console.log(`[WP Sync] 正在同步分布式记忆至 8083...`);
            axios.post(WP_SYNC_URL, {
                session_id: finalSessionId,
                intelligence_judge: finalReply.judge,
                pioneer_rank: "Pioneer_A1"
            }, { headers: { 'Authorization': `Bearer ${userToken}` } }).catch(() => { });
        }

        res.json({
            reply: finalReply,
            memory_hit: memoryHit,
            session_id: finalSessionId
        });

    } catch (error) {
        console.error(`[Router 6.0 Error] 全链路故障: ${error.message}`);
        res.json({
            reply: "🛡️ [大坝离线保护] 局长提醒：全链路神识断绝，请检查 LM Studio 服务 (1234 端口) 是否已开启。",
            error_detail: error.message,
            is_mock: true
        });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 Andy AI 旗舰大坝已合龙！`);
    console.log(`📡 监听端口: ${PORT}`);
    console.log(`🔗 访问地址: http://localhost:${PORT}\n`);
});
