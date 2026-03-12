'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CharacterCard } from './CharacterCard';
import { useChatContext } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';
import { PanelLeftClose } from 'lucide-react';

export function CharacterSidebar() {
    const { characters, activeCharacter, setActiveCharacter, isSidebarOpen, toggleSidebar } = useChatContext();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCharacters = characters.filter((char) =>
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={cn(
            "w-80 h-screen bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out z-50",
            "fixed lg:relative",
            isSidebarOpen ? "left-0" : "-left-80 lg:-ml-80"
        )}>
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                    Candy AI
                </h1>
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 hover:bg-secondary rounded-md"
                >
                    <PanelLeftClose className="h-5 w-5" />
                </button>
            </div>

            <div className="p-4">

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search characters..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Character List */}
            <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-1">
                    {filteredCharacters.map((character) => (
                        <CharacterCard
                            key={character.id}
                            character={character}
                            isActive={activeCharacter?.id === character.id}
                            onClick={() => setActiveCharacter(character)}
                        />
                    ))}
                </div>

                {filteredCharacters.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                        No characters found
                    </div>
                )}
            </div>
        </div>
    );
}
