/**
 * @author: Joel Deon Dsouza
 * @description: This file conatins the SearchOutput component, which fetches and displays search results based on a library ID.
 * @version: 1.0.0
 * @date: 2025-06-02
 */

'use client';
import { supabase } from '@/services/Supabase';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Header from './_components/Header';
import { LibraryData } from './_types';
import SearchResults from './_components/SearchResults';

const SearchOutput: React.FC = () => {
  const { libId } = useParams<{ libId: string }>();
  const [searchQuery, setSearchQuery] = useState<LibraryData | null>(null);

  useEffect(() => {
    if (libId) {
      GetSearchQuery();
    }
  }, [libId]);

  const GetSearchQuery = async (): Promise<void> => {
    try {
      const { data: Library, error } = await supabase
        .from('Library')
        .select('*')
        .eq('libId', libId);

      if (error) {
        console.error('Error fetching library data:', error);
        return;
      }
      if (Library && Library.length > 0) {
        setSearchQuery(Library[0] as LibraryData);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <div>
      <Header searchQuery={searchQuery} />
      <div className="px-10 md:px-20 lg:px-40 xl:px-60 mt-20">
        <SearchResults searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default SearchOutput;
