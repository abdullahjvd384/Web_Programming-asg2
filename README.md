# Amazon.in Clone - Full Stack MERN Application

A full-stack Amazon.in clone built with React, Express.js, and MongoDB as a Web Programming assignment (22L-7500).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 (Vite), Tailwind CSS, Redux Toolkit, redux-persist |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT (jsonwebtoken + bcryptjs) |

## Features

### UI/UX & Dynamic Components
- Amazon-style navbar with location picker, search bar, account dropdown, and cart icon with badge
- Home page with auto-playing hero carousel and category tiles
- Product Listing Page with grid/list view toggle, sidebar filters (category, price, rating, Prime), and sort options
- Product Detail Page with image, pricing, ratings, and buy box
- Fully responsive design matching Amazon.in's color palette and typography

### Authentication & User Management
- JWT-based sign-up and sign-in
- Form validation (email format, password strength indicator)
- Protected routes - cart and profile require login
- Persistent auth state across page refreshes

### Search & Filtering
- Real-time search bar with 300ms debounce and suggestion dropdown
- Dynamic search results page (no full page reload)
- Client-side filtering by category, price range, customer rating, and Prime eligibility

### Cart Logic & CRUD Operations
- Add to Cart from Home Page, Product Listing, Product Detail, and Search Results
- Increase/decrease quantity with +/- controls
- Remove individual items or clear entire cart
- Real-time subtotal calculation (total price + item count)

### State Management & Persistence
- Redux Toolkit with 3 slices: auth, cart, products
- redux-persist syncs auth and cart state to localStorage
- Cart works for guest users (localStorage) and logged-in users (MongoDB)

### Backend & Database
- RESTful API endpoints for products, authentication, and cart management
- MongoDB collections: Users, Products, Carts
- Seed script with 31 products across 6 categories

## Project Structure

```
├── package.json                # Root monorepo scripts
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/         # Navbar, SearchBar, LocationPicker, AccountMenu, CartIcon
│   │   │   ├── Home/           # HeroCarousel, CategoryGrid, CategoryCard, ProductRow
│   │   │   ├── Product/        # ProductCard, ProductListItem, FilterSidebar, RatingStars
│   │   │   └── Cart/           # CartItem, QuantitySelector, CartSummary, EmptyCart
│   │   ├── pages/              # HomePage, ProductListingPage, ProductDetailPage,
│   │   │                       # SearchResultsPage, SignInPage, SignUpPage, CartPage
│   │   ├── store/slices/       # authSlice, cartSlice, productSlice
│   │   └── utils/              # api.js (Axios instance), validation.js
│   └── vite.config.js
│
└── server/                     # Express backend
    └── src/
        ├── models/             # User, Product, Cart (Mongoose schemas)
        ├── routes/             # auth, products, cart (REST endpoints)
        ├── middleware/         # JWT auth middleware
        ├── config/            # MongoDB connection
        ├── seed.js            # Database seeder (31 products)
        └── index.js           # Express app entry point
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
