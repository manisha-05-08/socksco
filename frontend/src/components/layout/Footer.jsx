import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-espresso text-cream/80 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl text-cream mb-4">
              Socks<span className="text-blush">Co</span>
            </h3>
            <p className="text-sm leading-relaxed text-cream/60">
              Premium socks crafted for comfort, built for life. From morning runs to evening unwind.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-cream/40 mb-4 font-body">Shop</h4>
            <ul className="space-y-2 text-sm">
              {['All Products', "Men's", "Women's", 'New Arrivals', 'Sale'].map(item => (
                <li key={item}>
                  <Link to="/products" className="hover:text-cream transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-cream/40 mb-4 font-body">Help</h4>
            <ul className="space-y-2 text-sm">
              {['Sizing Guide', 'Shipping & Returns', 'FAQ', 'Contact Us', 'Track Order'].map(item => (
                <li key={item}>
                  <span className="hover:text-cream transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-cream/40 mb-4 font-body">Stay in the loop</h4>
            <p className="text-sm text-cream/60 mb-4">Get 10% off your first order + early access to new drops.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/10 text-cream placeholder-cream/30 text-sm px-3 py-2 border border-white/20 focus:outline-none focus:border-cream/60"
              />
              <button className="bg-clay text-cream px-4 py-2 text-sm font-medium hover:bg-blush hover:text-espresso transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/40">© 2024 SocksCo. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-cream/40">
            <span className="hover:text-cream/80 cursor-pointer">Privacy</span>
            <span className="hover:text-cream/80 cursor-pointer">Terms</span>
            <span className="hover:text-cream/80 cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
