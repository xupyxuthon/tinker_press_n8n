'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
interface Message {
  id: string;
  role: 'system' | 'user' | 'assistant' | 'data';
  content: string;
}
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { SidebarNavigation } from '@/components/SidebarNavigation';
import { CharacterHeader } from '@/components/CharacterHeader';
import { HistorySidebar } from '@/components/HistorySidebar';
import { SpiritText } from '@/components/SpiritText';
import { ChevronRight, ChevronLeft, Video, Image as ImageIcon, MessageCircle, Mic, X, Play, Pause, Send, User } from 'lucide-react';

export default function CharacterPage() {
  const params = useParams();
  const router = useRouter();
  const { t, language } = useLanguage();
  const characterId = params.character as string;

  const { user } = useAuth();
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(null);
  const [hoveredCharacter, setHoveredCharacter] = useState(false);

  // States for WP Data
  const [character, setCharacter] = useState<any>(null);
  const [allCharacters, setAllCharacters] = useState<any[]>([]);
  const [isLoadingSages, setIsLoadingSages] = useState(true);

  // Fetch from WP 8083
  useEffect(() => {
    async function fetchSages() {
      setIsLoadingSages(true);
      try {
        const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost:8083';
        const res = await fetch(`${wpUrl}/?rest_route=/wp/v2/posts&_embed`);
        const data = await res.json();

        const mappedSages = data
          .filter((post: any) => post.acf_fields && post.acf_fields.nameKey)
          .map((post: any) => {
            const getFullUrl = (path: string) => {
              if (!path) return '';
              if (path.startsWith('http')) return path;
              return `${wpUrl}${path}`;
            };
            return {
              id: post.slug,
              name: post.title.rendered,
              nameKey: post.acf_fields.nameKey,
              image: getFullUrl(post.acf_fields.character_image_url) || '/logo.svg',
              video: getFullUrl(post.acf_fields.character_video_url) || '',
              audio: post.acf_fields.character_audio_url || '',
              system_prompt: post.acf_fields.character_system_prompt || '',
              description: post.excerpt?.rendered.replace(/<[^>]*>/g, '') || '',
              content: post.content?.rendered.replace(/<[^>]*>/g, '') || '',
            };
          });

        setAllCharacters(mappedSages);
        const current = mappedSages.find((s: any) => s.id === characterId);
        setCharacter(current);
      } catch (err) {
        console.error("[Saint Chamber] Failed to sync sages for detail page:", err);
      } finally {
        setIsLoadingSages(false);
      }
    }
    fetchSages();
  }, [characterId]);

  // Collapse sidebar on mount for character page
  useEffect(() => {
    setIsCollapsed(true);
  }, [setIsCollapsed]);

  // Construct System Prompt
  const systemPrompt = character ? (character.system_prompt || `
    You are ${character.name}. ${character.description}.
    Your role is to engage in a deep conversation.
    Respond in ${language === 'zh' ? 'Chinese' : 'English'}.
  `) : '';

  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef<Message[]>([]);
  const guestHistoryKey = `guest_chat_${characterId}`;

  useEffect(() => {
    messagesRef.current = messages;
    if (typeof window !== 'undefined' && !user && messages.length > 1) {
      localStorage.setItem(guestHistoryKey, JSON.stringify(messages));
    }
  }, [messages, user, guestHistoryKey]);

  const [localInput, setLocalInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!character) return;
    const loadHistory = async () => {
      const savedGuestHistory = localStorage.getItem(guestHistoryKey);
      if (savedGuestHistory) {
        try {
          const parsed = JSON.parse(savedGuestHistory);
          if (parsed && Array.isArray(parsed) && parsed.length > 1) {
            setMessages(parsed);
            return;
          }
        } catch (e) { }
      }
      setMessages([{ id: 'greeting', role: 'assistant', content: `你好，我是${character.name}。` }]);
    };
    loadHistory();
  }, [character, guestHistoryKey]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localInput.trim() || isLoading) return;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: localInput };
    setMessages((prev: Message[]) => [...prev, userMessage]);
    setLocalInput('');
    setIsLoading(true);
    const vipStatus = user?.role === 'vip' ? 'vip' : 'standard';
    const sessionId = `sid_${characterId}_${Date.now()}`;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          system: systemPrompt,
          userId: user?.id,
          characterId,
          sessionId,
          vip_status: vipStatus
        }),
      });
      if (!response.ok) throw new Error(response.statusText);
      const assistantMessageId = (Date.now() + 1).toString();
      setMessages((prev: Message[]) => [...prev, { id: assistantMessageId, role: 'assistant', content: '' }]);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((prev: Message[]) => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg && lastMsg.role === 'assistant' && lastMsg.id === assistantMessageId) {
            return [...prev.slice(0, -1), { ...lastMsg, content: lastMsg.content + text }];
          }
          return prev;
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const toggleAudio = () => {
    if (!character?.audio) return;
    if (isPlayingAudio && audioInstance) {
      audioInstance.pause();
      setIsPlayingAudio(false);
    } else {
      const newAudio = new Audio(character.audio);
      newAudio.play();
      setAudioInstance(newAudio);
      setIsPlayingAudio(true);
      newAudio.onended = () => setIsPlayingAudio(false);
    }
  };

  if (isLoadingSages) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="animate-pulse text-primary">唤醒圣殿神识中...</p></div>;
  if (!character) return <div className="min-h-screen bg-background flex items-center justify-center">圣贤未归位</div>;

  return (
    <div className="min-h-screen bg-background overflow-hidden flex flex-col">
      <CharacterHeader />

      {/* 5-Column Grid Layout - Final Proportions */}
      <div className="flex-1 grid grid-cols-[64px_256px_240px_1fr_256px] transition-all duration-700 pt-16 h-screen overflow-hidden bg-background">

        {/* Col 1: Icon Navigation (64px) */}
        <div className="bg-transparent border-r border-border/10 flex flex-col items-center py-4 z-50">
          <SidebarNavigation />
        </div>

        {/* Col 2: Character 名册 (256px) */}
        <div className="bg-transparent border-r border-border/10 flex flex-col h-full overflow-hidden">
          <div className="p-4">
            <input
              type="text"
              placeholder="搜索圣贤..."
              className="w-full px-4 py-2 bg-secondary/30 border border-border/10 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-sage-gold/30 transition-all"
            />
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1">
            {allCharacters.map((char) => (
              <div
                key={char.id}
                onClick={() => router.push(`/${char.id}`)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${char.id === characterId ? 'bg-sage-gold/5 border-l-2 border-sage-gold' : 'hover:bg-accent/30 border-l-2 border-transparent'}`}
              >
                <img src={char.image} className="w-8 h-8 rounded-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all" />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium truncate ${char.id === characterId ? 'text-sage-gold' : 'text-muted-foreground'}`}>{char.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: History Sidebar (240px) */}
        <div className="h-full overflow-hidden border-r border-border/10">
          <HistorySidebar />
        </div>

        {/* Col 4: Chat Area (1fr) - CORE FOCUS */}
        <div className="flex flex-col bg-transparent overflow-hidden relative">
          {/* Chat Header - Minimal */}
          <div className="px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div
                className="w-14 h-14 rounded-full overflow-hidden border border-border/20 cursor-pointer relative group"
                onMouseEnter={() => setHoveredCharacter(true)}
                onMouseLeave={() => setHoveredCharacter(false)}
              >
                {character.video && hoveredCharacter ? (
                  <video src={character.video} autoPlay loop muted playsInline className="w-full h-full object-cover scale-110" />
                ) : (
                  <img src={character.image} className="w-full h-full object-cover scale-110" />
                )}
              </div>
              <div>
                <h2 className="font-bold text-xl tracking-tight text-foreground/90">{character.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage-gold animate-pulse" />
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground selection:bg-sage-gold/30">神识凝聚中</p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Window */}
          <div className="flex-1 overflow-y-auto no-scrollbar px-12 py-4 space-y-12">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-6 max-w-[800px] w-full ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${m.role === 'user' ? 'bg-muted/20' : 'bg-transparent'}`}>
                    {m.role === 'user' ? <User className="w-4 h-4 text-muted-foreground" /> : <img src={character.image} className="w-8 h-8 rounded-full object-cover grayscale" />}
                  </div>

                  {m.role === 'assistant' ? (
                    <SpiritText className="flex-1">
                      <div className="text-base leading-relaxed text-foreground/80 selection:bg-sage-gold/30 whitespace-pre-wrap">
                        {m.content}
                      </div>
                    </SpiritText>
                  ) : (
                    <div className="flex-1 text-base leading-relaxed text-foreground/90 bg-accent/20 p-4 rounded-lg">
                      {m.content}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="ml-14 flex gap-1.5">
                  <div className="w-1 h-1 bg-sage-gold/40 rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-sage-gold/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-sage-gold/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Floats at Center */}
          <div className="px-12 pb-8 pt-4">
            <div className="max-w-[900px] mx-auto relative group">
              <form onSubmit={sendMessage} className="relative bg-secondary/20 backdrop-blur-xl border border-border/10 rounded-2xl p-2 transition-all duration-500 focus-within:border-sage-gold/30 focus-within:bg-secondary/40 shadow-2xl">
                <input
                  value={localInput}
                  onChange={(e) => setLocalInput(e.target.value)}
                  placeholder={`向 ${character.name} 问道...`}
                  className="w-full bg-transparent px-6 py-4 outline-none text-base placeholder:text-muted-foreground/30"
                  autoFocus
                />
                <button
                  disabled={isLoading || !localInput.trim()}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-sage-gold disabled:opacity-20 transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <div className="flex gap-4 mt-3 justify-center">
                <button className="text-[10px] uppercase tracking-widest text-muted-foreground/40 hover:text-sage-gold transition-colors flex items-center gap-1.5">
                  <Video className="w-3 h-3" /> AI 显圣
                </button>
                <button className="text-[10px] uppercase tracking-widest text-muted-foreground/40 hover:text-sage-gold transition-colors flex items-center gap-1.5">
                  <ImageIcon className="w-3 h-3" /> 诸神绘像
                </button>
                <button onClick={toggleAudio} className={`text-[10px] uppercase tracking-widest text-muted-foreground/40 hover:text-sage-gold transition-colors flex items-center gap-1.5 ${isPlayingAudio ? 'text-sage-gold' : ''}`}>
                  <Mic className="w-3 h-3" /> {isPlayingAudio ? '止语' : '道音'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Col 5: Details Panel (256px) - Transparent/Minimal */}
        <div className={`bg-transparent border-l border-border/10 h-full overflow-y-auto transition-all duration-700 ${rightPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 space-y-12">
            <div className="rounded-2xl overflow-hidden border border-border/10 scale-95 hover:scale-100 transition-transform duration-700 grayscale hover:grayscale-0">
              <img src={character.image} className="w-full h-auto object-cover" />
            </div>
            <div className="space-y-6">
              <h4 className="text-sm font-bold tracking-[0.3em] uppercase text-muted-foreground/50">圣贤本纪</h4>
              <div className="space-y-4">
                <p className="text-xs leading-relaxed text-muted-foreground selection:bg-sage-gold/30">
                  {character.description}
                </p>
                <div className="h-[1px] w-8 bg-sage-gold/30" />
                <p className="text-[10px] italic text-muted-foreground/40 selection:bg-sage-gold/30">
                  {character.content}
                </p>
              </div>

              <div className="pt-8 grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground/40">神话位阶</span>
                  <span className="text-xs font-medium text-sage-gold">初始圣人</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground/40">所属洞天</span>
                  <span className="text-xs font-medium text-sage-gold">华夏神域</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
