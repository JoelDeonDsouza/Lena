/**
 * @author: Joel Deon Dsouza
 * @description: Sidebar component for the application, which includes navigation links, theme toggle, and user information.
 * @version: 1.0.0
 * @date: 2025-06-02
 */

'use client';
import React, { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { Moon, Sun, Plus, LogIn, BadgePlus, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useTheme } from '@/hooks/theme-provider';
import { usePathname } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';

const MenuItem = [
  {
    name: 'Home',
    icon: Plus,
    path: '/',
  },
  {
    name: 'Login',
    icon: LogIn,
    path: '/sign-in',
    authRequired: false,
  },
  {
    name: 'Register',
    icon: BadgePlus,
    path: '/sign-up',
    authRequired: false,
  },
];

const AppSidebar = () => {
  const { theme, setTheme } = useTheme();
  const { state, open, setOpen, isMobile } = useSidebar();
  const path = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const { user, isLoaded } = useUser();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const isCollapsed = state === 'collapsed';
  const shouldShowText = !isCollapsed || isHovered;

  // Filter menu items based on authentication requirements //
  const filteredMenuItems = MenuItem.filter((menu) => {
    if (!isLoaded) {
      return menu.authRequired !== false;
    }
    if (menu.authRequired === false) {
      return !user;
    }
    return true;
  });

  // Mobile view does not show the toggle button //
  const showToggleButton = !isMobile;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <Sidebar
        collapsible="icon"
        className={`border-r transition-all duration-200 ${isCollapsed && isHovered ? 'w-64' : ''}`}
      >
        <SidebarHeader className="px-2.5 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              {/* Logo is always visible */}
              <div className="flex-shrink-0">
                <Image
                  src={'/logo.png'}
                  alt="Lena Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
              </div>
              <div
                className={`transition-all duration-200 overflow-hidden ${
                  shouldShowText ? 'opacity-100 max-w-none' : 'opacity-0 max-w-0'
                }`}
              >
                <h1 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent whitespace-nowrap">
                  Lena
                </h1>
              </div>
            </div>
            {/* Only show toggle button on desktop */}
            {showToggleButton && (
              <div
                className={`transition-all duration-200 ${
                  shouldShowText ? 'opacity-100 max-w-none' : 'opacity-0 max-w-0 overflow-hidden'
                }`}
              >
                <SidebarMenuButton
                  onClick={toggleSidebar}
                  className="h-7 w-7 flex-shrink-0"
                  size="sm"
                >
                  {isCollapsed ? (
                    <PanelLeft className="h-5 w-5" />
                  ) : (
                    <PanelLeftClose className="h-5 w-5" />
                  )}
                </SidebarMenuButton>
              </div>
            )}
          </div>
        </SidebarHeader>
        {/* Render the sidebar content only if not collapsed */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {filteredMenuItems.map((menu, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton
                    asChild
                    className={`${path?.includes(menu.path) ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                    tooltip={isCollapsed && !isHovered ? menu.name : undefined}
                  >
                    <a href={menu.path} className="flex items-center gap-2">
                      <menu.icon className="h-5 w-5 flex-shrink-0" />
                      <div
                        className={`transition-all duration-200 overflow-hidden ${
                          shouldShowText ? 'opacity-100 max-w-none' : 'opacity-0 max-w-0'
                        }`}
                      >
                        <span className="text-base truncate whitespace-nowrap">{menu.name}</span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={toggleTheme}
                tooltip={
                  isCollapsed && !isHovered
                    ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
                    : undefined
                }
              >
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <Moon className="h-5 w-5 flex-shrink-0" />
                  )}
                  <div
                    className={`transition-all duration-200 overflow-hidden ${
                      shouldShowText ? 'opacity-100 max-w-none' : 'opacity-0 max-w-0'
                    }`}
                  >
                    <span className="text-base font-medium truncate whitespace-nowrap">
                      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                    </span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          {/* Only show user info when loaded and user exists */}
          {isLoaded && user && (
            <div className="flex items-center gap-2">
              <UserButton />
              <span className="text-base font-medium truncate whitespace-nowrap">
                {user?.firstName || user?.username || ''}
              </span>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export default AppSidebar;
