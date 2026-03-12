'use client';

import { useChatContext } from '@/contexts/ChatContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Info, Shield, MessageSquare, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function SettingsPanel() {
    const { activeCharacter } = useChatContext();
    const [isOpen, setIsOpen] = useState(false);

    if (!activeCharacter) return null;

    return (
        <div className={cn(
            "h-screen bg-card border-l border-border transition-all duration-300 ease-in-out overflow-y-auto",
            isOpen ? "w-80" : "w-0 lg:w-12 lg:flex lg:flex-col lg:items-center lg:py-4"
        )}>
            {/* Toggle for desktop (thin bar when closed) */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="hidden lg:flex p-2 hover:bg-secondary rounded-md mb-4"
                >
                    <Info className="h-5 w-5 text-muted-foreground" />
                </button>
            )}

            {isOpen ? (
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-lg">Character Info</h2>
                        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Close</Button>
                    </div>

                    <div className="flex flex-col items-center mb-8">
                        <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
                            <AvatarImage src={activeCharacter.avatar} alt={activeCharacter.name} />
                            <AvatarFallback>{activeCharacter.name[0]}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-bold">{activeCharacter.name}</h3>
                        <p className="text-sm text-muted-foreground text-center mt-2">{activeCharacter.tagline}</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                                <MessageSquare className="h-3 w-3" /> Personality
                            </h4>
                            <p className="text-sm rounded-lg bg-secondary/50 p-4 border border-border">
                                {activeCharacter.personality}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Shield className="h-3 w-3" /> Safety Settings
                            </h4>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/30 transition-colors">
                                    <span className="text-sm">Content Filter</span>
                                    <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">High</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-border">
                            <Button variant="destructive" className="w-full gap-2" size="sm">
                                <Trash2 className="h-4 w-4" /> Clear Chat History
                            </Button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
