'use client';

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ImagePlaceholderProps {
    prompt: string;
}

export function ImagePlaceholder({ prompt }: ImagePlaceholderProps) {
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        // Simulate image generation delay
        const timer = setTimeout(() => {
            setImageUrl(`https://placehold.co/512x512/8b5cf6/ffffff?text=${encodeURIComponent(prompt || 'Generated AI Image')}`);
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [prompt]);

    return (
        <div className="relative w-full aspect-square max-w-[400px] rounded-lg overflow-hidden border border-border bg-secondary/30 mt-2">
            {loading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                    <Skeleton className="w-full h-full absolute inset-0" />
                    <div className="z-10 text-center p-4">
                        <div className="flex justify-center mb-4">
                            <div className="h-2 w-2 bg-primary rounded-full typing-dot mx-0.5" />
                            <div className="h-2 w-2 bg-primary rounded-full typing-dot mx-0.5" />
                            <div className="h-2 w-2 bg-primary rounded-full typing-dot mx-0.5" />
                        </div>
                        <p className="text-sm font-medium text-primary animate-pulse">Generating your image...</p>
                        <p className="text-xs text-muted-foreground mt-1 truncate max-w-[200px]">"{prompt}"</p>
                    </div>
                </div>
            ) : (
                <>
                    <Image
                        src={imageUrl!}
                        alt={prompt}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-xs text-white truncate">"{prompt}"</p>
                    </div>
                </>
            )}
        </div>
    );
}
