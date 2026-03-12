'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { SpiritText } from './SpiritText';
import { ShieldCheck, User } from 'lucide-react';

interface DebateMessageProps {
    sender: string;
    content: string;
    type?: 'sage' | 'judge' | 'user';
    isNew?: boolean;
}

// 🏮 圣域色盘：根据名讳自动计算气泡边框
const getSpiritColor = (name: string) => {
    const colors = [
        'border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]',
        'border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]',
        'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]',
        'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]',
        'border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.2)]',
        'border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

export function DebateMessage({ sender, content, type = 'sage', isNew = false }: DebateMessageProps) {
    const isJudge = type === 'judge' || sender.toLowerCase().includes('judge') || sender === 'wukong';
    const isUser = type === 'user';

    const colorClass = isJudge
        ? 'border-sage-gold shadow-[0_0_30px_rgba(212,175,55,0.3)] bg-black/60'
        : isUser
            ? 'border-white/20 bg-white/5'
            : getSpiritColor(sender) + ' bg-black/40';

    const animationClass = isJudge
        ? 'animate-ink-bleed'
        : isUser
            ? 'animate-in fade-in slide-in-from-bottom-2'
            : 'animate-vibrate';

    return (
        <div className={cn(
            "mb-8 flex flex-col",
            isUser ? "items-end" : "items-start",
            isNew && animationClass
        )}>
            {/* Sender Name */}
            <div className="flex items-center gap-2 mb-2 px-2">
                {isJudge ? (
                    <ShieldCheck className="h-3 w-3 text-sage-gold" />
                ) : isUser ? (
                    <User className="h-3 w-3 text-white/50" />
                ) : (
                    <div className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
                )}
                <span className={cn(
                    "text-[10px] font-bold tracking-[0.3em] uppercase",
                    isJudge ? "text-sage-gold" : "text-white/40"
                )}>
                    {sender}
                </span>
            </div>

            {/* Content Bubble */}
            <div className={cn(
                "max-w-[85%] rounded-2xl p-4 border transition-all duration-700 backdrop-blur-md",
                colorClass,
                isJudge && "italic text-lg"
            )}>
                <SpiritText className={cn(
                    "text-sm leading-relaxed",
                    isJudge ? "text-sage-gold" : "text-white/80"
                )}>
                    {typeof content === 'object' ? (
                        (content as any).statement || JSON.stringify(content)
                    ) : content}
                </SpiritText>
            </div>
        </div>
    );
}
