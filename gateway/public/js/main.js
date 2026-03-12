console.log("Andy AI 分布式记忆先锋官控制中心 v6.2 - 长生殿旗舰版点火！");

// 获取 Cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// 状态同步
let intelligenceHistory = JSON.parse(localStorage.getItem('andy_history')) || [];
let activeConcurrencyTasks = 0;
let totalHits = parseInt(localStorage.getItem('andy_hits')) || 0;
let totalRequests = parseInt(localStorage.getItem('andy_reqs')) || 0;
let currentActiveSid = null;

// 更新侧边栏 (增加情报标签与高亮，支持 SID 追溯)
function updateHistorySidebar() {
    const historyList = document.getElementById('history-list');
    if (!historyList) return;
    historyList.innerHTML = intelligenceHistory.map((item, idx) => `
        <div class="history-item ${item.session_id === currentActiveSid ? 'active-session' : ''}" onclick="selectSession(${idx})">
            <div class="history-time">${new Date(item.time).toLocaleTimeString()}</div>
            <div class="history-title">
                <span class="intelligence-label">SID:${item.session_id}</span>${item.title}
            </div>
            <button class="recall-btn" onclick="event.stopPropagation(); recallHistory(${idx})">
                <i class="fas fa-history"></i> 一键召回
            </button>
        </div>
    `).join('') || '<div class="history-time">无历史情报</div>';
}

function selectSession(idx) {
    const item = intelligenceHistory[idx];
    if (item) {
        currentActiveSid = item.session_id;
        updateHistorySidebar();
        console.log(`[SID Trace] 锁定神识频道: ${currentActiveSid}`);
    }
}

// 并发监控操作 (增加黄金灯语)
function updateMonitorPanel(taskId, status, duration = null, isMemoryHit = false) {
    const monitorPanel = document.getElementById('monitor-panel');
    const monitorList = document.getElementById('monitor-list');
    const activeTasksCount = document.getElementById('active-tasks-count');
    const damBtn = document.getElementById('dam-btn');

    if (!monitorPanel || !monitorList) return;
    monitorPanel.style.display = 'block';

    let row = document.getElementById(`monitor-row-${taskId}`);
    if (!row) {
        row = document.createElement('div');
        row.id = `monitor-row-${taskId}`;
        row.className = 'monitor-row';
        monitorList.prepend(row);
    }

    // [监控进化：黄金灯语共振]
    if (isMemoryHit && damBtn) {
        damBtn.classList.add('btn-dam-pulse');
        setTimeout(() => damBtn.classList.remove('btn-dam-pulse'), 5000);
    }

    const dotClass = isMemoryHit ? 'dot-gold' : (status === 'pending' ? 'dot-active' : (status === 'error' ? 'dot-error' : 'dot-idle'));
    const hitLabel = isMemoryHit ? '<span style="color:var(--accent-gold); font-weight:800; animation:pulse-gold 1s infinite;">[GOLD HIT]</span>' : '';

    row.innerHTML = `
        <span class="status-dot ${dotClass}"></span>
        <span>${taskId} ${hitLabel}</span>
        <span class="monitor-time">${duration ? duration + 's' : '...'}</span>
    `;

    if (activeTasksCount) activeTasksCount.innerText = `${activeConcurrencyTasks} ACTIVE`;
    updateHitRateDisplay();

    if (activeConcurrencyTasks === 0) {
        setTimeout(() => { if (activeConcurrencyTasks === 0) monitorPanel.style.display = 'none'; }, 8000);
    }
}

function updateHitRateDisplay() {
    let statsDiv = document.getElementById('memory-stats-panel');
    if (!statsDiv) {
        statsDiv = document.createElement('div');
        statsDiv.id = 'memory-stats-panel';
        statsDiv.className = 'memory-stats';
        document.getElementById('monitor-list')?.parentElement.appendChild(statsDiv);
    }
    const rate = totalRequests > 0 ? ((totalHits / totalRequests) * 100).toFixed(1) : 0;
    statsDiv.innerHTML = `
        <div class="hit-rate-container">
            <span>🧠 记忆共振频率 (Hit Rate)</span>
            <span>${rate}%</span>
        </div>
    `;
}

// 核心渲染逻辑 (剥洋葱式视觉解码)
function renderAIReply(reply) {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;

    if (reply && typeof reply === 'object') {
        if (reply.pros) {
            chatBox.innerHTML += `<div class="chat-message"><div class="message-bubble pros-bubble"><strong>激进派 (Alpha):</strong><br>${reply.pros}</div></div>`;
        }
        if (reply.cons) {
            chatBox.innerHTML += `<div class="chat-message"><div class="message-bubble cons-bubble"><strong>保守派 (Beta):</strong><br>${reply.cons}</div></div>`;
        }

        // [判词解码：Gamma 灵魂重塑]
        let judgeData = reply.judge_json;
        if (!judgeData && typeof reply.judge === 'string' && reply.judge.includes('```json')) {
            try {
                const match = reply.judge.match(/```json\n([\s\S]*?)\n```/);
                if (match) judgeData = JSON.parse(match[1]);
            } catch (e) { console.error("判词微操失败", e); }
        }

        if (judgeData) {
            chatBox.innerHTML += `
                <div class="chat-message">
                    <div class="message-bubble judge-bubble" style="border: 1px solid var(--accent-gold); background: rgba(245,158,11,0.05); width: 100%; max-width: 90%;">
                        <div style="color:var(--accent-gold); font-weight:800; border-bottom:1px solid var(--glass-border); margin-bottom:0.5rem; padding-bottom:0.3rem;">⚖️ 长生殿判语 (By Judge Gamma)</div>
                        <div style="font-size: 0.9rem; margin-bottom: 0.8rem;">
                            <strong style="color:var(--accent-gold);">[摘要]</strong>: ${judgeData.summary || '无描述'}
                        </div>
                        <div style="font-size: 0.9rem; margin-bottom: 0.8rem; padding: 0.5rem; background: rgba(0,0,0,0.2); border-radius: 4px;">
                            <strong style="color:var(--accent-gold);">[冲突聚焦]</strong>: ${judgeData.conflict || '逻辑自洽'}
                        </div>
                        <p style="color:var(--accent-cyan); font-size: 0.8rem;"><strong>[历史追溯]</strong>: ${judgeData.historical_reference || '初次录入分布式记忆'}</p>
                        <div style="margin-top:0.8rem; padding:0.8rem; background:rgba(255,255,255,0.03); border-left:4px solid var(--accent-gold); font-weight: 500;">
                            <strong style="color:var(--accent-gold);">[最终裁决]</strong>: <br>${judgeData.final_decision || ''}
                        </div>
                    </div>
                </div>`;
        } else if (reply.judge) {
            chatBox.innerHTML += `<div class="chat-message"><div class="message-bubble judge-bubble"><strong>最终评估:</strong><br>${reply.judge}</div></div>`;
        }
    } else {
        chatBox.innerHTML += `<div class="chat-message"><div class="message-bubble ai-bubble">${reply || "天命无常，大坝无回响"}</div></div>`;
    }
    chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
}

// 一键召回逻辑 (反向唤醒)
async function recallHistory(idx) {
    const item = intelligenceHistory[idx];
    if (!item) return;

    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div class="chat-message"><div class="message-bubble user-bubble" style="background:var(--accent-gold); color:#000; font-weight:700;">
        <i class="fas fa-history"></i> [召回推演] 锁定 SID: ${item.session_id}，正在重启增量计算...
    </div></div>`;

    sendMessage(`[系统召唤] 请基于 SID:${item.session_id} 的历史结论：“${item.title.substring(0, 15)}...”，进行对冲校验并汇报最新漏洞。`, item.session_id);
}

// 发送指令 (强力输出 SID)
async function sendMessage(overrideMsg = null, overrideSid = null) {
    const input = document.getElementById('chat-input');
    const chatBox = document.getElementById('chat-box');

    const userMessage = overrideMsg || input.value;
    if (!userMessage.trim()) return;
    if (!overrideMsg) input.value = '';

    if (!overrideMsg) {
        chatBox.innerHTML += `<div class="chat-message"><div class="message-bubble user-bubble">${userMessage}</div></div>`;
    }
    chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });

    const taskId = `REQ-${Math.floor(Math.random() * 9000) + 1000}`;
    const targetSid = overrideSid || currentActiveSid || (100000 + Math.floor(Math.random() * 899999));

    activeConcurrencyTasks++;
    totalRequests++;
    localStorage.setItem('andy_reqs', totalRequests);
    updateMonitorPanel(taskId, 'pending');

    const startTime = Date.now();
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage, sessionId: targetSid })
        });

        const data = await response.json();
        const duration = ((Date.now() - startTime) / 1000).toFixed(1);

        activeConcurrencyTasks--;
        if (data.memory_hit) {
            totalHits++;
            localStorage.setItem('andy_hits', totalHits);
        }

        updateMonitorPanel(taskId, 'success', duration, data.memory_hit);
        renderAIReply(data.reply);

        intelligenceHistory.unshift({
            time: Date.now(),
            title: userMessage.substring(0, 30),
            reply: data.reply,
            session_id: data.session_id || targetSid
        });
        localStorage.setItem('andy_history', JSON.stringify(intelligenceHistory.slice(0, 30)));
        updateHistorySidebar();

    } catch (err) {
        activeConcurrencyTasks--;
        updateMonitorPanel(taskId, 'error', 'FAIL');
        renderAIReply(`回路熔断: ${err.message}`);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    updateHistorySidebar();
    updateHitRateDisplay();
    document.getElementById('send-btn')?.addEventListener('click', () => sendMessage());
    document.getElementById('chat-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});

function toggleLoginModal(show) {
    document.getElementById('login-modal').style.display = show ? 'block' : 'none';
}

function logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // 清除本地历史缓存 (可选，主公若想彻底重聚神识可保留这一行)
    // localStorage.removeItem('andy_history');

    location.reload();
}

document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.success) location.reload();
        else {
            const err = document.getElementById('login-error');
            err.innerText = data.message;
            err.style.display = 'block';
        }
    } catch (err) { alert("传输异常"); }
});
