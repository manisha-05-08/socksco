import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ui/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { products as fallbackProducts } from '../data/products';

const CATEGORIES = ['all', 'ankle', 'crew', 'knee-high', 'no-show', 'compression'];
const GENDERS = ['all', 'men', 'women', 'unisex'];
const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Best Rated', value: 'rating' },
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const category = searchParams.get('category') || 'all';
  const gender = searchParams.get('gender') || 'all';
  const maxPrice = searchParams.get('maxPrice') || '100';
  const sort = searchParams.get('sort') || 'default';

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all' || !value) params.delete(key);
    else params.set(key, value);
    setSearchParams(params);
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category !== 'all') params.category = category;
        if (gender !== 'all') params.gender = gender;
        if (maxPrice) params.maxPrice = maxPrice;
        const res = await axios.get('/api/products', { params });
        setProducts(res.data);
      } catch {
        let data = [...fallbackProducts];
        if (category !== 'all') data = data.filter(p => p.category === category);
        if (gender !== 'all') data = data.filter(p => p.gender === gender || p.gender === 'unisex');
        if (maxPrice) data = data.filter(p => p.price <= Number(maxPrice));
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [category, gender, maxPrice]);

  const sorted = [...products].sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price;
    if (sort === 'price_desc') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return 0;
  });

  const FilterSection = ({ title, children }) => (
    <div className="border-b border-sand pb-5 mb-5">
      <h4 className="text-xs tracking-widest uppercase text-clay font-body mb-3">{title}</h4>
      {children}
    </div>
  );

  const FiltersPanel = () => (
    <div className="space-y-0">
      <FilterSection title="Category">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => updateFilter('category', cat)}
            className={`block w-full text-left text-sm py-1.5 font-body capitalize transition-colors
              ${category === cat ? 'text-espresso font-medium' : 'text-espresso/50 hover:text-espresso'}`}
          >
            {cat === 'all' ? 'All Categories' : cat.replace('-', ' ')}
          </button>
        ))}
      </FilterSection>

      <FilterSection title="Gender">
        {GENDERS.map(g => (
          <button
            key={g}
            onClick={() => updateFilter('gender', g)}
            className={`block w-full text-left text-sm py-1.5 font-body capitalize transition-colors
              ${gender === g ? 'text-espresso font-medium' : 'text-espresso/50 hover:text-espresso'}`}
          >
            {g === 'all' ? 'All Genders' : g}
          </button>
        ))}
      </FilterSection>

      <FilterSection title={`Max Price: $${maxPrice}`}>
        <input
          type="range"
          min="10"
          max="100"
          step="5"
          value={maxPrice}
          onChange={e => updateFilter('maxPrice', e.target.value)}
          className="w-full accent-clay"
        />
        <div className="flex justify-between text-xs text-stone font-body mt-1">
          <span>$10</span>
          <span>$100</span>
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-10">
          <p className="section-label">Our Collection</p>
          <h1 className="font-display text-5xl text-espresso">
            {category !== 'all' ? category.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'All Socks'}
          </h1>
        </div>

        <div className="flex gap-12">
          {/* Sidebar filters — desktop */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-28">
              <h3 className="font-display text-lg text-espresso mb-6">Filters</h3>
              <FiltersPanel />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-stone font-body">
                {loading ? '—' : `${sorted.length} product${sorted.length !== 1 ? 's' : ''}`}
              </p>
              <div className="flex items-center gap-4">
                {/* Mobile filter toggle */}
                <button
                  className="lg:hidden btn-secondary text-xs py-2 px-4"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  Filters
                </button>
                {/* Sort */}
                <select
                  value={sort}
                  onChange={e => updateFilter('sort', e.target.value)}
                  className="text-sm border border-sand bg-white px-3 py-2 font-body focus:outline-none focus:border-clay"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile filters */}
            {filtersOpen && (
              <div className="lg:hidden bg-white border border-sand p-6 mb-6 animate-fade-in">
                <FiltersPanel />
              </div>
            )}

            {/* Products grid */}
            {loading ? (
              <LoadingSpinner />
            ) : sorted.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-display text-3xl text-espresso mb-3">No products found</p>
                <p className="text-stone font-body mb-6">Try adjusting your filters</p>
                <button onClick={() => setSearchParams({})} className="btn-primary">Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sorted.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
