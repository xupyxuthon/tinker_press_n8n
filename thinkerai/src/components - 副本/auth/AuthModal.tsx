'use client';

import { useState } from 'react';
import { AuthMode } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
import { AuthForm } from './AuthForm';
import { LogIn, UserPlus } from 'lucide-react';

export function AuthModal() {
    const { isAuthenticated } = useAuth();
    const [mode, setMode] = useState<AuthMode>('login');
    const [isOpen, setIsOpen] = useState(false);

    if (isAuthenticated) return null;

    return (
        <>
            {/* Auth Buttons */}
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => {
                        setMode('login');
                        setIsOpen(true);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                </button>
                
                <button
                    onClick={() => {
                        setMode('register');
                        setIsOpen(true);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors"
                >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                </button>
            </div>

            {/* Auth Modal */}
            {isOpen && (
                <AuthForm
                    mode={mode}
                    onModeChange={setMode}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
