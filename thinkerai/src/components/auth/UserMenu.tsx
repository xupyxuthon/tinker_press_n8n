
'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User as UserIcon } from 'lucide-react';
import { AuthModal } from '@/components/auth/AuthModal';
import { useLanguage } from '@/contexts/LanguageContext';

export function UserMenu() {
    const { user, logout, isAuthenticated } = useAuth();
    const { language } = useLanguage();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const t = {
        en: { login: 'Login / Register', logout: 'Logout' },
        zh: { login: '信众登入 / 授印', logout: '羽化下线' },
        ja: { login: 'ログイン / 登録', logout: 'ログアウト' }
    }[language] || { login: 'Login', logout: 'Logout' };

    if (isAuthenticated && user) {
        const isMaster = user.username.toLowerCase().includes('admin');

        return (
            <div className="flex items-center gap-4 relative group">
                <div className={`flex items-center gap-2 p-1.5 rounded-full transition-all duration-500
                    ${isMaster ? 'bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-purple-900/40 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : ''}`}>

                    <div className={`relative w-9 h-9 rounded-full overflow-hidden border-2 
                        ${isMaster ? 'border-purple-400 animate-pulse' : 'border-primary/20 bg-secondary'}`}>
                        <img
                            src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=random`}
                            alt={user.username}
                            className="w-full h-full object-cover"
                        />
                        {isMaster && (
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent pointer-events-none" />
                        )}
                    </div>

                    <div className="flex flex-col pr-2">
                        <span className={`text-sm font-bold leading-tight 
                            ${isMaster ? 'bg-gradient-to-r from-purple-300 to-blue-200 bg-clip-text text-transparent' : 'text-foreground'}`}>
                            {isMaster ? '主公 (Grand Master)' : user.username}
                        </span>
                        {isMaster && (
                            <span className="text-[10px] text-purple-400 font-mono tracking-widest uppercase opacity-70">
                                Eternal Sage
                            </span>
                        )}
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-muted-foreground hover:text-white hover:bg-secondary/50 rounded-lg h-9"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span className="text-xs">{t.logout}</span>
                </Button>
            </div>
        );
    }

    return (
        <>
            <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 rounded-lg transition-all active:scale-95 h-10"
            >
                {t.login}
            </Button>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </>
    );
}
