'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useChatContext } from '@/contexts/ChatContext';
import { useAuth } from '@/contexts/AuthContext';
import { DebateMessage } from '@/components/DebateMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Swords, Send, Zap, Loader2, ArrowLeft, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DebateTurn {
    sender: string;
    content: string;
    type?: 'sage' | 'judge' | 'user';
}

export default function DebatePage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const { language } = useLanguage();
    const {
        characters,
        generateSessionId,
        debatePlane,
        debateJudge
    } = useChatContext();
    const { user } = useAuth();

    const [messages, setMessages] = useState<DebateTurn[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // 解析参与圣贤
    const participantIds = slug.split('-vs-');
    const participants = participantIds.map(id =>
        characters.find(c => String(c.id) === String(id))
    ).filter(Boolean);

    // 自动滚动
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    const handleBack = () => router.push('/');

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputValue.trim() || isThinking) return;

        const userText = inputValue;
        setInputValue('');

        // 1. 注入主公神识
        const userTurn: DebateTurn = { sender: user?.username || 'Admin', content: userText, type: 'user' };
        setMessages(prev => [...prev, userTurn]);

        setIsThinking(true);

        try {
            const token = localStorage.getItem('saint_token');
            const payload = {
                user: user?.username || 'guest',
                mode: debatePlane,
                messages: {
                    characters: participantIds,
                    judge: debateJudge,
                    user_input: userText,
                    session_id: generateSessionId(),
                    language: language
                }
            };

            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('圣域连接断绝');
            const data = await response.json();

            // 🏮 核心逻辑：顺序显圣协议 (Sequential Spirit Render)
            let replies: DebateTurn[] = [];
            const r = data.reply || data; // 兼容包装和非包装格式

            const extractContent = (val: any) => {
                if (typeof val === 'string') {
                    // 尝试探测是否是 JSON 字符串
                    if (val.trim().startsWith('{')) {
                        try {
                            const parsed = JSON.parse(val);
                            return parsed.summary || parsed.statement || parsed.content || val;
                        } catch (e) { return val; }
                    }
                    return val;
                }
                if (typeof val === 'object' && val !== null) {
                    return val.summary || val.statement || val.content || JSON.stringify(val);
                }
                return String(val);
            };

            if (r.turns && Array.isArray(r.turns)) {
                replies = r.turns.map((t: any) => ({
                    sender: t.sender,
                    content: extractContent(t.content),
                    type: t.type || 'sage'
                }));
            } else {
                // 🏮 万能嗅探：优先寻找参与圣贤的 ID 作为键
                participants.forEach((p, idx) => {
                    if (p) {
                        const content = r[p.id] || r[p.id.toLowerCase()] || (idx === 0 ? (r.a || r.pros) : (r.b || r.cons));
                        if (content) {
                            replies.push({
                                sender: p.name,
                                content: extractContent(content),
                                type: 'sage'
                            });
                        }
                    }
                });

                // 判官嗅探
                const judgeContent = r.judge || r.Gamma || r.output;
                if (judgeContent) {
                    replies.push({
                        sender: `Judge ${debateJudge || 'wukong'}`,
                        content: extractContent(judgeContent),
                        type: 'judge'
                    });
                }
            }

            // 执行顺序显圣
            for (const reply of replies) {
                await new Promise(resolve => setTimeout(resolve, 2000)); // 降神停留
                setMessages(prev => [...prev, reply]);
            }

        } catch (error) {
            console.error('Debate Error:', error);
            setMessages(prev => [...prev, {
                sender: 'System',
                content: '🛡️ [圣域警告]：辩论位面灵力不稳，请稍后再试。',
                type: 'judge'
            }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <Layout>
            <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-background/50">
                {/* 🏮 第一列：先贤法相 (Left Info) */}
                <div className="hidden lg:flex w-64 flex-col border-r border-border/40 p-6 bg-card/20 backdrop-blur-md">
                    <Button variant="ghost" size="sm" onClick={handleBack} className="mb-8 self-start gap-2 text-muted-foreground hover:text-white">
                        <ArrowLeft className="h-4 w-4" />
                        返回圣殿
                    </Button>

                    <div className="space-y-8">
                        {participants.map((p, idx) => (
                            <div key={p?.id || idx} className="flex flex-col items-center gap-3">
                                <div className={cn(
                                    "w-24 h-24 rounded-2xl border-2 overflow-hidden transition-all duration-1000",
                                    isThinking ? "animate-spirit-flicker border-sage-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]" : "border-white/10"
                                )}>
                                    <img src={p?.avatar} alt="" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-xs font-bold tracking-widest text-sage-gold uppercase">{p?.name}</span>
                                <div className="h-px w-12 bg-white/10" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🏮 第二列：众神议事厅 (Primary Chat) */}
                <div className="flex-1 flex flex-col relative min-w-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.1)_0%,transparent_50%)] pointer-events-none" />

                    {/* Header */}
                    <div className="h-16 flex items-center justify-center border-b border-border/40 bg-background/40 backdrop-blur-xl px-6 relative z-10">
                        <div className="flex items-center gap-4">
                            <Swords className="h-5 w-5 text-sage-gold" />
                            <h2 className="text-lg font-black tracking-[0.4em] text-white uppercase italic">
                                {language === 'zh' ? '众神对冲位面' : 'Great Debate Dimension'}
                            </h2>
                            <Zap className="h-4 w-4 text-sage-gold animate-pulse" />
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-4 md:p-12 space-y-4 no-scrollbar scroll-smooth"
                    >
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                <div className="p-8 rounded-full bg-sage-gold/5 border border-sage-gold/10 animate-pulse">
                                    <Swords className="h-20 w-20 text-sage-gold/20" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-white/90 tracking-widest uppercase italic">
                                        {language === 'zh' ? '请引爆命题' : 'Ignite the Proposition'}
                                    </h3>
                                    <p className="text-muted-foreground text-sm max-w-sm">
                                        {language === 'zh' ? '在这场跨越时空的激辩中，您的言语将是点燃真理的火石。' : 'In this cross-temporal debate, your words are the flint that ignites truth.'}
                                    </p>
                                </div>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <DebateMessage
                                key={i}
                                sender={msg.sender}
                                content={msg.content}
                                type={msg.type}
                                isNew={i === messages.length - 1}
                            />
                        ))}

                        {isThinking && (
                            <div className="flex items-center gap-4 py-4 animate-in fade-in duration-1000">
                                <div className="h-1.5 w-1.5 rounded-full bg-sage-gold animate-bounce [animation-delay:-0.3s]" />
                                <div className="h-1.5 w-1.5 rounded-full bg-sage-gold animate-bounce [animation-delay:-0.15s]" />
                                <div className="h-1.5 w-1.5 rounded-full bg-sage-gold animate-bounce" />
                                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-sage-gold/60 ml-2">
                                    {language === 'zh' ? '神识凝聚中...' : 'Sages Manifesting...'}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-background/60 backdrop-blur-2xl border-t border-border/40 relative z-20">
                        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-sage-gold/20 via-purple-500/10 to-sage-gold/20 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000" />
                            <div className="relative flex items-center gap-3 bg-black/40 border border-white/10 rounded-2xl p-2 pl-4">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={language === 'zh' ? '输入你的命题以引发激辩...' : 'Enter your proposition to trigger the debate...'}
                                    className="border-none bg-transparent focus-visible:ring-0 text-white placeholder:text-white/20 h-10"
                                    disabled={isThinking}
                                />
                                <Button
                                    type="submit"
                                    disabled={!inputValue.trim() || isThinking}
                                    className="bg-sage-gold text-black hover:bg-white h-10 w-10 p-0 rounded-xl transition-all"
                                >
                                    {isThinking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* 🏮 第三列：辩论席位 (Right Info) */}
                <div className="hidden xl:flex w-72 flex-col border-l border-border/40 p-6 bg-card/20 backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-8">
                        <Trophy className="h-4 w-4 text-sage-gold" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/60">
                            {language === 'zh' ? '辩论席位' : 'Chamber Participants'}
                        </span>
                    </div>

                    <div className="space-y-4">
                        {/* Participants for this debate ONLY */}
                        {participants.map((p, idx) => (
                            <div key={p?.id || idx} className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                                    <span className="text-sm font-bold text-white/90">{p?.name}</span>
                                </div>
                                <p className="text-[10px] text-white/40 leading-relaxed line-clamp-2 italic">
                                    {p?.description || 'Divine wisdom from the Great Chamber.'}
                                </p>
                            </div>
                        ))}

                        <div className="pt-8 opacity-20 group">
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-sage-gold to-transparent mb-4" />
                            <p className="text-[10px] text-center italic tracking-widest text-sage-gold uppercase">
                                {language === 'zh' ? '正在连接齐天大圣审判位' : 'Connecting Wukong Judge'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
