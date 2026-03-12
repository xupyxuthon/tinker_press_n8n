'use client';

import { Character } from '@/lib/types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
    character: Character;
    isActive: boolean;
    onClick: () => void;
}

export function CharacterCard({ character, isActive, onClick }: CharacterCardProps) {
    const formatTime = (date?: Date) => {
        if (!date) return '';
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                'w-full p-3 rounded-lg transition-all duration-200 text-left',
                'hover:bg-secondary/50',
                isActive && 'bg-secondary border border-primary/30'
            )}
        >
            <div className="flex items-start gap-3">
                <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage src={character.avatar} alt={character.name} />
                        <AvatarFallback>{character.name[0]}</AvatarFallback>
                    </Avatar>
                    {character.isOnline && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-sm truncate">{character.name}</h3>
                        {character.lastMessageTime && (
                            <span className="text-xs text-muted-foreground flex-shrink-0">
                                {formatTime(character.lastMessageTime)}
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate mb-1">
                        {character.tagline}
                    </p>
                    {character.lastMessage && (
                        <p className="text-xs text-muted-foreground truncate">
                            {character.lastMessage}
                        </p>
                    )}
                </div>

                {character.unreadCount && character.unreadCount > 0 && (
                    <div className="flex-shrink-0 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary-foreground">
                            {character.unreadCount}
                        </span>
                    </div>
                )}
            </div>
        </button>
    );
}
