import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { products as fallbackProducts } from '../data/products';
import axios from 'axios';

const categories = [
  { label: 'Ankle', value: 'ankle', emoji: '🧦', desc: 'Classic everyday height' },
  { label: 'Crew', value: 'crew', emoji: '✦', desc: 'Mid-calf essential' },
  { label: 'Knee-High', value: 'knee-high', emoji: '◈', desc: 'Bold statement socks' },
  { label: 'No-Show', value: 'no-show', emoji: '○', desc: 'Invisible comfort' },
  { label: 'Compression', value: 'compression', emoji: '▲', desc: 'Support & recovery' },
];

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get('/api/products/featured');
        setFeatured(res.data.slice(0, 4));
      } catch {
        setFeatured(fallbackProducts.filter(p => p.featured).slice(0, 4));
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="min-h-screen bg-cream flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16">
            {/* Text */}
            <div className="animate-fade-up">
              <p className="section-label mb-6">New Collection 2024</p>
              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.9] text-espresso mb-8">
                Step into
                <br />
                <em className="text-clay not-italic">something</em>
                <br />
                beautiful.
              </h1>
              <p className="text-espresso/60 text-lg font-body leading-relaxed max-w-md mb-10">
                Premium socks crafted from the world's finest materials. Because what's closest to you should feel extraordinary.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary">
                  Shop All Socks
                </Link>
                <Link to="/products?featured=true" className="btn-secondary">
                  View Collection
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-12 mt-16 pt-8 border-t border-sand">
                {[
                  { val: '50k+', label: 'Happy Feet' },
                  { val: '4.8★', label: 'Avg Rating' },
                  { val: '100%', label: 'Cotton / Wool' },
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="font-display text-2xl text-espresso">{stat.val}</p>
                    <p className="text-xs text-stone tracking-wider font-body mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image grid */}
            <div className="relative hidden lg:grid grid-cols-2 gap-4 h-[600px]">
              <div className="col-span-1 space-y-4">
                <div className="h-64 overflow-hidden rounded-none bg-sand">
                  <img
                    src="https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=90"
                    alt="Socks hero"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-44 overflow-hidden bg-blush flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-display text-4xl text-espresso">Free</p>
                    <p className="text-sm font-body text-espresso/70">shipping over $50</p>
                  </div>
                </div>
              </div>
              <div className="col-span-1 mt-12 space-y-4">
                <div className="h-44 overflow-hidden bg-sky flex items-center justify-center">
                  <div className="text-center px-4">
                    <p className="font-display italic text-2xl text-espresso">"Socks that start conversations"</p>
                  </div>
                </div>
                <div className="h-64 overflow-hidden bg-sand">
                  <img
                    src="https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=800&q=90"
                    alt="Colorful socks"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-espresso py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-widest text-cream/40 uppercase font-body mb-2">Browse by Style</p>
              <h2 className="font-display text-4xl text-cream">Shop by Category</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <button
                key={cat.value}
                onClick={() => navigate(`/products?category=${cat.value}`)}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
                           p-6 text-left transition-all duration-200 hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-2xl block mb-3">{cat.emoji}</span>
                <p className="font-display text-lg text-cream">{cat.label}</p>
                <p className="text-xs text-cream/40 font-body mt-1">{cat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label">Handpicked for You</p>
              <h2 className="font-display text-4xl text-espresso">Featured Products</h2>
            </div>
            <Link to="/products" className="hidden sm:block text-sm font-body text-clay hover:text-espresso transition-colors tracking-wide">
              View All →
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="btn-secondary inline-block">
              Shop All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl text-espresso text-center mb-16">Why SocksCo?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '◈', title: 'Premium Materials', desc: 'Ethically sourced Merino wool, Egyptian cotton, and bamboo fibers.' },
              { icon: '✦', title: 'Thoughtful Design', desc: 'Every pair is tested for 90+ days before hitting the shelves.' },
              { icon: '▲', title: 'Free Returns', desc: '30-day hassle-free returns. If you don\'t love them, we\'ll fix it.' },
              { icon: '○', title: 'Sustainable', desc: 'Carbon-neutral shipping and plastic-free packaging.' },
            ].map(item => (
              <div key={item.title} className="text-center">
                <div className="w-14 h-14 bg-cream flex items-center justify-center mx-auto mb-4 text-xl text-clay">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg text-espresso mb-2">{item.title}</h3>
                <p className="text-sm text-espresso/60 font-body leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="relative overflow-hidden">
        <div className="h-80 bg-clay flex items-center justify-center text-center px-4">
          <div>
            <p className="section-label text-cream/60 mb-2">Limited Time</p>
            <h2 className="font-display text-5xl sm:text-6xl text-cream mb-6">
              Get 10% off<br /><em>your first order.</em>
            </h2>
            <Link to="/products" className="inline-block bg-cream text-espresso px-8 py-3 font-body font-medium text-sm tracking-wide hover:bg-blush transition-colors">
              SHOP NOW — USE CODE: SOCKSCO10
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
