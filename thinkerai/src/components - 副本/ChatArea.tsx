'use client';

import { useEffect, useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PanelLeftOpen, Menu } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChatContext } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';

export function ChatArea() {
    const { activeCharacter, messages, isLoading, toggleSidebar, isSidebarOpen } = useChatContext();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (!activeCharacter) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background">
                <div className="text-center text-muted-foreground">
                    <p className="text-lg">Select a character to start chatting</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleSidebar}
                        className={cn(
                            "p-2 hover:bg-secondary rounded-md mr-2 transition-all",
                            isSidebarOpen && "lg:hidden"
                        )}
                    >
                        <Menu className="h-5 w-5 lg:hidden" />
                        <PanelLeftOpen className="h-5 w-5 hidden lg:block" />
                    </button>

                    <Avatar className="h-10 w-10 lg:h-12 lg:w-12 border-2 border-primary/20">
                        <AvatarImage src={activeCharacter.avatar} alt={activeCharacter.name} />
                        <AvatarFallback>{activeCharacter.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="font-semibold text-lg">{activeCharacter.name}</h2>
                        <p className="text-sm text-muted-foreground">
                            {activeCharacter.isOnline ? (
                                <span className="flex items-center gap-1">
                                    <span className="h-2 w-2 bg-green-500 rounded-full" />
                                    Online
                                </span>
                            ) : (
                                'Offline'
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4"
            >
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
                            <AvatarImage src={activeCharacter.avatar} alt={activeCharacter.name} />
                            <AvatarFallback className="text-2xl">{activeCharacter.name[0]}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-semibold mb-2">{activeCharacter.name}</h3>
                        <p className="text-muted-foreground mb-4">{activeCharacter.tagline}</p>
                        <p className="text-sm text-muted-foreground max-w-md">
                            Start a conversation with {activeCharacter.name}! Try asking about their interests or use /img to generate images.
                        </p>
                    </div>
                ) : (
                    <>
                        {messages.map((message) => (
                            <ChatMessage key={message.id} message={message} />
                        ))}

                        {/* Typing indicator */}
                        {isLoading && (
                            <div className="flex gap-3 mb-4">
                                <Avatar className="h-10 w-10 flex-shrink-0">
                                    <AvatarImage src={activeCharacter.avatar} alt={activeCharacter.name} />
                                    <AvatarFallback>{activeCharacter.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="gradient-ai-message rounded-2xl px-4 py-3 flex items-center gap-1">
                                    <div className="h-2 w-2 bg-muted-foreground rounded-full typing-dot" />
                                    <div className="h-2 w-2 bg-muted-foreground rounded-full typing-dot" />
                                    <div className="h-2 w-2 bg-muted-foreground rounded-full typing-dot" />
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input */}
            <ChatInput />
        </div>
    );
}
