
'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TopNavigation } from '@/components/TopNavigation';
import { useSidebar } from '@/contexts/SidebarContext';

export function CharacterHeader() {
    const { toggleSidebar } = useSidebar();

    return (
        <header className="h-16 fixed top-0 w-full bg-card border-b border-border flex items-center px-4 lg:px-6 z-50">
            {/* Toggle Sidebar Button */}
            <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="mr-4"
            >
                <Menu className="h-5 w-5" />
            </Button>

            {/* Logo */}
            <a href="/" className="block mr-8">
                <img
                    src="/logo.svg"
                    alt="Candy AI"
                    className="h-8 w-auto hover:opacity-80 transition-opacity"
                />
            </a>

            {/* Top Navigation Content */}
            <div className="ml-auto">
                <TopNavigation />
            </div>
        </header>
    );
}
