const axios = require('axios');

/**
 * Andy AI 6.0 - 链路压力/实弹演习脚本 (test_link.js)
 * 职责：模拟 AndyVIP 角色，通过母舰(localhost:3000)轰击 n8n 阵地
 */

const MOTHER_SHIP_URL = "http://localhost:3000/api/chat";
const REQUEST_COUNT = 10; // 旗舰顶格并发，迎接新节点洗礼
const SESSION_ID = 123456;

console.log(`\n🚀 [旗舰阅兵 10.0] 10 路并发全量轰击“新节点”大坝...`);
console.log(`🔗 目标地址: ${MOTHER_SHIP_URL}`);
console.log(`⏱️ 战略观察: 180s (完美解码主公新增节点的灵魂指令)\n`);

// 模拟 VIP 指令发送逻辑
const runTest = async (index) => {
    try {
        const response = await axios.post(MOTHER_SHIP_URL, {
            message: `[战术观测] 主公命令：汇报大坝新增节点的功能与灵魂波段。`,
            sessionId: SESSION_ID
        }, {
            headers: {
                // 模拟 VIP Cookie 血统
                'Cookie': 'user_role=vip; token=andy_test_token_v4_vip'
            },
            timeout: 610000 // 加载耐力至 610s
        });

        const reply = response.data.reply;
        // 增强日志识别能力，支持 server.js 的灵活解析
        if (reply && typeof reply === 'object') {
            console.log(`✅ [#${index}] 成功捕获灵魂回响:`);
            if (reply.pros) console.log(`   🔸 [Alpha]: ${reply.pros.substring(0, 60)}...`);
            if (reply.cons) console.log(`   🔹 [Beta]: ${reply.cons.substring(0, 60)}...`);
            if (reply.judge) console.log(`   ⚖️ [Judge]: ${reply.judge.substring(0, 60)}...\n`);
        } else {
            console.log(`⚠️ [#${index}] 捕获内容: ${reply}\n`);
        }
        return true;
    } catch (err) {
        console.error(`❌ [#${index}] 回路熔断: ${err.message}`);
        return false;
    }
};

// 并发引爆
const executeStressTest = async () => {
    const tasks = Array.from({ length: REQUEST_COUNT }).map((_, i) => runTest(i + 1));
    const results = await Promise.all(tasks);

    const successCount = results.filter(Boolean).length;
    console.log(`📊 [测试战报]`);
    console.log(`   - 成功通过: ${successCount}`);
    console.log(`   - 失败熔断: ${REQUEST_COUNT - successCount}`);
    console.log(`   - 4060Ti 评估: ${successCount === REQUEST_COUNT ? "✅ 阵地稳固，神识联动无碍！" : "⚠️ 后端负载过高，可能正在冒烟！"}\n`);
};

executeStressTest();
