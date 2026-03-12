'use client';

import { useState } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '/', active: true },
    { name: 'Discover', href: '/feed' },
    { name: 'Chat', href: '/chat' },
    { name: 'Collection', href: '/collection' },
    { name: 'Generate Image', href: '/generate-image' },
    { name: 'Create Character', href: '/characters/new' },
    { name: 'My AI', href: '/characters' },
  ];

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Candy AI
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  item.active ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>English</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary">English</a>
                    <a href="#" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-secondary">中文</a>
                    <a href="#" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-secondary">日本語</a>
                  </div>
                </div>
              )}
            </div>

            {/* Premium Button */}
            <Button className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90">
              <span className="mr-1">Premium</span>
              <span className="bg-yellow-400 text-black text-xs px-1.5 py-0.5 rounded font-bold">70% OFF</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                    item.active
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {item.name}
                </a>
              ))}
              
              <div className="pt-4 pb-2 border-t border-border">
                <Button className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90">
                  <span className="mr-1">Premium</span>
                  <span className="bg-yellow-400 text-black text-xs px-1.5 py-0.5 rounded font-bold">70% OFF</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
