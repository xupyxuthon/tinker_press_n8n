
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, User, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { login, register, error: contextError, clearError } = useAuth();
    const { language } = useLanguage();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [localError, setLocalError] = useState('');

    const t = {
        en: {
            title: isLogin ? 'Saint Chamber Entrance' : 'Seeker Inscription',
            desc: isLogin ? 'Identified yourself via Saint Seal' : 'Contact Grand Master for an account',
            user: 'Username / Email',
            pass: 'Secret Key',
            action: isLogin ? 'Enter Saint Domain' : 'Submit Inscription',
            switch: isLogin ? "New Seeker? Contact Master" : "Already a Seeker? Return",
            errPrefix: "🛡️ [Seal Rejection]: ",
            signup: "Sign up",
            login: "Log in"
        },
        zh: {
            title: isLogin ? '圣长生殿 · 密径' : '寻圣问道 · 授印',
            desc: isLogin ? '请凭‘信众金印’（JWT）验明正身' : '新信众请联系主公（Grand Master）线下授印',
            user: '名讳 / 邮箱',
            pass: '禁中私钥',
            action: isLogin ? '步入真理' : '呈送表章',
            switch: isLogin ? "尚未授印？请旨主公" : "已有神识？回归圣殿",
            errPrefix: "🛡️ [圣域拒收]: ",
            signup: "线下授印",
            login: "神识回归"
        },
        ja: {
            title: isLogin ? '聖域への入り口' : '信者登録',
            desc: isLogin ? '聖印（JWT）で身分を証明してください' : '新しい信者は主公に連絡してください',
            user: 'ユーザー名 / メール',
            pass: '秘密鍵',
            action: isLogin ? '聖域に入る' : '登録申請',
            switch: isLogin ? "未登録ですか？主公に連絡" : "登録済みですか？戻る",
            errPrefix: "🛡️ [聖域拒絶]: ",
            signup: "登録",
            login: "ログイン"
        }
    }[language] || { title: 'Auth', desc: '', user: 'User', pass: 'Pass', action: 'Submit', switch: '', errPrefix: 'Err: ', signup: 'Sign up', login: 'Login' };

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setLocalError('');
        clearError();

        try {
            if (isLogin) {
                const success = await login(username, password);
                if (success) {
                    onClose();
                    // 🏮 圣域洗礼：强制刷新页面以确保侧边栏与位面开关全量生效
                    setTimeout(() => window.location.reload(), 100);
                }
            } else {
                await register({});
            }
        } catch (err: any) {
            setLocalError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const currentError = localError || contextError;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-card w-full max-w-md rounded-2xl border border-border p-6 shadow-2xl relative animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
                >
                    <X className="w-5 h-5 text-muted-foreground" />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                        {t.title}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        {t.desc}
                    </p>
                </div>

                {currentError && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
                        {t.errPrefix}{currentError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <div className="relative">
                            <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={t.user}
                                className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t.pass}
                                className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all"
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full py-6 text-lg font-semibold rounded-xl mt-4 active:scale-95 transition-transform" disabled={isLoading}>
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                {t.action}
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        )}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setLocalError('');
                            clearError();
                        }}
                        className="text-primary font-semibold hover:underline"
                    >
                        {t.switch}
                    </button>
                </div>
            </div>
        </div>
    );
}
