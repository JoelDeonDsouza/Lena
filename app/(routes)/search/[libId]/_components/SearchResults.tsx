import React, { useState } from 'react';
import { LibraryData } from '../_types';
import { BotMessageSquare, Blocks, Images, TvMinimalPlay } from 'lucide-react';
import AIResponse from './AIResponse';

interface SearchProps {
  searchQuery: LibraryData | null;
}

const resultTabs = [
  { name: 'AI Search', icon: BotMessageSquare, shortName: 'AI' },
  { name: 'Web Search', icon: Blocks, shortName: 'Web' },
  { name: 'Image Search', icon: Images, shortName: 'Images' },
  { name: 'Video Search', icon: TvMinimalPlay, shortName: 'Videos' },
];

const SearchResults: React.FC<SearchProps> = ({ searchQuery }) => {
  const [activeTab, setActiveTab] = useState(resultTabs[0].name);
  return (
    <div className="mt-8 sm:px-0">
      <h2 className="font-medium text-2xl sm:text-3xl line-clamp-2 mb-4 sm:mb-0">
        {searchQuery?.searchInput}
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
              <span className="sm:hidden whitespace-nowrap text-xs">{tab.shortName}</span>
              {/* Active indicator - adjusted for mobile */}
              {activeTab === tab.name && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 sm:w-8 h-0.5 bg-white rounded-full opacity-80" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content area */}
      <div className="mt-6">
        <div className="text-gray-400 text-sm">
          Showing results for: <span className="text-blue-400 font-medium">{activeTab}</span>
        </div>
      </div>
      <div>{activeTab === 'AI Search' ? <AIResponse /> : null}</div>
    </div>
  );
};

export default SearchResults;
