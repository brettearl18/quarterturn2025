import React from 'react';

export default function FilterSidebar() {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-500">Search</label>
        <input type="text" className="w-full border rounded px-3 py-2" placeholder="Search gyms, suburb, etc." />
      </div>
      {/* Category/Type */}
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-500">Category</label>
        <div className="flex flex-wrap gap-2">
          <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs">Gyms</button>
          <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs">CrossFit</button>
          <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs">Pilates</button>
          <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs">Boxing</button>
        </div>
      </div>
      {/* Amenities */}
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-500">Amenities</label>
        <div className="flex flex-wrap gap-2">
          <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs">Showers</button>
          <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs">Parking</button>
          <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs">Cardio Classes</button>
        </div>
      </div>
      {/* Distance */}
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-500">Distance</label>
        <select className="w-full border rounded px-3 py-2">
          <option>Any</option>
          <option>Within 2km</option>
          <option>Within 5km</option>
          <option>Within 10km</option>
        </select>
      </div>
    </div>
  );
} 