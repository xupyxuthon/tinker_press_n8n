'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useChatContext } from '@/contexts/ChatContext';

export function ChatInput() {
    const { sendMessage, isLoading } = useChatContext();
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [input]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const message = input;
        setInput('');
        await sendMessage(message);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleImageCommand = () => {
        setInput('/img ');
        textareaRef.current?.focus();
    };

    return (
        <div className="border-t border-border bg-card p-4">
            <div className="flex items-end gap-2">
                {/* Image generation button */}
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleImageCommand}
                    className="flex-shrink-0"
                    disabled={isLoading}
                >
                    <ImageIcon className="h-4 w-4" />
                </Button>

                {/* Text input */}
                <div className="flex-1 relative">
                    <Textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message... (use /img for images)"
                        className="min-h-[44px] max-h-[120px] resize-none pr-12"
                        disabled={isLoading}
                        rows={1}
                    />
                </div>

                {/* Send button */}
                <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="flex-shrink-0 bg-primary hover:bg-primary/90"
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>

            {/* Hint text */}
            <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send, Shift+Enter for new line
            </p>
        </div>
    );
}
