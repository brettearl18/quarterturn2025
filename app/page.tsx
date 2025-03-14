import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        
        <div className="container mx-auto px-4 py-16">
          <CategoryGrid />
          <FeaturedProducts />
          
          {/* Seasonal Sale Banner */}
          <section className="relative h-[300px] mb-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-red-500 rounded-full opacity-75"></div>
              </div>
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="text-white">
                  <h2 className="text-4xl font-bold mb-4">SEASONAL SALE</h2>
                  <p className="text-2xl mb-6">UP TO 50% OFF</p>
                  <p className="text-lg mb-8">YOUR FAVORITE BRANDS TODAY AT UNBEATABLE PRICES</p>
                  <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">OUR SERVICES</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {['Quality', 'Support', 'Delivery', 'Returns', 'Warranty'].map((service) => (
                <div key={service} className="text-center">
                  <div className="bg-yellow-400 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-black rounded"></div>
                  </div>
                  <p className="font-semibold">{service}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Brands */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">FEATURED BRANDS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4'].map((brand) => (
                <div key={brand} className="bg-gray-900 aspect-square relative rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-gray-900 font-bold">{brand}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
} 