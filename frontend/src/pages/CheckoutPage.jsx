import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const initialForm = {
  firstName: '', lastName: '', email: '',
  address: '', city: '', state: '', zip: '', country: 'India',
  cardNumber: '', expiry: '', cvv: '', cardName: '',
};

const CheckoutPage = () => {
  const { items, subtotal, shipping, total, dispatch } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1: info, 2: payment
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (items.length === 0 && !success) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(err => ({ ...err, [name]: '' }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.firstName) e.firstName = 'Required';
    if (!form.lastName) e.lastName = 'Required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.address) e.address = 'Required';
    if (!form.city) e.city = 'Required';
    if (!form.zip) e.zip = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.cardName) e.cardName = 'Required';
    if (!form.cardNumber || form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Valid card number required';
    if (!form.expiry || !/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'MM/YY format';
    if (!form.cvv || form.cvv.length < 3) e.cvv = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateStep2()) return;
    setPlacing(true);
    try {
      const payload = {
        items: items.map(i => ({
          product: i._id,
          name: i.name,
          price: i.price,
          size: i.selectedSize,
          quantity: i.quantity,
          image: i.image,
        })),
        subtotal, shipping, total,
        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: form.country,
        },
      };
      const res = await axios.post('/api/orders', payload);
      setOrderId(res.data.orderId || 'SC' + Date.now());
    } catch {
      setOrderId('SC' + Date.now()); // local fallback
    } finally {
      dispatch({ type: 'CLEAR_CART' });
      setSuccess(true);
      setPlacing(false);
    }
  };

  const FieldError = ({ name }) =>
    errors[name] ? <p className="text-red-500 text-xs mt-1 font-body">{errors[name]}</p> : null;

  if (success) {
    return (
      <div className="min-h-screen pt-28 pb-24 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4 animate-fade-up">
          <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-display text-4xl text-espresso mb-4">Order Placed! 🎉</h1>
          <p className="text-stone font-body mb-2">Thank you, {form.firstName}!</p>
          <p className="text-sm text-stone font-body mb-2">
            Confirmation sent to <strong className="text-espresso">{form.email}</strong>
          </p>
          {orderId && (
            <p className="text-xs text-stone font-body mb-8 bg-sand px-4 py-2 inline-block">
              Order ID: <strong>{String(orderId).slice(-8).toUpperCase()}</strong>
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
            <button onClick={() => navigate('/products')} className="btn-secondary">Shop More</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="section-label">Almost There</p>
          <h1 className="font-display text-5xl text-espresso">Checkout</h1>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-12">
          {['Shipping Info', 'Payment'].map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors
                  ${step > i + 1 ? 'bg-sage text-white' : step === i + 1 ? 'bg-espresso text-cream' : 'bg-sand text-stone'}`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className={`text-sm font-body ${step === i + 1 ? 'text-espresso font-medium' : 'text-stone'}`}>
                  {label}
                </span>
              </div>
              {i < 1 && <div className={`flex-1 h-px ${step > 1 ? 'bg-sage' : 'bg-sand'} transition-colors`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white p-8 animate-fade-in">
                <h2 className="font-display text-xl text-espresso mb-6">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="section-label block mb-1">First Name</label>
                    <input name="firstName" value={form.firstName} onChange={handleChange} className="input-field" />
                    <FieldError name="firstName" />
                  </div>
                  <div>
                    <label className="section-label block mb-1">Last Name</label>
                    <input name="lastName" value={form.lastName} onChange={handleChange} className="input-field" />
                    <FieldError name="lastName" />
                  </div>
                  <div className="col-span-2">
                    <label className="section-label block mb-1">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field" />
                    <FieldError name="email" />
                  </div>
                  <div className="col-span-2">
                    <label className="section-label block mb-1">Address</label>
                    <input name="address" value={form.address} onChange={handleChange} className="input-field" />
                    <FieldError name="address" />
                  </div>
                  <div>
                    <label className="section-label block mb-1">City</label>
                    <input name="city" value={form.city} onChange={handleChange} className="input-field" />
                    <FieldError name="city" />
                  </div>
                  <div>
                    <label className="section-label block mb-1">State</label>
                    <input name="state" value={form.state} onChange={handleChange} className="input-field" />
                  </div>
                  <div>
                    <label className="section-label block mb-1">ZIP Code</label>
                    <input name="zip" value={form.zip} onChange={handleChange} className="input-field" />
                    <FieldError name="zip" />
                  </div>
                  <div>
                    <label className="section-label block mb-1">Country</label>
                    <select name="country" value={form.country} onChange={handleChange} className="input-field">
                      {['India', 'United States', 'United Kingdom', 'Canada', 'Australia'].map(c => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button onClick={() => validateStep1() && setStep(2)} className="btn-primary w-full mt-8 py-4">
                  Continue to Payment →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white p-8 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl text-espresso">Payment Details</h2>
                  <button onClick={() => setStep(1)} className="text-xs text-clay font-body hover:text-espresso">← Edit Info</button>
                </div>

                <div className="bg-sand p-4 mb-6 text-xs font-body text-espresso/60">
                  🔒 This is a demo. No real payment is processed. Use any card number.
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="section-label block mb-1">Cardholder Name</label>
                    <input name="cardName" value={form.cardName} onChange={handleChange} placeholder="As on card" className="input-field" />
                    <FieldError name="cardName" />
                  </div>
                  <div>
                    <label className="section-label block mb-1">Card Number</label>
                    <input
                      name="cardNumber" value={form.cardNumber}
                      onChange={e => {
                        const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                        const spaced = v.replace(/(.{4})/g, '$1 ').trim();
                        setForm(f => ({ ...f, cardNumber: spaced }));
                      }}
                      placeholder="0000 0000 0000 0000" className="input-field" maxLength={19}
                    />
                    <FieldError name="cardNumber" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="section-label block mb-1">Expiry</label>
                      <input
                        name="expiry" value={form.expiry}
                        onChange={e => {
                          let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                          if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
                          setForm(f => ({ ...f, expiry: v }));
                        }}
                        placeholder="MM/YY" className="input-field" maxLength={5}
                      />
                      <FieldError name="expiry" />
                    </div>
                    <div>
                      <label className="section-label block mb-1">CVV</label>
                      <input
                        name="cvv" value={form.cvv}
                        onChange={e => setForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                        placeholder="•••" className="input-field" maxLength={4}
                      />
                      <FieldError name="cvv" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="btn-primary w-full mt-8 py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {placing ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sticky top-28">
              <h3 className="font-display text-lg text-espresso mb-5">Order Summary</h3>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-1 mb-5">
                {items.map(item => (
                  <div key={`${item._id}-${item.selectedSize}`} className="flex gap-3">
                    <div className="w-14 h-14 flex-shrink-0 overflow-hidden bg-sand">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body font-medium text-espresso truncate">{item.name}</p>
                      <p className="text-xs text-stone font-body">Size: {item.selectedSize} · Qty: {item.quantity}</p>
                      <p className="text-sm font-body text-espresso">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-sand pt-4 space-y-2 text-sm font-body">
                <div className="flex justify-between text-espresso/70">
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-espresso/70">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-sage' : ''}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-medium text-espresso border-t border-sand pt-2">
                  <span className="font-display">Total</span>
                  <span className="font-display text-lg">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
