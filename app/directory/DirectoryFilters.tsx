import React from 'react';

export default function DirectoryFilters({ filters, setFilters }) {
  return (
    <aside className="w-64 p-4 bg-gray-50 rounded mb-4">
      <div className="mb-4">
        <label className="block font-semibold mb-1">Specialties</label>
        {/* TODO: Map over specialties and render checkboxes */}
        <input type="checkbox" /> Physiotherapy<br />
        <input type="checkbox" /> Personal Training<br />
        <input type="checkbox" /> Nutrition<br />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Modality</label>
        <input type="checkbox" /> Online<br />
        <input type="checkbox" /> In-person<br />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Rating</label>
        {/* TODO: Add star slider or select */}
        <input type="range" min="1" max="5" />
      </div>
    </aside>
  );
} 