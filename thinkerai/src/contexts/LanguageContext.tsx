'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, t } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isLanguageLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

  // 在客户端加载时从localStorage获取保存的语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && savedLanguage !== language) {
      setLanguage(savedLanguage);
    }
    setIsLanguageLoaded(true);
  }, []);

  // 当语言改变时，保存到localStorage
  useEffect(() => {
    if (isLanguageLoaded && typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language, isLanguageLoaded]);

  const translate = (key: string): string => {
    return t(key, language);
  };

  // 在语言加载完成前，不渲染内容避免闪烁
  if (!isLanguageLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translate, isLanguageLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
