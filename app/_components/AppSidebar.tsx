"use client";
import React, { useState } from "react";
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
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  Moon,
  Sun,
  Plus,
  Telescope,
  Boxes,
  LogIn,
  BadgePlus,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { useTheme } from "@/hooks/theme-provider";
import { usePathname } from "next/navigation";

const MenuItem = [
  {
    name: "Home",
    icon: Plus,
    path: "/",
  },
  {
    name: "Discover",
    icon: Telescope,
    path: "/discover",
  },
  {
    name: "Spaces",
    icon: Boxes,
    path: "/spaces",
  },
  {
    name: "Login",
    icon: LogIn,
    path: "/login",
  },
  {
    name: "Register",
    icon: BadgePlus,
    path: "/register",
  },
];

const AppSidebar = () => {
  const { theme, setTheme } = useTheme();
  const { state, open, setOpen, isMobile } = useSidebar();
  const path = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const isCollapsed = state === "collapsed";
  const shouldShowText = !isCollapsed || isHovered;

  // On mobile, don't show the internal toggle button since it conflicts with SidebarTrigger
  const showToggleButton = !isMobile;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <Sidebar
        collapsible="icon"
        className={`border-r transition-all duration-200 ${
          isCollapsed && isHovered ? "w-64" : ""
        }`}
      >
        <SidebarHeader className="px-2.5 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              {/* Logo is always visible */}
              <div className="flex-shrink-0">
                <Image
                  src={"/logo.png"}
                  alt="Lena Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
              </div>
              <div
                className={`transition-all duration-200 overflow-hidden ${
                  shouldShowText
                    ? "opacity-100 max-w-none"
                    : "opacity-0 max-w-0"
                }`}
              >
                <h1 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent whitespace-nowrap">
                  Lena
                </h1>
              </div>
            </div>
            {/* Only show toggle button on desktop */}
            {showToggleButton && (
              <div
                className={`transition-all duration-200 ${
                  shouldShowText
                    ? "opacity-100 max-w-none"
                    : "opacity-0 max-w-0 overflow-hidden"
                }`}
              >
                <SidebarMenuButton
                  onClick={toggleSidebar}
                  className="h-7 w-7 flex-shrink-0"
                  size="sm"
                >
                  {isCollapsed ? (
                    <PanelLeft className="h-4 w-4" />
                  ) : (
                    <PanelLeftClose className="h-4 w-4" />
                  )}
                </SidebarMenuButton>
              </div>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {MenuItem.map((menu, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton
                    asChild
                    className={`${
                      path?.includes(menu.path)
                        ? "bg-gray-200 dark:bg-gray-800"
                        : ""
                    }`}
                    tooltip={isCollapsed && !isHovered ? menu.name : undefined}
                  >
                    <a href={menu.path} className="flex items-center gap-2">
                      <menu.icon className="h-4 w-4 flex-shrink-0" />
                      <div
                        className={`transition-all duration-200 overflow-hidden ${
                          shouldShowText
                            ? "opacity-100 max-w-none"
                            : "opacity-0 max-w-0"
                        }`}
                      >
                        <span className="truncate whitespace-nowrap">
                          {menu.name}
                        </span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={toggleTheme}
                tooltip={
                  isCollapsed && !isHovered
                    ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
                    : undefined
                }
              >
                <div className="flex items-center gap-2">
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <Moon className="h-4 w-4 flex-shrink-0" />
                  )}
                  <div
                    className={`transition-all duration-200 overflow-hidden ${
                      shouldShowText
                        ? "opacity-100 max-w-none"
                        : "opacity-0 max-w-0"
                    }`}
                  >
                    <span className="text-sm font-medium truncate whitespace-nowrap">
                      {theme === "dark" ? "Light mode" : "Dark mode"}
                    </span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export default AppSidebar;
