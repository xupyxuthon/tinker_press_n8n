'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Session {
    id: number;
    title: string;
}

export function HistorySidebar() {
    const params = useParams();
    const characterId = params.character as string;
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchSessions() {
            if (!characterId) return;
            setIsLoading(true);
            try {
                const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost:8083';
                // Filter by character_slug using custom meta field if available or just list all for now
                // In a real scenario, we'd add a filter parameter to the REST API
                const res = await fetch(`${wpUrl}/?rest_route=/wp/v2/chat_session&_embed`);
                const data = await res.json();

                const filtered = data
                    .filter((s: any) => s.session_meta?.character_slug === characterId)
                    .map((s: any) => ({
                        id: s.id,
                        title: s.title.rendered
                    }));

                setSessions(filtered);
            } catch (err) {
                console.error("Failed to fetch sessions from 8083:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSessions();
    }, [characterId]);

    return (
        <div className="flex flex-col h-full bg-transparent">
            <div className="px-6 py-4">
                <h2 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-bold">对话历史</h2>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar py-2">
                {isLoading ? (
                    <div className="px-6 py-4 animate-pulse text-xs text-muted-foreground/30">神识检索中...</div>
                ) : sessions.length > 0 ? (
                    <div className="space-y-1 px-2">
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                className="group relative px-4 py-3 cursor-pointer transition-all duration-300"
                            >
                                {/* Sage Gold Breathing Bar */}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-hover:h-3/4 bg-sage-gold transition-all duration-300 shadow-[0_0_8px_rgba(230,179,37,0.5)]" />

                                <p className="text-sm font-medium text-muted-foreground/70 group-hover:text-sage-gold transition-colors truncate">
                                    {session.title}
                                </p>
                                <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-border/5 group-hover:bg-transparent" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="px-6 py-8">
                        <p className="text-xs text-muted-foreground/40 italic leading-relaxed">
                            神识初启，<br />尚无笔谈记录
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
