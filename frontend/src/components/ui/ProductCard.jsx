import React from 'react';
import { Link } from 'react-router-dom';

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          className={`w-3 h-3 ${star <= Math.round(rating) ? 'text-clay' : 'text-stone/30'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { _id, name, price, originalPrice, images, category, gender, rating, reviewCount, tags } = product;
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : null;

  return (
    <Link to={`/products/${_id}`} className="product-card block">
      {/* Image */}
      <div className="relative overflow-hidden bg-sand aspect-[4/5]">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {tags?.includes('bestseller') && (
            <span className="badge bg-espresso text-cream">Bestseller</span>
          )}
          {discount && (
            <span className="badge bg-clay text-cream">−{discount}%</span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/5 transition-colors duration-300" />

        {/* Quick view hint */}
        <div className="absolute bottom-0 left-0 right-0 bg-espresso text-cream text-center py-3 text-xs tracking-widest font-body
                        translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          VIEW PRODUCT
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-clay/80 font-body uppercase tracking-wider">{category}</span>
          <span className="text-stone">·</span>
          <span className="text-xs text-stone font-body capitalize">{gender}</span>
        </div>

        <h3 className="font-display text-base text-espresso mb-1 leading-snug">{name}</h3>

        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={rating} />
          <span className="text-xs text-stone">({reviewCount})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-body font-medium text-espresso">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-stone line-through font-body">${originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
