import Hero from './components/Hero';
import FlashSale from './components/FlashSale';
import Features from './components/Features';
import CategoryGrid from './components/CategoryGrid';
import FeaturedProducts from './components/FeaturedProducts';
import FeaturedServices from './components/FeaturedServices';
import TopSelectedProducts from './components/TopSelectedProducts';
import BusinessInsights from './components/BusinessInsights';
import NewsTickerBanner from './components/NewsTickerBanner';
import FeaturedCoaches from './components/FeaturedCoaches';

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 pt-20">
        <NewsTickerBanner />
        <Hero />
        <FeaturedCoaches />
        <div className="space-y-24 py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <FlashSale />
          </div>
          
          <div className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <Features />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <CategoryGrid />
          </div>

          <div className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <FeaturedProducts />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <FeaturedServices />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <BusinessInsights />
          </div>
        </div>
      </main>
    </>
  );
} 