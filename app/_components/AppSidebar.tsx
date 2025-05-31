"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const path = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="group/sidebar 
        w-16 hover:w-64 transition-all duration-300 ease-in-out
        md:w-16 md:hover:w-64
        max-sm:w-64"
    >
      <SidebarHeader className="p-2 group-hover/sidebar:p-3 transition-all duration-300 max-sm:p-3">
        <div className="flex flex-row items-center overflow-hidden w-full gap-1">
          <div className="flex-shrink-0 flex items-center justify-center w-12 h-12">
            <Image
              src={"/logo.png"}
              alt="Lena Logo"
              width={48}
              height={48}
              className="rounded-lg"
            />
          </div>
          <h1
            className="text-xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent whitespace-nowrap 
            opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 delay-100
            max-sm:opacity-100 max-sm:delay-0"
          >
            Lena
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {MenuItem.map((menu, i) => (
              <SidebarMenuItem key={i}>
                <SidebarMenuButton
                  asChild
                  className={`w-full py-6 ${path?.includes(menu.path) ? "bg-gray-200 dark:bg-gray-800" : ""}`}
                >
                  <a
                    href={menu.path}
                    className="flex items-center 
                    justify-center group-hover/sidebar:justify-start 
                    max-sm:justify-start 
                    w-full"
                  >
                    <menu.icon
                      className="flex-shrink-0 w-5 h-5 
                      ml-4 max-sm:ml-4"
                    />
                    <span
                      className="ml-2 whitespace-nowrap 
                      opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 delay-100
                      max-sm:opacity-100 max-sm:delay-0"
                    >
                      {menu.name}
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2 group-hover/sidebar:p-3 transition-all duration-300 max-sm:p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={toggleTheme}
              className="w-full py-3"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <div
                className="flex items-center 
                justify-center group-hover/sidebar:justify-start
                max-sm:justify-start"
              >
                {theme === "dark" ? (
                  <Sun className="flex-shrink-0 w-5 h-5" />
                ) : (
                  <Moon className="flex-shrink-0 w-5 h-5" />
                )}
                <span
                  className="ml-2 text-sm font-medium whitespace-nowrap 
                  opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 delay-100
                  max-sm:opacity-100 max-sm:delay-0"
                >
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
