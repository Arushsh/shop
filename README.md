# THREADLINE — Luxury Fashion E-Commerce & Retail Dashboard

A modern, high-fashion garment store and retail management web application built with **React.js**, **Vite**, and **Tailwind CSS**.

Inspired by luxury editorial aesthetics (Zara, H&M Atelier, Myntra Luxe), THREADLINE features a customer-facing storefront and a back-office administration suite.

---

## 🌟 Key Features

### 🛍️ Customer Storefront (`/`)
- **Editorial Fashion Homepage**: Hero carousel, promotional vouchers (`THREADLINE10`, `SPRING25`), curated categories, new arrivals, trending styles, and patron testimonials.
- **Shop & Advanced Catalog (`/shop`)**: 
  - Responsive 2/3/4-column grid & list view.
  - Multi-filtering: Gender, Category, Price Range Slider, Brand Atelier, Size, Color Swatches, Fabric Weave, Rating, and In-Stock status.
  - Quick sorting: Recommended, Newest, Price, Popularity, and Highest Rated.
  - Active removable filter chips & load-more pagination.
- **Product Details (`/product/:id`)**:
  - Interactive image gallery with hover zoom & fullscreen modal preview.
  - Colorway & size selection with in-stock indicators.
  - PIN code delivery estimator (BlueDart).
  - Sizing guide modal (chest, shoulder, length specifications).
  - 4 tabs: Description, Specifications, Care guidelines, and Verified Reviews with helpful upvotes.
  - Related garments & "Complete the Look" recommendations.
- **Shopping Bag & Checkout (`/cart`)**: Quantity stepper controls, promo voucher redemption, tax/shipping computation, and simulated checkout flow.
- **Wishlist (`/wishlist`)**: Saved luxury styles with direct move-to-bag capability.
- **Order Tracking (`/orders`)**: Real-time milestone progress tracking and printable tax invoices with PDF download simulation.
- **Customer Portal**: Account profile (`/profile`), saved delivery addresses (`/addresses`), and garment reviews manager (`/reviews`).

---

### 🛡️ Admin Dashboard (`/admin`)
- **Executive Dashboard**: Revenue analytics, weekly order volume charts (Recharts), recent transactions, top-selling products, and live activity alerts.
- **Product Management (`/admin/products`)**: Table & grid view, search, category filters, and full Add/Edit/Delete modals with local state.
- **Categories (`/admin/categories`)**: Category cards with real-time product counts and CRUD modals.
- **Inventory Control (`/admin/inventory`)**: Low stock alerts, out-of-stock badges, and quantity stepper adjustments.
- **Orders (`/admin/orders`)**: Status filter tabs (Pending, Processing, Shipped, Delivered), inline status updates, and order detail modals.
- **Customer Intelligence (`/admin/customers`)**: Lifetime spend metrics, order frequency, and profile histories.
- **Analytics (`/admin/analytics`)**: YoY revenue graphs, category revenue share donut charts, and order pipeline statistics.
- **Store Settings & Admin Profile**: General store information, theme preferences, and notification triggers.

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React.js](https://react.dev/) + [Vite](https://vitejs.dev/) (Pure JavaScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts & Data Visualization**: [Recharts](https://recharts.org/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with LocalStorage persistence

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Arushsh/shop.git
cd shop
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## 🎨 Color Palette
- **Primary Navy**: `#172B3A`
- **Warm Gold Accent**: `#C49A6C`
- **Luxury Canvas**: `#F7F7F5`
- **Surface Cards**: `#FFFFFF`

