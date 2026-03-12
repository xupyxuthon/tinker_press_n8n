'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, AuthState, AuthFormData } from '@/types/auth';
import { 
    getCurrentUser, 
    saveCurrentUser, 
    removeCurrentUser,
    saveUser,
    getUserByEmail,
    getUserByUsername
} from '@/lib/storage';

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<boolean>;
    register: (userData: Omit<AuthFormData, 'confirmPassword'>) => Promise<boolean>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
    clearError: () => void;
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
        const currentUser = getCurrentUser();
        setState({
            user: currentUser,
            isLoading: false,
            isAuthenticated: !!currentUser,
            error: null,
        });
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        const user = getUserByEmail(email);
        
        if (!user) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: 'User not found',
            }));
            return false;
        }

        if (password.length < 6) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: 'Invalid password',
            }));
            return false;
        }

        saveCurrentUser(user);
        setState({
            user,
            isLoading: false,
            isAuthenticated: true,
            error: null,
        });
        return true;
    };

    const register = async (userData: Omit<AuthFormData, 'confirmPassword'>): Promise<boolean> => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        const existingUserByEmail = getUserByEmail(userData.email);
        if (existingUserByEmail) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: 'Email already exists',
            }));
            return false;
        }

        if (userData.username) {
            const existingUserByUsername = getUserByUsername(userData.username);
            if (existingUserByUsername) {
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: 'Username already exists',
                }));
                return false;
            }
        }

        const newUser: User = {
            id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            email: userData.email,
            username: userData.username || userData.email.split('@')[0],
            preferences: {
                language: 'en',
                theme: 'light',
                notifications: true,
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        saveUser(newUser);
        saveCurrentUser(newUser);

        setState({
            user: newUser,
            isLoading: false,
            isAuthenticated: true,
            error: null,
        });
        return true;
    };

    const logout = () => {
        removeCurrentUser();
        setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
        });
    };

    const updateUser = (userData: Partial<User>) => {
        if (!state.user) return;

        const updatedUser = {
            ...state.user,
            ...userData,
            updatedAt: new Date().toISOString(),
        };

        saveUser(updatedUser);
        saveCurrentUser(updatedUser);
        setState(prev => ({
            ...prev,
            user: updatedUser,
        }));
    };

    const clearError = () => {
        setState(prev => ({ ...prev, error: null }));
    };

    const contextValue: AuthContextType = {
        ...state,
        login,
        register,
        logout,
        updateUser,
        clearError,
    };

    return (
        <AuthContext.Provider value={contextValue}>
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
