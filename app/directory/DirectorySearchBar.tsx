import React from 'react';

export default function DirectorySearchBar({ onSearch }) {
  return (
    <form onSubmit={onSearch} className="flex gap-2 mb-4">
      <input type="text" name="specialty" placeholder="Specialty or keyword" className="input input-bordered w-48" />
      <input type="text" name="location" placeholder="Location" className="input input-bordered w-48" />
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
} 