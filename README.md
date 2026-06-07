# 🧦 SocksCo — Full Stack Ecommerce App

A modern, minimal ecommerce web application for a premium socks brand. Built with React, Tailwind CSS, Node.js (Express), and MongoDB.

---

## 📁 Folder Structure

```
socksco/
├── package.json              ← Root: scripts to run both servers together
│
├── backend/
│   ├── server.js             ← Express entry point
│   ├── package.json
│   ├── .env.example          ← Copy to .env and configure
│   ├── models/
│   │   ├── Product.js        ← Mongoose Product schema
│   │   └── Order.js          ← Mongoose Order schema
│   ├── routes/
│   │   ├── products.js       ← GET /api/products, GET /api/products/:id
│   │   └── orders.js         ← POST /api/orders, GET /api/orders/:id
│   └── data/
│       └── seed.js           ← 8 dummy products (auto-seeded on first run)
│
└── frontend/
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── public/
    │   └── index.html        ← Google Fonts loaded here
    └── src/
        ├── index.js          ← React entry point
        ├── index.css         ← Tailwind directives + custom utilities
        ├── App.jsx           ← Router + layout wrapper
        ├── context/
        │   └── CartContext.jsx   ← Global cart state (useReducer + localStorage)
        ├── data/
        │   └── products.js       ← Frontend fallback data (works without backend)
        ├── components/
        │   ├── layout/
        │   │   ├── Navbar.jsx    ← Fixed nav with cart counter + mobile menu
        │   │   └── Footer.jsx    ← Links + newsletter input
        │   └── ui/
        │       ├── ProductCard.jsx    ← Reusable card with hover + badge logic
        │       ├── Toast.jsx          ← "Added to cart" notification
        │       └── LoadingSpinner.jsx ← Centered loading state
        └── pages/
            ├── HomePage.jsx          ← Hero, categories, featured, CTA
            ├── ProductsPage.jsx      ← Grid + sidebar filters (category, gender, price)
            ├── ProductDetailPage.jsx ← Image gallery, size picker, add to cart
            ├── CartPage.jsx          ← Quantity controls, totals, promo field
            └── CheckoutPage.jsx      ← 2-step form (shipping → payment) + order confirm
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Option A — Run Backend + Frontend Together

```bash
# 1. Install all dependencies
cd socksco
npm install
npm run install:all

# 2. Set up backend environment
cd backend
cp .env.example .env
# Edit .env: set MONGODB_URI if using Atlas

# 3. Run both servers (from root)
cd ..
npm run dev
```

- **Frontend** → http://localhost:3000  
- **Backend API** → http://localhost:5000

### Option B — Run Separately

```bash
# Terminal 1: Backend
cd socksco/backend
npm install
cp .env.example .env
npm run dev       # uses nodemon for hot reload

# Terminal 2: Frontend
cd socksco/frontend
npm install
npm start
```

### No MongoDB? No Problem.

The app works fully without a database. Product data falls back to the local `frontend/src/data/products.js` file, and cart state is stored in `localStorage`. Orders just won't persist.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (supports `?category=crew&gender=women&maxPrice=30`) |
| GET | `/api/products/featured` | Get featured products only |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/orders` | Place an order |
| GET | `/api/orders/:id` | Get order by ID |
| GET | `/api/health` | Server health check |

---

## ✨ Features

- **Homepage** — Hero section, category grid, featured products, why-us section, promo CTA
- **Product Listing** — Filter by category, gender, and max price; sort by price/rating
- **Product Detail** — Multi-image gallery, size selector, add-to-cart with validation
- **Cart** — Persistent cart (localStorage), quantity controls, shipping calculation
- **Checkout** — 2-step form (shipping info → payment details), order confirmation screen
- **Responsive** — Mobile-first layout, hamburger menu, touch-friendly controls
- **Toast notifications** — "Added to cart" confirmations
- **Graceful fallback** — Works without backend using local dummy data

---

## 🎨 Design Decisions

- **Font**: Playfair Display (headings) + DM Sans (body) — editorial, refined
- **Palette**: Cream, sand, clay, espresso — warm and premium
- **Aesthetic**: Clean editorial minimalism with expressive typography
- **Animations**: CSS keyframes for fade-up, fade-in, slide-in effects

---

## 🔧 Next Steps (Suggested Additions)

- [ ] Authentication (JWT-based login/register)
- [ ] Payment integration (Razorpay / Stripe)
- [ ] Admin dashboard for product/order management
- [ ] Product reviews and ratings
- [ ] Wishlist feature
- [ ] Search functionality
- [ ] Email order confirmation (Nodemailer)
- [ ] Deploy: Frontend → Vercel, Backend → Railway/Render, DB → MongoDB Atlas
