'use client';

export default function Hero() {
  return (
    <div className="relative h-[600px] w-full bg-gray-900">
      {/* Red Circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 bg-red-600 rounded-full opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl font-bold mb-4">
            STRENGTH IN
            <br />
            EVERY <span className="text-yellow-400">QUARTER TURN</span>
          </h1>
          <p className="text-xl mb-8">
            Premium fitness equipment, expert guidance, and everything you need to build your strength journey.
          </p>
          <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
            Explore Equipment
          </button>
        </div>
      </div>
    </div>
  );
} 