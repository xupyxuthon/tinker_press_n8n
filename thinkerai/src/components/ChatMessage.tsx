'use client';

import { Message } from '@/lib/types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useChatContext } from '@/contexts/ChatContext';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ImagePlaceholder } from './ImagePlaceholder';

interface ChatMessageProps {
    message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const { activeCharacter } = useChatContext();
    const isUser = message.role === 'user';

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <div
            className={cn(
                'flex gap-3 mb-4 group',
                isUser ? 'flex-row-reverse' : 'flex-row'
            )}
        >
            {/* Avatar */}
            {!isUser && activeCharacter && (
                <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={activeCharacter.avatar} alt={activeCharacter.name} />
                    <AvatarFallback>{activeCharacter.name[0]}</AvatarFallback>
                </Avatar>
            )}

            {/* Message Content */}
            <div
                className={cn(
                    'flex flex-col max-w-[70%]',
                    isUser ? 'items-end' : 'items-start'
                )}
            >
                <div
                    className={cn(
                        'rounded-2xl px-4 py-2.5 break-words',
                        isUser
                            ? 'gradient-user-message text-white'
                            : 'gradient-ai-message text-foreground'
                    )}
                >
                    <div className="text-sm prose dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-zinc-800 prose-pre:p-2 prose-pre:rounded-lg">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                        </ReactMarkdown>
                    </div>

                    {/* Image if present */}
                    {message.imageUrl && (
                        <ImagePlaceholder prompt={message.content.includes('"') ? message.content.split('"')[1] : 'AI Generated'} />
                    )}
                </div>

                {/* Timestamp */}
                <span className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {formatTime(message.timestamp)}
                </span>
            </div>

            {/* User avatar placeholder */}
            {isUser && (
                <Avatar className="h-10 w-10 flex-shrink-0 bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                        You
                    </AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}
