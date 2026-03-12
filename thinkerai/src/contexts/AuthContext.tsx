'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, AuthState, AuthFormData } from '@/types/auth';

interface AuthContextType extends AuthState {
    login: (username: string, password: string) => Promise<boolean>;
    register: (userData: any) => Promise<boolean>;
    logout: () => void;
    clearError: () => void;
    isVIP: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        isLoading: true,
        isAuthenticated: false,
        error: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('saint_token');
        const userData = localStorage.getItem('saint_user');
        if (token && userData) {
            setState({
                user: JSON.parse(userData),
                isLoading: false,
                isAuthenticated: true,
                error: null,
            });
            // 🏮 神识同步：去大坝验一下这枚令牌是否还在有效期
            validateToken(token);
        } else {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    const getGatewayUrl = () => {
        if (typeof window !== 'undefined') {
            const host = window.location.hostname;
            return `http://${host}:3000`;
        }
        return 'http://localhost:3000';
    };

    const validateToken = async (token: string) => {
        try {
            const resp = await fetch(`${getGatewayUrl()}/api/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (resp.ok) {
                const data = await resp.json();
                if (data.success) {
                    const newUser: User = {
                        id: data.user.name,
                        email: data.user.email || "",
                        username: data.user.name,
                        avatar: data.user.avatar || `https://ui-avatars.com/api/?name=${data.user.name}&background=8b5cf6&color=fff`,
                        role: data.user.role,
                        preferences: { language: 'zh', theme: 'dark', notifications: true },
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    };
                    localStorage.setItem('saint_user', JSON.stringify(newUser));
                    setState(prev => ({ ...prev, user: newUser, isAuthenticated: true }));
                }
            } else {
                logout();
            }
        } catch (e) {
            console.error("圣域信号不稳定", e);
        }
    };

    const login = async (username: string, password: string): Promise<boolean> => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            const resp = await fetch(`${getGatewayUrl()}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await resp.json();

            if (!resp.ok) {
                throw new Error(data.message || '圣域验证失败：身份不明');
            }

            const newUser: User = {
                id: data.user.name,
                email: data.user.email || "",
                username: data.user.name,
                avatar: data.user.avatar || `https://ui-avatars.com/api/?name=${data.user.name}&background=8b5cf6&color=fff`,
                role: data.user.role,
                preferences: { language: 'zh', theme: 'dark', notifications: true },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            localStorage.setItem('saint_token', data.token);
            localStorage.setItem('saint_user', JSON.stringify(newUser));

            setState({
                user: newUser,
                isLoading: false,
                isAuthenticated: true,
                error: null,
            });
            return true;
        } catch (e: any) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: e.message || '未知神迹中断，请重试',
            }));
            return false;
        }
    };

    const register = async (userData: any): Promise<boolean> => {
        setState(prev => ({
            ...prev,
            isLoading: false,
            error: '请联系主持（主公）线下授印：注册逻辑暂锁定。 (Please contact Grand Master for registration)'
        }));
        return false;
    };

    const logout = () => {
        localStorage.removeItem('saint_token');
        localStorage.removeItem('saint_user');
        setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
        });
    };

    const clearError = () => {
        setState(prev => ({ ...prev, error: null }));
    };

    // 🏮 圣域核心准则：角色为 vip 或 神名为 admin 的信众享有对冲特权
    const isVIP = state.user?.role === 'vip' || state.user?.username.toLowerCase() === 'admin';

    return (
        <AuthContext.Provider value={{ ...state, login, register, logout, clearError, isVIP }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
