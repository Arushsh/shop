import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_PRODUCTS, MOCK_REVIEWS, MOCK_ORDERS, MOCK_CATEGORIES } from '../data/mockData';
import { customers as initialCustomers } from '../data/customers';

// Normalize product properties so both admin and storefront can access cleanly
const normalizedProducts = MOCK_PRODUCTS.map(p => ({
  ...p,
  image: p.images?.[0] || p.image || '',
  status: p.totalStock === 0 ? 'out-of-stock' : p.totalStock <= 10 ? 'low-stock' : 'active',
}));

// Normalize orders
const normalizedOrders = MOCK_ORDERS.map(o => ({
  ...o,
  customer: o.customer || o.shippingAddress?.name || 'Valued Customer',
  email: o.email || 'customer@threadline.com',
  phone: o.phone || o.shippingAddress?.phone || '+91 98765 43210',
  address: o.address || o.shippingAddress?.address || '',
  payment: o.payment || 'Paid',
  status: o.status ? o.status.toLowerCase() : 'delivered',
}));

export const useStore = create(
  persist(
    (set, get) => ({
      // Products catalog (shared between Admin & Customer)
      products: normalizedProducts,
      addProduct: (prod) => set(s => ({
        products: [
          {
            ...prod,
            image: prod.image || prod.images?.[0] || '',
            images: prod.images?.length > 0 ? prod.images : [prod.image],
            status: prod.status || (prod.totalStock === 0 ? 'out-of-stock' : prod.totalStock <= 10 ? 'low-stock' : 'active'),
          },
          ...s.products,
        ],
      })),
      updateProduct: (id, updates) => set(s => ({
        products: s.products.map(p => (p.id === id ? { ...p, ...updates } : p)),
      })),
      deleteProduct: (id) => set(s => ({
        products: s.products.filter(p => p.id !== id),
      })),

      // Categories (shared)
      categories: MOCK_CATEGORIES.map(c => ({
        ...c,
        productCount: c.count || 4,
        description: c.tag || 'Luxury garments and tailored fashion',
      })),
      addCategory: (cat) => set(s => ({ categories: [cat, ...s.categories] })),
      updateCategory: (id, updates) => set(s => ({
        categories: s.categories.map(c => (c.id === id ? { ...c, ...updates } : c)),
      })),
      deleteCategory: (id) => set(s => ({
        categories: s.categories.filter(c => c.id !== id),
      })),

      // Orders (shared)
      orders: normalizedOrders,
      updateOrderStatus: (id, status) => set(s => ({
        orders: s.orders.map(o => (o.id === id ? { ...o, status: status.toLowerCase() } : o)),
      })),
      addOrder: (orderData) => {
        const id = `TL-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
        const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        const newOrder = {
          ...orderData,
          id,
          date,
          customer: orderData.shippingAddress?.name || 'Arjun Mehta',
          email: 'arjun.mehta@threadline.com',
          phone: orderData.shippingAddress?.phone || '+91 98765 43210',
          address: orderData.shippingAddress?.address || '',
          payment: 'Paid',
          status: 'confirmed',
          timeline: [
            { step: 'Order Placed & Confirmed', date: 'Just Now', done: true },
            { step: 'Quality Checked & Packed at Atelier', date: 'Expected Today', done: false },
            { step: 'Dispatched via BlueDart Express', date: 'Expected Tomorrow', done: false },
            { step: 'Out for Courier Delivery', date: 'Pending', done: false },
            { step: 'Delivered to Customer', date: 'Pending', done: false },
          ],
        };
        set(s => ({ orders: [newOrder, ...s.orders] }));
        return newOrder;
      },

      // Customers (for Admin)
      customers: initialCustomers,

      // Admin Profile
      adminProfile: {
        name: 'Administrator',
        email: 'admin@threadline.com',
        phone: '+91 (80) 4123-8899',
        role: 'Master Administrator',
        avatar: 'AD',
        store: 'THREADLINE Atelier',
      },
      updateAdminProfile: (updates) => set(s => ({ adminProfile: { ...s.adminProfile, ...updates } })),

      // Admin & Store Settings
      settings: {
        storeName: 'THREADLINE Atelier',
        storeEmail: 'concierge@threadline.com',
        storePhone: '+91 (80) 4123-8899',
        currency: 'INR',
        theme: 'light',
        emailNotifications: true,
        orderAlerts: true,
        stockAlerts: true,
        marketingEmails: false,
      },
      updateSettings: (updates) => set(s => ({ settings: { ...s.settings, ...updates } })),

      // Cart (Storefront)
      cart: [
        {
          key: 'TL-101-40 (M)-Crisp White',
          product: normalizedProducts[0],
          size: '40 (M)',
          color: 'Crisp White',
          qty: 1,
        },
      ],
      addToCart: (product, size, color, qty = 1) => {
        const { cart } = get();
        const selectedSize = size || product.sizes?.[0] || 'M';
        const selectedColor = typeof color === 'object' ? color.name : (color || product.colors?.[0]?.name || 'Standard');
        const key = `${product.id}-${selectedSize}-${selectedColor}`;

        const existingIndex = cart.findIndex(item => item.key === key);
        if (existingIndex > -1) {
          const updated = [...cart];
          updated[existingIndex].qty += qty;
          set({ cart: updated });
        } else {
          set({ cart: [...cart, { key, product, size: selectedSize, color: selectedColor, qty }] });
        }
      },
      updateCartQty: (key, qty) => {
        if (qty <= 0) {
          get().removeFromCart(key);
          return;
        }
        set(state => ({
          cart: state.cart.map(item => (item.key === key ? { ...item, qty } : item)),
        }));
      },
      removeFromCart: (key) => {
        set(state => ({ cart: state.cart.filter(item => item.key !== key) }));
      },
      clearCart: () => set({ cart: [] }),

      // Wishlist (Storefront)
      wishlist: [normalizedProducts[1], normalizedProducts[6]],
      addToWishlist: (product) => {
        const { wishlist } = get();
        if (!wishlist.some(p => p.id === product.id)) {
          set({ wishlist: [...wishlist, product] });
        }
      },
      removeFromWishlist: (productId) => {
        set(state => ({ wishlist: state.wishlist.filter(p => p.id !== productId) }));
      },
      toggleWishlist: (product) => {
        const { wishlist } = get();
        if (wishlist.some(p => p.id === product.id)) {
          get().removeFromWishlist(product.id);
        } else {
          get().addToWishlist(product);
        }
      },

      // Recently viewed products
      recentlyViewed: [normalizedProducts[0], normalizedProducts[2]],
      addRecentlyViewed: (product) => {
        const { recentlyViewed } = get();
        const filtered = recentlyViewed.filter(p => p.id !== product.id);
        set({ recentlyViewed: [product, ...filtered].slice(0, 6) });
      },

      // Customer Profile (Storefront)
      profile: {
        name: 'Arjun Mehta',
        email: 'arjun.mehta@threadline.com',
        phone: '+91 98765 43210',
        gender: 'Male',
        dob: '1992-06-18',
        avatar: 'AM',
        membership: 'Atelier Platinum Member',
        loyaltyPoints: 1240,
      },
      updateProfile: (updated) => set(state => ({ profile: { ...state.profile, ...updated } })),

      // Delivery Addresses (Storefront)
      addresses: [
        {
          id: 'ADDR-01',
          type: 'Home',
          name: 'Arjun Mehta',
          phone: '+91 98765 43210',
          line1: 'Penthouse 14B, Skyview Residences',
          line2: '14, MG Road, Near Trinity Circle',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560001',
          isDefault: true,
        },
        {
          id: 'ADDR-02',
          type: 'Office',
          name: 'Arjun Mehta (HQ)',
          phone: '+91 98765 43210',
          line1: 'Level 8, Nexus Sovereign Towers',
          line2: 'Outer Ring Road, Bellandur',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560103',
          isDefault: false,
        },
      ],
      addAddress: (newAddr) => {
        const id = `ADDR-${Date.now()}`;
        set(state => {
          let list = [...state.addresses];
          if (newAddr.isDefault) {
            list = list.map(a => ({ ...a, isDefault: false }));
          }
          return { addresses: [...list, { ...newAddr, id }] };
        });
      },
      updateAddress: (id, updated) => {
        set(state => {
          let list = state.addresses.map(a => (a.id === id ? { ...a, ...updated } : a));
          if (updated.isDefault) {
            list = list.map(a => (a.id === id ? { ...a, isDefault: true } : { ...a, isDefault: false }));
          }
          return { addresses: list };
        });
      },
      deleteAddress: (id) => {
        set(state => ({ addresses: state.addresses.filter(a => a.id !== id) }));
      },
      setDefaultAddress: (id) => {
        set(state => ({
          addresses: state.addresses.map(a => ({ ...a, isDefault: a.id === id })),
        }));
      },

      // Customer Reviews (Storefront)
      reviews: MOCK_REVIEWS,
      addReview: (newReview) => {
        const rev = {
          ...newReview,
          id: `REV-${Date.now()}`,
          customerName: get().profile.name,
          customerAvatar: get().profile.avatar,
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          verified: true,
          helpfulCount: 0,
        };
        set(state => ({ reviews: [rev, ...state.reviews] }));
      },
      updateReview: (id, updated) => {
        set(state => ({
          reviews: state.reviews.map(r => (r.id === id ? { ...r, ...updated } : r)),
        }));
      },
      deleteReview: (id) => {
        set(state => ({ reviews: state.reviews.filter(r => r.id !== id) }));
      },
    }),
    {
      name: 'threadline-store-storage-v2',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        profile: state.profile,
        addresses: state.addresses,
        reviews: state.reviews,
        orders: state.orders,
        adminProfile: state.adminProfile,
        settings: state.settings,
      }),
    }
  )
);
