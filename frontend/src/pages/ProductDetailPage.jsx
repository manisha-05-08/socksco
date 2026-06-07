import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Toast from '../components/ui/Toast';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { products as fallbackProducts } from '../data/products';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImg, setSelectedImg] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch {
        const found = fallbackProducts.find(p => p._id === id);
        if (found) setProduct(found);
        else navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        selectedSize,
      },
    });
    setToast({ show: true, message: `${product.name} added to cart!`, type: 'success' });
  };

  if (loading) return <div className="pt-28"><LoadingSpinner /></div>;
  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const stars = Math.round(product.rating || 4.5);

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone font-body mb-10">
          <button onClick={() => navigate('/')} className="hover:text-espresso transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:text-espresso transition-colors">Shop</button>
          <span>/</span>
          <span className="text-espresso capitalize">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden bg-sand">
              <img
                src={product.images[selectedImg]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`w-20 h-20 overflow-hidden border-2 transition-all ${
                      selectedImg === i ? 'border-espresso' : 'border-transparent hover:border-stone'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {/* Category + badges */}
            <div className="flex items-center gap-3 mb-4">
              <span className="section-label mb-0">{product.category.replace('-', ' ')}</span>
              {product.tags?.includes('bestseller') && (
                <span className="badge bg-espresso text-cream">Bestseller</span>
              )}
              {discount && (
                <span className="badge bg-clay text-cream">−{discount}%</span>
              )}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl text-espresso mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className={`w-4 h-4 ${s <= stars ? 'text-clay' : 'text-stone/30'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-stone font-body">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-display text-3xl text-espresso">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-stone line-through font-body">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-espresso/70 font-body leading-relaxed mb-8">{product.description}</p>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="mb-6">
                <p className="section-label mb-3">Available Colors</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <span key={color} className="text-sm border border-sand px-3 py-1.5 font-body text-espresso/70">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="section-label mb-0">Select Size</p>
                <button className="text-xs text-clay font-body hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`w-14 h-14 text-sm font-body font-medium border-2 transition-all
                      ${selectedSize === size
                        ? 'border-espresso bg-espresso text-cream'
                        : sizeError
                          ? 'border-red-400 text-espresso hover:border-espresso'
                          : 'border-sand text-espresso hover:border-espresso'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="text-red-500 text-xs font-body mt-2">Please select a size to continue</p>
              )}
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="btn-primary w-full py-4 text-base mb-4"
            >
              Add to Cart — ${product.price.toFixed(2)}
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="btn-secondary w-full py-4 text-base"
            >
              View Cart
            </button>

            {/* Trust signals */}
            <div className="mt-8 pt-8 border-t border-sand grid grid-cols-3 gap-4">
              {[
                { icon: '🚚', label: 'Free shipping over $50' },
                { icon: '↩', label: '30-day free returns' },
                { icon: '🌿', label: 'Sustainably made' },
              ].map(item => (
                <div key={item.label} className="text-center">
                  <span className="text-xl block mb-1">{item.icon}</span>
                  <p className="text-xs text-stone font-body">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(t => ({ ...t, show: false }))}
      />
    </div>
  );
};

export default ProductDetailPage;
