"use client";

import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import ProfessionalCard from "./ProfessionalCard";

export default function OnlineCoachesDirectory() {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Placeholder for filter state
  const [filters, setFilters] = useState({});

  useEffect(() => {
    async function fetchOnlineCoaches() {
      setLoading(true);
      const q = query(collection(db, "professionals"), where("modalities", "array-contains", "online"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProfessionals(data);
      setLoading(false);
    }
    fetchOnlineCoaches();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Online Health Coaches</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="md:w-1/4 w-full mb-6 md:mb-0">
          <div className="bg-white rounded-lg shadow p-4 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Filter Coaches</h2>
            {/* Placeholder for filter controls */}
            <div className="text-gray-500 text-sm">(Specialties, rating, price, etc. coming soon)</div>
          </div>
        </aside>
        {/* Gallery Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="text-center text-gray-500">Loading online coaches...</div>
          ) : professionals.length === 0 ? (
            <div className="text-center text-gray-500">No online coaches found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionals.map((pro) => (
                <ProfessionalCard key={pro.id} professional={pro} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 