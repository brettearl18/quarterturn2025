'use client';

import { useState } from 'react';
import AISearch from './AISearch';

export default function SearchWrapper() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AISearch 
      onSearch={(query) => {
        console.log('Search query:', query);
        setSearchQuery(query);
      }}
      onSuggestionSelect={(suggestion) => {
        console.log('Selected suggestion:', suggestion);
        if (typeof suggestion === 'string') {
          setSearchQuery(suggestion);
        }
      }}
    />
  );
} 