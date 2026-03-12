'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Initialize collapsed state based on path: collapse if on character page, expand otherwise
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Check if we are on a character page (path like /abcd...) but not root /
    // This is a simple heuristic; you might want more robust regex if you have other routes
    if (typeof window !== 'undefined') {
      return pathname !== '/';
    }
    return false;
  });

  // Sync state when path changes (optional, but ensures correctness on client-side nav)
  useEffect(() => {
    if (pathname !== '/') {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [pathname]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
