import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, Sparkle, Cpu, Orbit, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ChatInput = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center w-full px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent text-center mb-6 sm:mb-8 px-2">
        What can I help with?
      </h1>
      <div className="w-full p-3 max-w-2xl border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg mt-8">
        <div className="flex items-end justify-between">
          <Tabs defaultValue="search" className="w-[400px]">
            <TabsContent value="search">
              <input
                type="text"
                placeholder="Search for something..."
                className="w-full p-4 outline-none h-3"
              />
            </TabsContent>
            <TabsContent value="analyze">
              <input
                type="text"
                placeholder="Analysis input..."
                className="w-full p-4 outline-none h-3"
              />
            </TabsContent>
            <TabsList>
              <TabsTrigger value="search">
                <SearchIcon /> Search
              </TabsTrigger>
              <TabsTrigger value="analyze">
                <Sparkle /> Analyze
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex gap-3 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Cpu className="text-gray-500 h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Copilot</DropdownMenuItem>
                <DropdownMenuItem>Gemini</DropdownMenuItem>
                <DropdownMenuItem>DeepSeek</DropdownMenuItem>
                <DropdownMenuItem>ChatGPT</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost">
              <Orbit className="text-gray-500 h-5 w-5" />
            </Button>
            <Button variant="ghost">
              <Paperclip className="text-gray-500 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
