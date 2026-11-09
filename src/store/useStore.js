import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_PRODUCTS, MOCK_REVIEWS, MOCK_ORDERS } from '../data/mockData';

export const useStore = create(
  persist(
    (set, get) => ({
      // Products catalog
      products: MOCK_PRODUCTS,

      // Cart
      cart: [
        {
          key: 'TL-101-40 (M)-Crisp White',
          product: MOCK_PRODUCTS[0],
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
          cart: state.cart.map(item => item.key === key ? { ...item, qty } : item),
        }));
      },
      removeFromCart: (key) => {
        set(state => ({ cart: state.cart.filter(item => item.key !== key) }));
      },
      clearCart: () => set({ cart: [] }),

      // Wishlist
      wishlist: [MOCK_PRODUCTS[1], MOCK_PRODUCTS[6]],
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
      recentlyViewed: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[2]],
      addRecentlyViewed: (product) => {
        const { recentlyViewed } = get();
        const filtered = recentlyViewed.filter(p => p.id !== product.id);
        set({ recentlyViewed: [product, ...filtered].slice(0, 6) });
      },

      // Customer Profile
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

      // Delivery Addresses
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

      // Customer Reviews
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
          reviews: state.reviews.map(r => r.id === id ? { ...r, ...updated } : r),
        }));
      },
      deleteReview: (id) => {
        set(state => ({ reviews: state.reviews.filter(r => r.id !== id) }));
      },

      // Orders
      orders: MOCK_ORDERS,
      addOrder: (orderData) => {
        const newOrder = {
          ...orderData,
          id: `TL-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          status: 'Confirmed',
          timeline: [
            { step: 'Order Placed & Confirmed', date: 'Just Now', done: true },
            { step: 'Quality Checked & Packed at Atelier', date: 'Expected Today', done: false },
            { step: 'Dispatched via BlueDart Express', date: 'Expected Tomorrow', done: false },
            { step: 'Out for Courier Delivery', date: 'Pending', done: false },
            { step: 'Delivered to Customer', date: 'Pending', done: false },
          ],
        };
        set(state => ({ orders: [newOrder, ...state.orders] }));
        return newOrder;
      },
    }),
    {
      name: 'threadline-store-storage',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        profile: state.profile,
        addresses: state.addresses,
        reviews: state.reviews,
        orders: state.orders,
      }),
    }
  )
);
