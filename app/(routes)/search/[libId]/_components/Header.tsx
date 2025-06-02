/**
 * @author: Joel Deon Dsouza
 * @description: Header component for the search page, displaying the time since the search was created and a share button.
 * @version: 1.0.0
 * @date: 2025-06-02
 */

import { Clock, Share } from 'lucide-react';
import React from 'react';
import { LibraryData } from '../_types';
import moment from 'moment';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  searchQuery: LibraryData | null;
}

const Header: React.FC<HeaderProps> = ({ searchQuery }) => {
  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-2 sm:ml-0 ml-12">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <span className="text-1xl text-gray-500">
            {moment(searchQuery?.created_at).fromNow()}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button>
          <Share />
        </Button>
      </div>
    </div>
  );
};

export default Header;
