import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { items, dispatch, subtotal, shipping, total, totalItems } = useCart();
  const navigate = useNavigate();

  const updateQty = (item, qty) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { _id: item._id, selectedSize: item.selectedSize, quantity: qty } });
  };

  const removeItem = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { _id: item._id, selectedSize: item.selectedSize } });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-24 flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto px-4">
          <div className="w-24 h-24 bg-sand rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
              />
            </svg>
          </div>
          <h2 className="font-display text-3xl text-espresso mb-3">Your cart is empty</h2>
          <p className="text-stone font-body mb-8">Looks like you haven't added anything yet. Let's fix that.</p>
          <Link to="/products" className="btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="section-label">Your Selection</p>
          <h1 className="font-display text-5xl text-espresso">
            Shopping Cart
            <span className="font-body text-lg text-stone ml-4 font-normal">({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item._id}-${item.selectedSize}`}
                className="bg-white p-6 flex gap-5 group animate-fade-in"
              >
                {/* Image */}
                <Link to={`/products/${item._id}`} className="flex-shrink-0">
                  <div className="w-24 h-24 overflow-hidden bg-sand">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link to={`/products/${item._id}`}>
                        <h3 className="font-display text-lg text-espresso hover:text-clay transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-stone font-body mt-1">Size: {item.selectedSize}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item)}
                      className="text-stone hover:text-espresso transition-colors flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-sand">
                      <button
                        onClick={() => updateQty(item, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center text-espresso hover:bg-sand transition-colors font-body"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-body font-medium text-espresso">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-espresso hover:bg-sand transition-colors font-body"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-body font-medium text-espresso">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue shopping */}
            <div className="pt-4">
              <Link to="/products" className="text-sm font-body text-clay hover:text-espresso transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 sticky top-28">
              <h2 className="font-display text-xl text-espresso mb-6">Order Summary</h2>

              <div className="space-y-3 text-sm font-body">
                <div className="flex justify-between text-espresso/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-espresso/70">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-sage font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-stone">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="border-t border-sand pt-3 flex justify-between font-medium text-espresso text-base">
                  <span>Total</span>
                  <span className="font-display text-xl">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo code */}
              <div className="mt-6 flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 input-field py-2 text-xs"
                />
                <button className="btn-secondary py-2 px-4 text-xs whitespace-nowrap">Apply</button>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn-primary w-full mt-6 py-4"
              >
                Proceed to Checkout
              </button>

              {/* Trust signals */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-stone font-body">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure, encrypted checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
