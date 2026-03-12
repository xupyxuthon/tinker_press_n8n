'use client';

import { useState, useEffect } from 'react';
import { AuthMode, AuthFormData } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface AuthFormProps {
    mode: AuthMode;
    onModeChange: (mode: AuthMode) => void;
    onClose: () => void;
}

export function AuthForm({ mode, onModeChange, onClose }: AuthFormProps) {
    const { login, register, isLoading, error, clearError } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<AuthFormData>({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    // 清除错误当表单数据改变时
    useEffect(() => {
        if (error) clearError();
    }, [formData, error, clearError]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (mode === 'login') {
            const success = await login(formData.email, formData.password);
            if (success) {
                onClose();
            }
        } else if (mode === 'register') {
            if (formData.password !== formData.confirmPassword) {
                return;
            }
            
            const success = await register({
                email: formData.email,
                username: formData.username,
                password: formData.password,
            });
            
            if (success) {
                onClose();
            }
        }
    };

    const handleInputChange = (field: keyof AuthFormData) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const isFormValid = () => {
        if (mode === 'login') {
            return formData.email && formData.password;
        } else if (mode === 'register') {
            return (
                formData.email &&
                formData.username &&
                formData.password &&
                formData.confirmPassword &&
                formData.password === formData.confirmPassword &&
                formData.password.length >= 6
            );
        }
        return false;
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-semibold">
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-secondary transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange('email')}
                                placeholder="Enter your email"
                                className="w-full pl-10 pr-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    {/* Username (only for register) */}
                    {mode === 'register' && (
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={handleInputChange('username')}
                                    placeholder="Choose a username"
                                    className="w-full pl-10 pr-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleInputChange('password')}
                                placeholder="Enter your password"
                                className="w-full pl-10 pr-10 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password (only for register) */}
                    {mode === 'register' && (
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange('confirmPassword')}
                                    placeholder="Confirm your password"
                                    className="w-full pl-10 pr-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                    minLength={6}
                                />
                            </div>
                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="text-sm text-destructive mt-1">
                                    Passwords do not match
                                </p>
                            )}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                            <p className="text-sm text-destructive">{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!isFormValid() || isLoading}
                        className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            'Loading...'
                        ) : mode === 'login' ? (
                            'Sign In'
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                {/* Mode Switch */}
                <div className="p-6 border-t border-border">
                    <p className="text-center text-sm text-muted-foreground">
                        {mode === 'login' ? (
                            <>
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => onModeChange('register')}
                                    className="text-primary hover:underline"
                                >
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => onModeChange('login')}
                                    className="text-primary hover:underline"
                                >
                                    Sign in
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
