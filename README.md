# Amazon.in Clone - Full Stack MERN Application

A full-stack Amazon.in clone built with React, Express.js, and MongoDB as a Web Programming assignment (22L-7500).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 (Vite), Tailwind CSS 3, Redux Toolkit, redux-persist, React Query |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT (jsonwebtoken + bcryptjs) |

## Features

### UI/UX & Dynamic Components
- Amazon-style sticky navbar with location picker, search bar, account dropdown, and cart icon with badge
- Home page with auto-playing hero carousel and category tiles
- Product Listing Page with grid/list view toggle, sidebar filters (category, rating, Prime), and sort options
- Product Detail Page with image, pricing, ratings, and buy box
- Responsive design matching Amazon.in's color palette and typography

### Authentication & User Management
- JWT-based sign-up and sign-in with real backend API
- Form validation (email format, password strength)
- Protected routes - cart requires login
- Persistent auth state across page refreshes

### Search & Filtering
- Real-time search bar with dynamic search results
- Search results page (no full page reload)
- Client-side filtering by category, customer rating, and Prime eligibility
- Sort by price, rating, relevance, and review count

### Cart Logic & CRUD Operations
- Add to Cart from Product Listing, Product Detail, and Search Results
- Increase/decrease quantity with +/- controls
- Remove individual items or clear entire cart
- Real-time subtotal calculation (total price + item count)

### State Management & Persistence
- Redux Toolkit with 2 slices: auth, cart
- redux-persist syncs auth and cart state to localStorage
- React Query for server-state management (products, search)

### Backend & Database
- RESTful API endpoints for products, authentication, and cart management
- MongoDB collections: Users, Products, Carts
- Seed script with 31 products across 6 categories

## Project Structure

```
├── package.json                  # Root monorepo scripts (dev, server, client, seed)
├── README.md
│
├── client/                       # React frontend (JSX)
│   ├── index.html
│   ├── vite.config.js            # Vite config with /api proxy to backend
│   ├── tailwind.config.js        # Amazon color palette
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx              # Entry point
│       ├── App.jsx               # Root component with providers & routing
│       ├── index.css             # Tailwind + Amazon CSS variables
│       ├── components/
│       │   ├── Navbar.jsx        # Sticky header with search, account, cart
│       │   ├── Footer.jsx        # Footer with links
│       │   ├── HeroCarousel.jsx  # Auto-rotating banner carousel
│       │   ├── CategoryTiles.jsx # Category grid on homepage
│       │   ├── DealStrip.jsx     # Product deal section
│       │   ├── ProductCard.jsx   # Product card (grid/list views)
│       │   └── ui/               # Minimal UI components (sonner, tooltip)
│       ├── pages/
│       │   ├── Index.jsx         # Home page
│       │   ├── ProductListing.jsx# Product catalog with filters
│       │   ├── ProductDetail.jsx # Single product page
│       │   ├── SearchResults.jsx # Search results
│       │   ├── Cart.jsx          # Shopping cart
│       │   ├── SignIn.jsx        # Login page
│       │   ├── SignUp.jsx        # Registration page
│       │   └── NotFound.jsx      # 404 page
│       ├── store/
│       │   ├── store.js          # Redux store + redux-persist
│       │   ├── authSlice.js      # Auth state (login/logout)
│       │   ├── cartSlice.js      # Cart state (add/remove/update)
│       │   └── hooks.js          # useAppDispatch, useAppSelector
│       ├── hooks/
│       │   └── use-products.js   # React Query hooks for product API
│       ├── lib/
│       │   ├── api.js            # Axios instance with JWT interceptor
│       │   └── utils.js          # cn() utility for Tailwind classes
│       └── data/
│           └── products.js       # Category & banner data
│
└── server/                       # Express backend
    ├── .env                      # Environment variables (not committed)
    ├── package.json
    └── src/
        ├── index.js              # Express app entry point
        ├── seed.js               # Database seeder (31 products)
        ├── config/
        │   └── db.js             # MongoDB connection
        ├── middleware/
        │   └── auth.js           # JWT auth middleware
        ├── models/
        │   ├── User.js           # User schema (bcrypt hashing)
        │   ├── Product.js        # Product schema
        │   └── Cart.js           # Cart schema
        └── routes/
            ├── auth.js           # Register, login, profile
            ├── products.js       # List, search, get by ID
            └── cart.js           # CRUD cart operations
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create new user |
| POST | `/api/auth/login` | No | Login and get JWT |
| GET | `/api/auth/profile` | Yes | Get user profile |
| GET | `/api/products` | No | List all products (optional `?category=`) |
| GET | `/api/products/search?q=` | No | Search products by title/category |
| GET | `/api/products/:id` | No | Get single product |
| GET | `/api/cart` | Yes | Get user's cart |
| POST | `/api/cart` | Yes | Add item to cart |
| PUT | `/api/cart/:itemId` | Yes | Update item quantity |
| DELETE | `/api/cart/:itemId` | Yes | Remove item from cart |
| DELETE | `/api/cart` | Yes | Clear entire cart |

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB running locally on port 27017

### Installation

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies
cd client && npm install && cd ..
```

### Environment Setup

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/amazon-clone
JWT_SECRET=your_secret_key_here
```

### Seed the Database

```bash
npm run seed
```

This populates MongoDB with 31 products across Electronics, Mobile Phones, Fashion, Home & Kitchen, Books, and Appliances.

### Run the Application

```bash
npm run dev
```

This starts both servers concurrently:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

## Product Categories

| Category | Products |
|----------|----------|
| Electronics | Headphones, Speakers, SSD, Mouse |
| Mobile Phones | Samsung, iPhone, OnePlus, Redmi, Realme |
| Fashion | Jeans, T-Shirts, Shoes, Watches, Sunglasses |
| Home & Kitchen | Mixer Grinder, Dinner Set, Gas Stove, LED Bulbs, Curtains |
| Books | Atomic Habits, Psychology of Money, Rich Dad Poor Dad, Ikigai |
| Appliances | Refrigerator, Washing Machine, Water Heater, Iron, Air Fryer, Vacuum |
