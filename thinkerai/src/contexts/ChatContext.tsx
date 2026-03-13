'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Character, Message } from '@/lib/types';
import { mockCharacters } from '@/lib/mockData';
import { loadChatHistory, saveChatHistory } from '@/lib/storage';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';

interface ChatContextType {
    characters: Character[];
    activeCharacter: Character | null;
    setActiveCharacter: (character: Character) => void;
    messages: Message[];
    sendMessage: (content: string) => Promise<void>;
    isLoading: boolean;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;
    toggleSidebar: () => void;
    // --- 🏮 众神辩论协议 ---
    isDebateModeActive: boolean;
    selectedCharacterIds: string[];
    debatePlane: string;
    debateJudge: string;
    setDebatePlane: (value: string) => void;
    setDebateJudge: (value: string) => void;
    toggleDebateMode: () => void;
    toggleCharacterSelection: (id: string) => void;
    clearSelection: () => void;
    generateSessionId: () => string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true); // 初始为加载状态
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // --- 🏮 众神辩论协议实现 ---
    // 🏮 圣域先正法：预载本地名录，确保首页永不空寂
    const [characters, setCharacters] = useState<Character[]>(mockCharacters);
    const [activeCharacter, setActiveCharacterState] = useState<Character | null>(mockCharacters[0] || null);
    const [isDebateModeActive, setIsDebateModeActive] = useState(false);
    const [selectedCharacterIds, setSelectedCharacterIds] = useState<string[]>([]);
    const [debatePlane, setDebatePlane] = useState('local');
    const [debateJudge, setDebateJudge] = useState('wukong');

    // 🏮 圣域灵韵同步：尝试从 8083 圣经阁拉取最新神谕
    useEffect(() => {
        async function syncSages() {
            try {
                // 使用相对路径绕过 CORS，由 Next.js Rewrites 接管
                const wpUrl = '/wp-api';
                console.log("[ChatContext] 正在尝试感应圣经阁神识...");

                const res = await fetch(`${wpUrl}/?rest_route=/wp/v2/posts&_embed`, {
                    signal: AbortSignal.timeout(5000) // 5秒超时保护
                });

                if (!res.ok) throw new Error(`HTTP 异常: ${res.status}`);

                const data = await res.json();
                if (!Array.isArray(data)) throw new Error("返回数据格式非法");

                const syncedSages: Character[] = data
                    .filter((post: any) => post.acf_fields && (post.acf_fields.nameKey || post.acf_fields.character_image_url))
                    .map((post: any) => ({
                        id: String(post.slug || post.id),
                        name: post.title.rendered,
                        avatar: post.acf_fields.character_image_url?.startsWith('http')
                            ? post.acf_fields.character_image_url
                            : `${wpUrl}${post.acf_fields.character_image_url || '/placeholder-spirit.png'}`,
                        tagline: post.acf_fields.nameKey || post.title.rendered,
                        description: post.excerpt?.rendered || "",
                        isOnline: true,
                        personality: post.acf_fields.personality || "一位来自圣域的智者。",
                        video: post.acf_fields.character_video_url?.startsWith('http')
                            ? post.acf_fields.character_video_url
                            : (post.acf_fields.character_video_url ? `${wpUrl}${post.acf_fields.character_video_url}` : ''),
                    }));

                if (syncedSages.length > 0) {
                    console.log(`[ChatContext] 圣经阁感应成功，拉取到 ${syncedSages.length} 位圣贤。`);

                    setCharacters(prev => {
                        const sageMap = new Map<string, Character>();
                        // 1. 先载入当前所有角色（通常是 mockCharacters）作为基盘
                        prev.forEach(s => sageMap.set(String(s.id), s));
                        // 2. 用同步回来的数据进行智能合并（补强模式）
                        syncedSages.forEach(remoteS => {
                            const localS = sageMap.get(String(remoteS.id));
                            if (localS) {
                                // 🏮 圣域补强：仅当远程有真才实学（有效字段）时，才覆盖本地基石
                                sageMap.set(String(remoteS.id), {
                                    ...localS,
                                    ...remoteS,
                                    // 重点：如果远程没有视频动画，则保留本地的
                                    video: remoteS.video || localS.video,
                                    avatar: remoteS.avatar && !remoteS.avatar.includes('placeholder') ? remoteS.avatar : localS.avatar
                                });
                            } else {
                                sageMap.set(String(remoteS.id), remoteS);
                            }
                        });

                        const merged = Array.from(sageMap.values());
                        console.log(`[ChatContext] 灵韵合一完成。当前圣殿共有 ${merged.length} 位圣贤显圣。`);
                        return merged;
                    });
                }
            } catch (err) {
                console.warn("[ChatContext] 圣识同步受阻，维持本地法相阵列:", err);
            } finally {
                setIsLoading(false);
            }
        }
        syncSages();
    }, []);

    const toggleDebateMode = () => {
        setIsDebateModeActive(!isDebateModeActive);
        if (!isDebateModeActive === false) setSelectedCharacterIds([]);
    };

    const toggleCharacterSelection = (id: string) => {
        const stringId = String(id);
        setSelectedCharacterIds(prev => {
            if (prev.includes(stringId)) {
                return prev.filter(item => item !== stringId);
            }
            if (prev.length >= 2) return prev;
            return [...prev, stringId];
        });
    };

    const clearSelection = () => setSelectedCharacterIds([]);

    // Load chat history when active character changes
    useEffect(() => {
        if (activeCharacter) {
            const history = loadChatHistory(activeCharacter.id);
            setMessages(history);
            if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            }
        }
    }, [activeCharacter]);

    const setActiveCharacter = (character: Character) => {
        setActiveCharacterState(character);
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const { user } = useAuth();
    const { language } = useLanguage();

    const generateSessionId = () => {
        const username = user?.username || 'guest';
        const timestamp = Math.floor(Date.now() / 1000);
        const slugs = isDebateModeActive && selectedCharacterIds.length > 0
            ? selectedCharacterIds.join('_')
            : (activeCharacter?.id || 'unknown');
        return `${username}_${timestamp}_${slugs}`;
    };

    const sendMessage = async (content: string) => {
        if (!activeCharacter || !content.trim()) return;

        const isImageCommand = content.trim().startsWith('/img');
        const userMessage: Message = {
            id: Date.now().toString(),
            characterId: activeCharacter.id,
            role: 'user',
            content: content,
            timestamp: new Date(),
        };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        saveChatHistory(activeCharacter.id, updatedMessages);

        if (isImageCommand) {
            const prompt = content.replace('/img', '').trim();
            const imageMessage: Message = {
                id: (Date.now() + 1).toString(),
                characterId: activeCharacter.id,
                role: 'assistant',
                content: `Here's an image based on your prompt: "${prompt}"`,
                timestamp: new Date(),
                imageUrl: `https://placehold.co/512x512/8b5cf6/white?text=${encodeURIComponent(prompt || 'Image')}`,
            };
            setTimeout(() => {
                const withImage = [...updatedMessages, imageMessage];
                setMessages(withImage);
                saveChatHistory(activeCharacter.id, withImage);
            }, 1000);
            return;
        }

        setIsLoading(true);
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('saint_token') : null;

            // 🏮 [终极协议载荷]：全动态、全解析、嵌套化重构
            const payload = {
                user: user?.username || "guest",
                mode: isDebateModeActive ? debatePlane : "chat",
                messages: {
                    characters: isDebateModeActive ? selectedCharacterIds : [activeCharacter.id],
                    judge: isDebateModeActive ? debateJudge : "判官",
                    user_input: content,
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

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.reply || '圣域连接断绝');
            }
            const data = await response.json();
            let aiContent = "";
            const reply = data.reply || data;

            if (typeof reply === 'string') {
                aiContent = reply;
            } else if (reply) {
                // 🏮 圣域灵觉：智能嗅探嵌套神识
                const rawContent = reply.summary || reply.statement || reply.judge || reply.output || reply;
                if (typeof rawContent === 'string') {
                    // 尝试解析内部 JSON
                    if (rawContent.trim().startsWith('{')) {
                        try {
                            const parsed = JSON.parse(rawContent);
                            aiContent = parsed.summary || parsed.statement || parsed.content || rawContent;
                        } catch (e) { aiContent = rawContent; }
                    } else {
                        aiContent = rawContent;
                    }
                } else if (typeof rawContent === 'object' && rawContent !== null) {
                    aiContent = (rawContent as any).summary || (rawContent as any).statement || (rawContent as any).content || JSON.stringify(rawContent);
                } else {
                    aiContent = String(rawContent);
                }
            } else {
                aiContent = "圣域无回响";
            }
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                characterId: activeCharacter.id,
                role: 'assistant',
                content: aiContent,
                timestamp: new Date(),
            };
            const finalMessages = [...updatedMessages, aiMessage];
            setMessages(finalMessages);
            saveChatHistory(activeCharacter.id, finalMessages);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                characterId: activeCharacter.id,
                role: 'assistant',
                content: `🛡️ [圣域圣令]：${(error as Error).message}`,
                timestamp: new Date(),
            };
            const withError = [...updatedMessages, errorMessage];
            setMessages(withError);
            saveChatHistory(activeCharacter.id, withError);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ChatContext.Provider
            value={{
                characters,
                activeCharacter,
                setActiveCharacter,
                messages,
                sendMessage,
                isLoading,
                isSidebarOpen,
                setIsSidebarOpen,
                toggleSidebar,
                isDebateModeActive,
                selectedCharacterIds,
                debatePlane,
                debateJudge,
                setDebatePlane,
                setDebateJudge,
                toggleDebateMode,
                toggleCharacterSelection,
                clearSelection,
                generateSessionId,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext() {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within ChatProvider');
    }
    return context;
}
