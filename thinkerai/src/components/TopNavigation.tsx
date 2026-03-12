'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { UserMenu } from '@/components/auth/UserMenu';

interface TopNavigationProps {
  onMenuClick?: () => void;
}

export function TopNavigation({ onMenuClick }: TopNavigationProps = {}) {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const getLanguageDisplay = (lang: string) => {
    switch (lang) {
      case 'en': return { flag: '🇺🇸', name: 'English' };
      case 'zh': return { flag: '🇨🇳', name: '中文' };
      case 'ja': return { flag: '🇯🇵', name: '日本語' };
      default: return { flag: '🇺🇸', name: 'English' };
    }
  };

  const currentLang = getLanguageDisplay(language);

  const handleLanguageChange = (newLanguage: 'en' | 'zh' | 'ja') => {
    setLanguage(newLanguage);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <div className="flex items-center space-x-4 h-full">
      {/* Language Selector */}
      <div className="relative">
        <button
          onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
        >
          <span className="text-base">{currentLang.flag}</span>
          <span>{currentLang.name}</span>
          <ChevronDown className="h-3 w-3" />
        </button>

        {isLanguageDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg z-50">
            <div className="py-1">
              <button
                onClick={() => handleLanguageChange('en')}
                className={cn(
                  "block w-full px-4 py-2 text-sm text-left hover:bg-secondary",
                  language === 'en' ? "text-foreground bg-secondary" : "text-muted-foreground"
                )}
              >
                🇺🇸 English
              </button>
              <button
                onClick={() => handleLanguageChange('zh')}
                className={cn(
                  "block w-full px-4 py-2 text-sm text-left hover:bg-secondary",
                  language === 'zh' ? "text-foreground bg-secondary" : "text-muted-foreground"
                )}
              >
                🇨🇳 中文
              </button>
              <button
                onClick={() => handleLanguageChange('ja')}
                className={cn(
                  "block w-full px-4 py-2 text-sm text-left hover:bg-secondary",
                  language === 'ja' ? "text-foreground bg-secondary" : "text-muted-foreground"
                )}
              >
                🇯🇵 日本語
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Auth Section */}
      <UserMenu />
    </div>
  );
}
