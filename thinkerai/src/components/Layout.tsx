'use client';

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TopNavigation } from '@/components/TopNavigation';
import { SidebarNavigation } from '@/components/SidebarNavigation';
import { DebatePanel } from '@/components/DebatePanel';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* 顶部通栏 - 横跨整个屏幕 */}
      <header className="h-16 bg-card border-b border-border flex items-center px-4 lg:px-6 z-50">
        {/* 三道杠按钮 - 控制侧边栏收缩 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            toggleSidebar();
            // 🏮 唤醒移动端神谕：触发自定义事件以同步 Drawer 状态
            window.dispatchEvent(new CustomEvent('toggleMobileMenu'));
          }}
          className="mr-4"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <a href="/" className="block mr-8">
          <img
            src="/logo.svg"
            alt="Candy AI"
            className="h-8 w-auto hover:opacity-80 transition-opacity"
          />
        </a>

        {/* 顶部导航内容 */}
        <div className="flex items-center space-x-4 ml-auto">
          <TopNavigation />
        </div>
      </header>

      {/* 主内容区 - 包含侧边栏和页面内容 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 侧边栏 */}
        <aside className={cn(
          "hidden lg:block transition-all duration-300 bg-card border-r border-border",
          isCollapsed ? 'w-20' : 'w-64'
        )}>
          <SidebarNavigation />
        </aside>

        {/* 页面内容 */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      <DebatePanel />
    </div>
  );
}
