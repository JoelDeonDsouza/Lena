/**
 * @author: Joel Deon Dsouza
 * @description: AI Response component that displays the AI-generated response, loading state, or error messages.
 * @version: 1.0.0
 * @date: 2025-06-02
 */

import React from 'react';
import { LibraryData } from '../_types';

interface AIResponseProps {
  aiGerneratedResponse: LibraryData | null;
  isLoading?: boolean;
  error?: string | null;
}

const AIResponse: React.FC<AIResponseProps> = ({
  aiGerneratedResponse,
  isLoading = false,
  error = null,
}) => {
  // Error state
  if (error) {
    return (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="text-red-600 text-sm font-medium">Error:</div>
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="mt-4 p-6 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
          <span className="text-gray-600 text-sm">Lena is thinking...</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    );
  }

  // No response available //
  if (!aiGerneratedResponse?.aiResp) {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-gray-500 text-sm text-center">
          No AI response available yet. Please try searching again.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-white border rounded-lg shadow-sm">
      <div className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
        {aiGerneratedResponse.aiResp}
      </div>
    </div>
  );
};

export default AIResponse;
