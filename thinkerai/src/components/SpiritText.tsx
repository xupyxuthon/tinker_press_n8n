
'use client';

import React from 'react';

interface SpiritTextProps {
    children: React.ReactNode;
    className?: string;
}

export function SpiritText({ children, className = '' }: SpiritTextProps) {
    return (
        <div className={`animate-spirit opacity-0 ${className}`}>
            {children}
        </div>
    );
}
