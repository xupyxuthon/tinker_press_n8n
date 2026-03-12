'use client';

import { useChatContext } from '@/contexts/ChatContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Swords, X, Zap } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export function DebatePanel() {
    const {
        isDebateModeActive,
        selectedCharacterIds,
        clearSelection,
        characters,
        debatePlane,
        debateJudge,
        setDebatePlane,
        setDebateJudge
    } = useChatContext();
    const { language } = useLanguage();
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isAdmin = user?.username.toLowerCase() === 'admin';

    if (!isDebateModeActive || selectedCharacterIds.length === 0 || pathname.startsWith('/debate')) return null;

    const selectedSages = selectedCharacterIds.map(id =>
        characters.find(c => String(c.id) === String(id))
    ).filter(Boolean);

    const handleSummon = () => {
        if (selectedCharacterIds.length === 2) {
            // 路由跳转至对冲位面
            router.push(`/debate/${selectedCharacterIds[0]}-vs-${selectedCharacterIds[1]}`);
        }
    };

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="bg-black/80 backdrop-blur-xl border border-sage-gold/30 rounded-2xl p-4 shadow-[0_0_40px_rgba(212,175,55,0.2)] min-w-[320px] sm:min-w-[480px]">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-sage-gold/20 rounded-lg">
                            <Swords className="h-4 w-4 text-sage-gold" />
                        </div>
                        <span className="text-xs font-bold tracking-[0.2em] text-white/90 uppercase">
                            {language === 'zh' ? '辩论召唤阵' : 'Debate Summons'}
                        </span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={clearSelection} className="h-6 w-6 p-0 hover:bg-white/10 rounded-full">
                        <X className="h-3 w-3" />
                    </Button>
                </div>

                <div className="flex items-center justify-between gap-4">
                    {/* Participant A */}
                    <div className="flex-1 flex flex-col items-center">
                        <div className={cn(
                            "w-16 h-16 rounded-2xl border-2 transition-all duration-500 overflow-hidden bg-card/40",
                            selectedSages[0] ? "border-sage-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]" : "border-white/10"
                        )}>
                            {selectedSages[0] && (
                                <img src={selectedSages[0].avatar} alt="" className="w-full h-full object-cover" />
                            )}
                        </div>
                        <span className="mt-2 text-[10px] font-medium text-white/60">
                            {selectedSages[0]?.name || (language === 'zh' ? '虚位以待' : 'Waiting...')}
                        </span>
                    </div>

                    {/* VS Divider */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="h-px w-8 bg-gradient-to-r from-transparent via-sage-gold/50 to-transparent" />
                        <div className="bg-sage-gold/10 px-2 py-0.5 rounded border border-sage-gold/20">
                            <span className="text-[10px] font-black italic text-sage-gold">VS</span>
                        </div>
                        <div className="h-px w-8 bg-gradient-to-r from-transparent via-sage-gold/50 to-transparent" />
                    </div>

                    {/* Participant B */}
                    <div className="flex-1 flex flex-col items-center">
                        <div className={cn(
                            "w-16 h-16 rounded-2xl border-2 transition-all duration-500 overflow-hidden bg-card/40",
                            selectedSages[1] ? "border-sage-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]" : "border-white/10"
                        )}>
                            {selectedSages[1] && (
                                <img src={selectedSages[1].avatar} alt="" className="w-full h-full object-cover" />
                            )}
                        </div>
                        <span className="mt-2 text-[10px] font-medium text-white/60">
                            {selectedSages[1]?.name || (language === 'zh' ? '虚位以待' : 'Waiting...')}
                        </span>
                    </div>
                </div>

                {/* 🏮 圣域参数：主公特权配置区 */}
                <div className="mt-4 flex gap-4">
                    <div className="flex-1 space-y-1">
                        <label className="text-[9px] uppercase tracking-widest text-white/40 ml-1">
                            {language === 'zh' ? '位面模式 (Mode)' : 'Plane Mode'}
                        </label>
                        <Input
                            value={debatePlane}
                            onChange={(e) => setDebatePlane(e.target.value)}
                            disabled={!isAdmin}
                            className="h-8 bg-white/5 border-white/10 text-[10px] rounded-lg focus-visible:ring-sage-gold/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div className="flex-1 space-y-1">
                        <label className="text-[9px] uppercase tracking-widest text-white/40 ml-1">
                            {language === 'zh' ? '审判权杖 (Judge)' : 'Scepter Judge'}
                        </label>
                        <Input
                            value={debateJudge}
                            onChange={(e) => setDebateJudge(e.target.value)}
                            disabled={!isAdmin}
                            className="h-8 bg-white/5 border-white/10 text-[10px] rounded-lg focus-visible:ring-sage-gold/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <Button
                        onClick={handleSummon}
                        disabled={selectedCharacterIds.length < 2}
                        className={cn(
                            "w-full h-12 rounded-xl font-bold tracking-widest uppercase transition-all duration-700 relative overflow-hidden group",
                            selectedCharacterIds.length === 2
                                ? "bg-sage-gold text-black hover:bg-white hover:scale-[1.02] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                : "bg-white/5 text-white/20 border border-white/5"
                        )}
                    >
                        {selectedCharacterIds.length === 2 && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        )}
                        <Zap className={cn("h-4 w-4 mr-2", selectedCharacterIds.length === 2 ? "fill-black" : "")} />
                        {language === 'zh' ? '召唤辩论位面' : 'Summon Debate'}
                    </Button>
                    {selectedCharacterIds.length < 2 && (
                        <p className="text-center mt-2 text-[9px] text-white/30 tracking-tight">
                            {language === 'zh' ? '请至少勾选两位圣贤以开启对冲协议' : 'Select at least 2 sages to initiate protocol'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
