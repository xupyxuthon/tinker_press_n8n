'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface PlaceholderPageProps {
    title: string;
    description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <div className="w-20 h-20 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Home className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                {title}
            </h1>
            <p className="text-muted-foreground max-w-md mb-8">
                {description || "This feature is currently under active development as part of our platform expansion. Check back soon for an immersive AI experience."}
            </p>
            <div className="flex gap-4">
                <Link href="/">
                    <Button variant="default" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
