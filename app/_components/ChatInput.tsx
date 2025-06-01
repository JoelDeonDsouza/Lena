'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchIcon, Sparkle, Cpu, Paperclip, MoveUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AIModalsList } from '@/services/Shared';
import { supabase } from '@/services/Supabase';
import { useUser } from '@clerk/nextjs';
import { v4 as uuidv4 } from 'uuid';

const ChatInput = () => {
  const { user } = useUser();
  const router = useRouter();
  const [userSearch, setUserSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState('search');
  const [isLoading, setIsLoading] = useState(false);

  // Handle search query submission //
  const handleSearchQuery = async () => {
    setIsLoading(true);
    try {
      const libId = uuidv4();
      const result = await supabase
        .from('Library')
        .insert([
          {
            searchInput: userSearch,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            type: selectedTab,
            libId: libId,
          },
        ])
        .select();
      console.log(result);
      router.push(`/search/${libId}`);
      setUserSearch('');
    } catch (error) {
      console.error('Failed to insert library:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col h-screen items-center justify-end sm:justify-center w-full px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent text-center mb-6 sm:mb-8 px-2">
        What can I help with?
      </h1>
      <div className="w-full p-3 max-w-2xl border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg mt-2 mb-10 sm:mb-0">
        <div className="flex items-end justify-between">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-[400px]">
            <TabsContent value="search">
              <input
                type="text"
                placeholder="Search for something..."
                className="w-full p-4 outline-none h-3"
                onChange={(e) => setUserSearch(e.target.value)}
                value={userSearch}
                id="searchInput"
              />
            </TabsContent>
            <TabsContent value="analyze">
              <input
                type="text"
                placeholder="Analysis input..."
                className="w-full p-4 outline-none h-3"
                onChange={(e) => setUserSearch(e.target.value)}
                value={userSearch}
                id="analyzeInput"
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
                {AIModalsList.map((model, i) => (
                  <DropdownMenuItem key={i}>
                    <div className="mb-1">
                      <span>{model.name}</span>
                      <p className="text-xs text-gray-500">{model.description}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost">
              <Paperclip className="text-gray-500 h-5 w-5" />
            </Button>
            {userSearch && (
              <Button
                onClick={handleSearchQuery}
                disabled={isLoading}
                variant="ghost"
                className="bg-emerald-500/30 hover:bg-emerald-600/50 border border-emerald-400/30 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <MoveUp className="text-emerald-600 hover:text-emerald-700 h-5 w-5 transition-colors duration-200" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
