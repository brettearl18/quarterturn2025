import React from 'react';
import ProfessionalCard from './ProfessionalCard';

export default function DirectoryResultsList({ professionals }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {professionals.map((pro, idx) => (
        <ProfessionalCard key={pro.id || idx} professional={pro} />
      ))}
    </div>
  );
} 