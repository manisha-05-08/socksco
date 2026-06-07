import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        i => i._id === action.payload._id && i.selectedSize === action.payload.selectedSize
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i._id === action.payload._id && i.selectedSize === action.payload.selectedSize
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          i => !(i._id === action.payload._id && i.selectedSize === action.payload.selectedSize)
        ),
      };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            i => !(i._id === action.payload._id && i.selectedSize === action.payload.selectedSize)
          ),
        };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i._id === action.payload._id && i.selectedSize === action.payload.selectedSize
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const stored = localStorage.getItem('socksco-cart');
  const [state, dispatch] = useReducer(cartReducer, {
    items: stored ? JSON.parse(stored) : [],
  });

  useEffect(() => {
    localStorage.setItem('socksco-cart', JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider value={{ ...state, dispatch, totalItems, subtotal, shipping, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
