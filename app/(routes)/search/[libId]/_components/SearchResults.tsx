/**
 * @author: Joel Deon Dsouza
 * @description: Handles the search results display and AI response generation for the Lena application.
 * @version: 1.0.0
 * @date: 2025-06-02
 */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { LibraryData } from '../_types';
import { Brain } from 'lucide-react';
import AIResponse from './AIResponse';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { supabase } from '@/services/Supabase';

interface SearchProps {
  searchQuery: LibraryData | null;
}

const resultTabs = [{ name: 'Lena', icon: Brain }];

const SearchResults: React.FC<SearchProps> = ({ searchQuery }) => {
  const [activeTab, setActiveTab] = useState(resultTabs[0].name);
  const [aiGerneratedResponse, setAiGeneratedResponse] = useState<LibraryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { libId } = useParams();

  useEffect(() => {
    if (searchQuery) {
      setActiveTab(resultTabs[0].name);
      handleAIResponseGeneration();
    }
  }, [searchQuery]);

  const handleAIResponseGeneration = async () => {
    setIsLoading(true);
    setError(null);
    setAiGeneratedResponse(null);
    try {
      const result = await generateAiResponse();
      if (result.data && result.data.aiResp) {
        setAiGeneratedResponse(result.data as LibraryData);
      } else {
        await GetAIResponse();
      }
    } catch (err) {
      console.error('Error generating AI response:', err);
      setError('Failed to generate AI response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const generateAiResponse = async () => {
    const result = await axios.post('/api/llm-model', {
      searchInput: searchQuery?.searchInput,
      recordId: libId,
    });
    return result;
  };

  // Fetch AI response from Supabase with polling //
  const GetAIResponse = async (maxRetries = 10, delay = 1000): Promise<void> => {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const { data: Library, error } = await supabase
          .from('Library')
          .select('*')
          .eq('libId', libId);
        if (error) {
          console.error('Error fetching library data:', error);
          throw new Error('Database fetch failed');
        }
        if (Library && Library.length > 0 && Library[0].aiResp) {
          setAiGeneratedResponse(Library[0] as LibraryData);
          return;
        }
        if (attempt < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        if (attempt === maxRetries - 1) {
          throw error; // Only throw on final attempt
        }
      }
    }
    throw new Error('AI response not available after multiple attempts');
  };

  return (
    <div className="mt-8 sm:px-0">
      <h2 className="font-medium text-2xl sm:text-3xl line-clamp-2 mb-4 sm:mb-0">
        {searchQuery?.searchInput || 'Search Results'}
      </h2>
      {/* Mobile-first responsive tab container */}
      <div className="mt-6 border-b border-gray-200/20 pb-2">
        <div className="flex items-center justify-between sm:justify-start sm:space-x-6 overflow-x-auto scrollbar-hide">
          {resultTabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`
                flex items-center justify-center gap-1.5 sm:gap-2
                px-2 sm:px-4 py-2 
                relative text-xs sm:text-sm font-medium 
                transition-all duration-300 ease-in-out
                hover:scale-105 hover:shadow-lg
                flex-shrink-0 min-w-0
                ${
                  activeTab === tab.name
                    ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-white shadow-md transform scale-105'
                    : 'text-blue-50 hover:text-blue-400 hover:bg-blue-900/20'
                }
              `}
            >
              <tab.icon
                className={`
                  h-3 w-3 sm:h-4 sm:w-4 transition-all duration-300 flex-shrink-0
                  ${activeTab === tab.name ? 'text-white drop-shadow-sm' : 'text-blue-300'}
                `}
              />
              {/* Show short name on mobile, full name on desktop */}
              <span className="hidden sm:inline whitespace-nowrap">{tab.name}</span>
              {/* Active indicator - adjusted for mobile */}
              {activeTab === tab.name && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 sm:w-8 h-0.5 bg-white rounded-full opacity-80" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content area */}
      <div>
        {activeTab === 'Lena' && (
          <AIResponse
            aiGerneratedResponse={aiGerneratedResponse}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
