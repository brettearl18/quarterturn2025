"use client";

import { useState, useEffect, useMemo } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import ProfessionalCard from "../directory/ProfessionalCard";
import { FaThLarge, FaTh, FaList } from "react-icons/fa";

const sortOptions = [
  { label: "Best Match", value: "match" },
  { label: "Rating", value: "rating" },
  { label: "Newest", value: "newest" },
];
const displayModes = [
  { value: "largeGrid", icon: FaThLarge, label: "Large Grid" },
  { value: "smallGrid", icon: FaTh, label: "Small Grid" },
  { value: "list", icon: FaList, label: "List" },
];

const mockNames = [
  'Dr. Jane Smith', 'Mike Thompson', 'Elena Rodriguez', 'David Kim',
  'Sarah Johnson', 'Emma Davis', 'Chris Lee', 'Olivia Brown',
  'James Wilson', 'Sophia Martinez', 'Liam Nguyen', 'Ava Patel',
  'Noah Clark', 'Mia Chen', 'Lucas Walker', 'Zoe Adams',
  'Ethan Hall', 'Lily Scott'
];
const mockSpecialties = [
  ['Physiotherapy', 'Rehabilitation'],
  ['Strength & Conditioning', 'HIIT'],
  ['Nutrition', 'Weight Loss'],
  ['Mobility', 'Recovery'],
  ['Yoga', 'Mindfulness'],
  ['Sports Performance', 'Injury Prevention'],
];
const mockImages = Array.from({ length: 18 }).map((_, i) => `https://picsum.photos/600/400?random=${i + 1}`);
const mockCoaches: any[] = Array.from({ length: 18 }).map((_, i) => ({
  id: `mock-${i}`,
  fullName: mockNames[i % mockNames.length],
  specialties: mockSpecialties[i % mockSpecialties.length],
  rating: Math.round((Math.random() * 0.8 + 4.2) * 10) / 10, // 4.2 - 5.0 as number
  profileImage: mockImages[i],
  modalities: ['online'],
  featured: i % 7 === 0,
}));

const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

export default function FindACoachPage() {
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("match");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [displayMode, setDisplayMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("coachDisplayMode") || "largeGrid";
    }
    return "largeGrid";
  });
  const [aiQuery, setAiQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiMatches, setAiMatches] = useState<any[] | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string>("");

  useEffect(() => {
    async function fetchOnlineCoaches() {
      setLoading(true);
      const q = query(collection(db, "professionals"), where("modalities", "array-contains", "online"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), isMock: false }));
      setProfessionals(data);
      setLoading(false);
    }
    fetchOnlineCoaches();
  }, []);

  useEffect(() => {
    localStorage.setItem("coachDisplayMode", displayMode);
  }, [displayMode]);

  // Get all unique specialties
  const allSpecialties = useMemo(() => {
    const set = new Set<string>();
    professionals.forEach((pro) => {
      (pro.specialties || []).forEach((spec: string) => set.add(spec));
    });
    return Array.from(set).sort();
  }, [professionals]);

  // Merge mock and live data if toggle is on
  let allProfessionals = professionals;
  if (useMockData) {
    allProfessionals = [...professionals, ...mockCoaches.map((c) => ({ ...c, isMock: true }))];
    // Deduplicate by id
    allProfessionals = Array.from(new Map(allProfessionals.map(pro => [pro.id, pro])).values());
  }

  const filteredProfessionals = useMemo(() => {
    let filtered = allProfessionals;
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      filtered = filtered.filter(
        (pro) =>
          pro.fullName?.toLowerCase().includes(s) ||
          (pro.specialties?.join(", ").toLowerCase().includes(s))
      );
    }
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter((pro) =>
        pro.specialties && selectedSpecialties.every((spec: string) => pro.specialties.includes(spec))
      );
    }
    if (minRating > 0) {
      filtered = filtered.filter((pro) => (typeof pro.rating === 'number' ? pro.rating : parseFloat(pro.rating)) >= minRating);
    }
    if (sort === "rating") {
      filtered = [...filtered].sort((a, b) => ((typeof b.rating === 'number' ? b.rating : parseFloat(b.rating)) || 0) - ((typeof a.rating === 'number' ? a.rating : parseFloat(a.rating)) || 0));
    } else if (sort === "newest") {
      filtered = [...filtered].sort((a, b) => {
        const aDate = a.createdAt ? new Date(a.createdAt as string).getTime() : 0;
        const bDate = b.createdAt ? new Date(b.createdAt as string).getTime() : 0;
        return bDate - aDate;
      });
    }
    return filtered;
  }, [allProfessionals, search, sort, selectedSpecialties, minRating]);

  // Handlers
  const handleSpecialtyChange = (spec: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  // Card mode prop: 'large', 'small', 'list'
  const cardMode = displayMode === "largeGrid" ? "large" : displayMode === "smallGrid" ? "small" : "list";

  // Grid classes
  const gridClass =
    displayMode === "largeGrid"
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      : displayMode === "smallGrid"
      ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      : "flex flex-col gap-4";

  // Choose which professionals to show
  const professionalsToShow = aiMatches !== null ? aiMatches : filteredProfessionals;

  const handleAiCoachMatch = async () => {
    setAiLoading(true);
    setAiError("");
    setAiExplanation("");
    setAiMatches(null);

    try {
      const response = await fetch("/api/ai-coach-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: aiQuery }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiMatches(data.matches);
        setAiExplanation(data.explanation);
      } else {
        setAiError("Failed to find a coach. Please try again later.");
      }
    } catch (error) {
      setAiError("An error occurred. Please try again later.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold mb-8 text-center">Find a Coach</h1>
      {/* Search, Sort, and Display Mode Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={aiMatches !== null}
        />
        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={aiMatches !== null}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {/* Display Mode Toggle */}
          <div className="flex items-center gap-1 ml-2">
            {displayModes.map((mode) => (
              <button
                key={mode.value}
                title={mode.label}
                onClick={() => setDisplayMode(mode.value)}
                className={`p-2 rounded-lg border transition-colors ${displayMode === mode.value ? "bg-blue-400 text-white border-blue-500" : "bg-white text-gray-500 border-gray-200 hover:bg-blue-100"}`}
                disabled={aiMatches !== null}
              >
                <mode.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full mb-6 md:mb-0 md:basis-1/5 md:max-w-xs">
          <div className="bg-white rounded-lg shadow p-4 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Filter Coaches</h2>
            {/* Specialties */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Specialties</label>
              <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2">
                {allSpecialties.length === 0 ? (
                  <span className="text-gray-400 text-sm">No specialties found</span>
                ) : (
                  allSpecialties.map((spec) => (
                    <label key={spec} className="inline-flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={selectedSpecialties.includes(spec)}
                        onChange={() => handleSpecialtyChange(spec)}
                        className="mr-2 accent-blue-500"
                        disabled={aiMatches !== null}
                      />
                      {spec}
                    </label>
                  ))
                )}
              </div>
            </div>
            {/* Rating */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Minimum Rating</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.5}
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full accent-yellow-500"
                  disabled={aiMatches !== null}
                />
                <span className="ml-2 text-sm font-semibold text-yellow-600">{minRating > 0 ? minRating : 'Any'}</span>
              </div>
            </div>
            {/* AI Coach Finder */}
            <div className="mb-2 mt-8 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-700 mb-2 text-sm">Find My Perfect Coach (AI)</h3>
              <textarea
                className="w-full p-2 border border-blue-200 rounded mb-2 text-sm"
                rows={3}
                placeholder="Describe your goals, needs, or preferences..."
                value={aiQuery}
                onChange={e => setAiQuery(e.target.value)}
                disabled={aiLoading || aiMatches !== null}
              />
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-sm font-semibold transition disabled:opacity-50"
                onClick={handleAiCoachMatch}
                disabled={aiLoading || !aiQuery.trim() || aiMatches !== null}
              >
                {aiLoading ? 'Finding your coach...' : 'Find My Coach'}
              </button>
              {aiMatches !== null && (
                <button
                  className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded text-xs font-semibold transition"
                  onClick={() => { setAiMatches(null); setAiExplanation(""); setAiQuery(""); }}
                >
                  Clear AI Results
                </button>
              )}
              {aiError && <div className="text-red-500 text-xs mt-2">{aiError}</div>}
            </div>
          </div>
        </aside>
        {/* Gallery/List Grid */}
        <main className="flex-1">
          <div className="px-1 sm:px-2 md:px-0">
            {aiExplanation && (
              <div className="mb-6 p-4 bg-blue-100 border-l-4 border-blue-400 rounded text-blue-900 font-medium">
                <span className="font-semibold">Why we chose these coaches:</span> {aiExplanation}
              </div>
            )}
            {loading ? (
              <div className="text-center text-gray-500">Loading online coaches...</div>
            ) : professionalsToShow.length === 0 ? (
              <div className="text-center text-gray-500">No online coaches found.</div>
            ) : (
              <div className={gridClass}>
                {professionalsToShow.map((pro) => (
                  <div key={pro.id} className="flex items-center">
                    <ProfessionalCard professional={pro} mode={cardMode} matchScore={pro.score} />
                    {pro.isMock && <span className="ml-2 px-2 py-1 bg-yellow-200 text-yellow-800 rounded text-xs font-bold">Demo</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 