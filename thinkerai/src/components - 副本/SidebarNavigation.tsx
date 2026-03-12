'use client';

import { useState, useEffect } from 'react';
import { Home, Users, MessageSquare, Grid3X3, Image, PlusCircle, User, ChevronDown, MessageCircle, HelpCircle, Mail, Gift, Shield, FileText, Crown, X, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar } from '@/contexts/SidebarContext';

interface SidebarNavigationProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function SidebarNavigation({ isOpen = false, onClose }: SidebarNavigationProps = {}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { isCollapsed, setIsCollapsed, toggleSidebar } = useSidebar();
  const { language, setLanguage, t } = useLanguage();

  // Listen for mobile menu toggle event from TopNavigation
  useEffect(() => {
    const handleToggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    window.addEventListener('toggleMobileMenu', handleToggleMobileMenu);
    return () => window.removeEventListener('toggleMobileMenu', handleToggleMobileMenu);
  }, [isMobileMenuOpen]);

  const navigationItems = [
    { name: t('nav.home'), href: '/', icon: Home, active: true },
    { name: t('nav.discover'), href: '/feed', icon: Users },
    { name: t('nav.chat'), href: '/chat', icon: MessageSquare },
    { name: t('nav.collection'), href: '/collection', icon: Grid3X3 },
    { name: t('nav.generateImage'), href: '/generate-image', icon: Image },
    { name: t('nav.createCharacter'), href: '/characters/new', icon: PlusCircle },
    { name: t('nav.myAI'), href: '/characters', icon: User },
  ];

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
    <>
      {/* Mobile Menu */}
      {(isMobileMenuOpen || isOpen) && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => {
          setIsMobileMenuOpen(false);
          if (onClose) onClose();
        }} />
      )}
      
      <div className={cn(
        "lg:hidden fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out z-40",
        (isMobileMenuOpen || isOpen) ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="sm" onClick={() => {
              setIsMobileMenuOpen(false);
              if (onClose) onClose();
            }}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  item.active 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Premium Button */}
          <div className="p-4 border-t border-border">
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
              size="sm"
            >
              <Crown className="mr-2 h-4 w-4" />
              Become Premium
              <Badge className="ml-2 bg-white text-black text-xs">70% OFF</Badge>
            </Button>
          </div>

          {/* Mobile Language Selector */}
          <div className="p-4 border-t border-border">
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                <span className="text-base">{currentLang.flag}</span>
                <span>{currentLang.name}</span>
                <ChevronDown className="h-3 w-3 ml-auto" />
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-card border border-border rounded-lg shadow-lg z-50">
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
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border flex-col z-10 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}>
        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-lg transition-colors group",
                item.active 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="h-4 w-4 min-w-[16px]" />
              <span className={cn(
                "ml-3 font-medium transition-all duration-300 whitespace-nowrap",
                isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
              )}>
                {item.name}
              </span>
            </a>
          ))}
        </nav>

        {/* Premium Button */}
        <div className={cn(
          "px-4 pb-4 transition-all duration-300",
          isCollapsed ? "px-2" : "px-4"
        )}>
          <Button 
            className={cn(
              "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300",
              isCollapsed ? "px-2 text-xs" : "w-full"
            )}
            size="sm"
          >
            <Crown className={cn("h-4 w-4", isCollapsed ? "mr-0" : "mr-2")} />
            {!isCollapsed && (
              <>
                Become Premium
                <Badge className="ml-2 bg-white text-black text-xs">70% OFF</Badge>
              </>
            )}
          </Button>
        </div>

        {/* Bottom Links */}
        <div className={cn(
          "border-t border-border space-y-2 transition-all duration-300",
          isCollapsed ? "p-2" : "p-4"
        )}>
          <a
            href="https://discord.com/invite/candyai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors group"
          >
            <MessageCircle className="h-4 w-4 min-w-[16px]" />
            <span className={cn(
              "transition-all duration-300 whitespace-nowrap",
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
            )}>
              Discord
            </span>
          </a>
          
          <a
            href="/"
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors group"
          >
            <Mail className="h-4 w-4 min-w-[16px]" />
            <span className={cn(
              "transition-all duration-300 whitespace-nowrap",
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
            )}>
              Contact Us
            </span>
          </a>
          
          <a
            href="https://webforms.pipedrive.com/f/bYSTErXD8pcDoco3iakbUUKFRtWtAjNDJphn0GpYA3B88R2NYvCzVMM2wsNCjtVMkP"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors group"
          >
            <Gift className="h-4 w-4 min-w-[16px]" />
            <span className={cn(
              "transition-all duration-300 whitespace-nowrap",
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
            )}>
              Affiliate
            </span>
          </a>

          {/* Language Selector */}
          <div className="relative pt-2">
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors group"
            >
              <span className="text-base min-w-[16px]">{currentLang.flag}</span>
              <span className={cn(
                "transition-all duration-300 whitespace-nowrap",
                isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
              )}>
                {currentLang.name}
              </span>
              {!isCollapsed && <ChevronDown className="h-3 w-3 ml-auto" />}
            </button>
            
            {isLanguageDropdownOpen && (
              <div className={cn(
                "absolute bottom-full bg-card border border-border rounded-lg shadow-lg z-50",
                isCollapsed ? "left-1/2 transform -translate-x-1/2 mb-2" : "left-0 right-0 mb-2"
              )}>
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
          
          <a
            href="/privacy-policy"
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors group"
          >
            <Shield className="h-4 w-4 min-w-[16px]" />
            <span className={cn(
              "transition-all duration-300 whitespace-nowrap",
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
            )}>
              Privacy Notice
            </span>
          </a>
          
          <a
            href="/legal-information"
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors group"
          >
            <FileText className="h-4 w-4 min-w-[16px]" />
            <span className={cn(
              "transition-all duration-300 whitespace-nowrap",
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
            )}>
              Terms of Service
            </span>
          </a>

          <a
            href="https://everai.zendesk.com/hc/en-us"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors group"
          >
            <HelpCircle className="h-4 w-4 min-w-[16px]" />
            <span className={cn(
              "transition-all duration-300 whitespace-nowrap",
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
            )}>
              Help Center
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
