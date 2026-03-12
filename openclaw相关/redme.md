http://127.0.0.1:18789/
/home/x/shared/ojia8/sites/openclaw
Mar 11 10:49（最新
运行中的服务使用的是更新的目录
http://127.0.0.1:18789
所以这是Git仓库开发版本 + pnpm全局链接的混合安装方式，不是传统的npm包安装。
如果需要重启，可以使用以下命令：

bash
# 停止当前进程
sudo kill 419
 
# 重新启动
openclaw-gateway
或者直接使用全局安装的命令：

bash
# 从pnpm全局安装目录启动
/home/x/.local/share/pnpm/openclaw-gateway
目前服务正常运行，无需重启。

正确的启动方式：

bash
# 方式1：在项目目录下运行
cd /mnt/d/SharedData/ojia8/sites/openclaw
pnpm run gateway:dev
 
# 方式2：使用全局安装的命令（任何目录）
openclaw gateway
 
# 方式3：直接运行脚本
node /mnt/d/SharedData/ojia8/sites/openclaw/scripts/run-node.mjs gateway
推荐使用方式1

是的，openclaw-gateway确实设置了自动重启

证据：

systemd用户服务：openclaw-gateway.service 已启用（enabled）
自动重启配置：
Restart=always - 进程终止后自动重启
RestartSec=5 - 5秒后重启
启动时间：04:43:02 - 在你重启WSL后自动启动
WantedBy=default.target - 随用户会话自动启动
服务配置：

执行路径：/usr/bin/node /mnt/d/SharedData/ojia8/sites/openclaw/dist/index.js gateway --port 18789
端口：18789
重启策略：always
管理命令：

bash
# 停止服务
systemctl --user stop openclaw-gateway.service
 
# 禁用自动启动
systemctl --user disable openclaw-gateway.service
 
# 启用自动启动
systemctl --user enable openclaw-gateway.service
这就是为什么重启WSL后端口18789仍在运行的原因。