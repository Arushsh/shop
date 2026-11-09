export const orders = [
  { id: 'ORD-2024-001', customer: 'Arjun Mehta', email: 'arjun.mehta@email.com', phone: '+91 98765 43210', date: '2024-11-08', items: [{ product: 'Premium Oxford Shirt', qty: 2, size: 'L', color: 'White', price: 2499 }, { product: 'Slim Fit Chino Pants', qty: 1, size: '32', color: 'Navy', price: 1899 }], amount: 6897, payment: 'Paid', paymentMethod: 'Credit Card', status: 'delivered', address: '14, MG Road, Bangalore 560001' },
  { id: 'ORD-2024-002', customer: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 87654 32109', date: '2024-11-08', items: [{ product: 'Linen Summer Kurta', qty: 3, size: 'M', color: 'White', price: 1299 }], amount: 3897, payment: 'Paid', paymentMethod: 'UPI', status: 'shipped', address: '22, Park Street, Mumbai 400001' },
  { id: 'ORD-2024-003', customer: 'Rahul Verma', email: 'rahul.verma@email.com', phone: '+91 76543 21098', date: '2024-11-07', items: [{ product: 'Wool Blend Blazer', qty: 1, size: '42', color: 'Navy', price: 7999 }], amount: 7999, payment: 'Paid', paymentMethod: 'Debit Card', status: 'processing', address: '8, Civil Lines, Delhi 110001' },
  { id: 'ORD-2024-004', customer: 'Anjali Singh', email: 'anjali.singh@email.com', phone: '+91 65432 10987', date: '2024-11-07', items: [{ product: 'Classic Polo T-Shirt', qty: 2, size: 'M', color: 'Black', price: 899 }, { product: 'Track Pants', qty: 1, size: 'M', color: 'Navy', price: 999 }], amount: 2797, payment: 'Pending', paymentMethod: 'COD', status: 'pending', address: '5, Anna Nagar, Chennai 600040' },
  { id: 'ORD-2024-005', customer: 'Vikram Patel', email: 'vikram.patel@email.com', phone: '+91 54321 09876', date: '2024-11-06', items: [{ product: 'Ethnic Nehru Jacket', qty: 1, size: 'L', color: 'Maroon', price: 2999 }, { product: 'Linen Summer Kurta', qty: 1, size: 'L', color: 'Beige', price: 1299 }], amount: 4298, payment: 'Paid', paymentMethod: 'UPI', status: 'delivered', address: '11, SG Highway, Ahmedabad 380015' },
  { id: 'ORD-2024-006', customer: 'Meera Nair', email: 'meera.nair@email.com', phone: '+91 43210 98765', date: '2024-11-06', items: [{ product: 'Casual Hoodie', qty: 1, size: 'M', color: 'Black', price: 1599 }], amount: 1599, payment: 'Paid', paymentMethod: 'Credit Card', status: 'shipped', address: '3, MG Road, Kochi 682011' },
  { id: 'ORD-2024-007', customer: 'Suresh Kumar', email: 'suresh.kumar@email.com', phone: '+91 32109 87654', date: '2024-11-05', items: [{ product: 'Denim Jacket', qty: 1, size: 'L', color: 'Dark Wash', price: 3499 }, { product: 'Printed Casual Shirt', qty: 2, size: 'L', color: 'Floral Blue', price: 1099 }], amount: 5697, payment: 'Paid', paymentMethod: 'UPI', status: 'delivered', address: '7, Banjara Hills, Hyderabad 500034' },
  { id: 'ORD-2024-008', customer: 'Deepa Krishnan', email: 'deepa.k@email.com', phone: '+91 21098 76543', date: '2024-11-05', items: [{ product: 'Formal Dress Shirt', qty: 2, size: 'M', color: 'White', price: 1799 }], amount: 3598, payment: 'Pending', paymentMethod: 'COD', status: 'pending', address: '19, RS Puram, Coimbatore 641002' },
  { id: 'ORD-2024-009', customer: 'Nikhil Joshi', email: 'nikhil.j@email.com', phone: '+91 90123 45678', date: '2024-11-04', items: [{ product: 'Jogger Pants', qty: 2, size: 'L', color: 'Black', price: 1199 }, { product: 'Classic Polo T-Shirt', qty: 3, size: 'M', color: 'Navy', price: 899 }], amount: 5095, payment: 'Paid', paymentMethod: 'Debit Card', status: 'processing', address: '25, FC Road, Pune 411004' },
  { id: 'ORD-2024-010', customer: 'Kavya Reddy', email: 'kavya.r@email.com', phone: '+91 89012 34567', date: '2024-11-03', items: [{ product: 'Slim Fit Chino Pants', qty: 1, size: '30', color: 'Black', price: 1899 }], amount: 1899, payment: 'Paid', paymentMethod: 'UPI', status: 'delivered', address: '12, Jubilee Hills, Hyderabad 500033' },
  { id: 'ORD-2024-011', customer: 'Arun Babu', email: 'arun.b@email.com', phone: '+91 78901 23456', date: '2024-11-03', items: [{ product: 'Casual Hoodie', qty: 2, size: 'XL', color: 'Charcoal', price: 1599 }, { product: 'Jogger Pants', qty: 1, size: 'XL', color: 'Grey', price: 1199 }], amount: 4397, payment: 'Paid', paymentMethod: 'Credit Card', status: 'shipped', address: '31, Velachery, Chennai 600042' },
  { id: 'ORD-2024-012', customer: 'Sonal Desai', email: 'sonal.d@email.com', phone: '+91 67890 12345', date: '2024-11-02', items: [{ product: 'Ethnic Nehru Jacket', qty: 1, size: 'M', color: 'Navy', price: 2999 }], amount: 2999, payment: 'Paid', paymentMethod: 'UPI', status: 'delivered', address: '6, Navrangpura, Ahmedabad 380009' },
];

export const userOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-11-08',
    items: [
      { product: 'Premium Oxford Shirt', qty: 2, size: 'L', color: 'White', price: 2499, image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=100&h=100&fit=crop' },
      { product: 'Slim Fit Chino Pants', qty: 1, size: '32', color: 'Navy', price: 1899, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=100&h=100&fit=crop' },
    ],
    amount: 6897,
    status: 'delivered',
    paymentMethod: 'Credit Card',
    address: '14, MG Road, Bangalore 560001',
    tracking: [
      { step: 'Order Placed', date: '08 Nov 2024, 10:30 AM', done: true },
      { step: 'Payment Confirmed', date: '08 Nov 2024, 10:32 AM', done: true },
      { step: 'Processing', date: '08 Nov 2024, 02:00 PM', done: true },
      { step: 'Shipped', date: '09 Nov 2024, 09:00 AM', done: true },
      { step: 'Out for Delivery', date: '10 Nov 2024, 08:00 AM', done: true },
      { step: 'Delivered', date: '10 Nov 2024, 01:15 PM', done: true },
    ],
  },
  {
    id: 'ORD-2024-005',
    date: '2024-11-06',
    items: [
      { product: 'Ethnic Nehru Jacket', qty: 1, size: 'L', color: 'Maroon', price: 2999, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop' },
      { product: 'Linen Summer Kurta', qty: 1, size: 'L', color: 'Beige', price: 1299, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=100&h=100&fit=crop' },
    ],
    amount: 4298,
    status: 'shipped',
    paymentMethod: 'UPI',
    address: '14, MG Road, Bangalore 560001',
    tracking: [
      { step: 'Order Placed', date: '06 Nov 2024, 03:15 PM', done: true },
      { step: 'Payment Confirmed', date: '06 Nov 2024, 03:17 PM', done: true },
      { step: 'Processing', date: '07 Nov 2024, 10:00 AM', done: true },
      { step: 'Shipped', date: '08 Nov 2024, 11:00 AM', done: true },
      { step: 'Out for Delivery', date: '10 Nov 2024', done: false },
      { step: 'Delivered', date: 'Expected: 10 Nov 2024', done: false },
    ],
  },
  {
    id: 'ORD-2024-009',
    date: '2024-11-04',
    items: [
      { product: 'Jogger Pants', qty: 2, size: 'L', color: 'Black', price: 1199, image: 'https://images.unsplash.com/photo-1517940310602-26535839fe84?w=100&h=100&fit=crop' },
    ],
    amount: 2398,
    status: 'processing',
    paymentMethod: 'Debit Card',
    address: '14, MG Road, Bangalore 560001',
    tracking: [
      { step: 'Order Placed', date: '04 Nov 2024, 07:00 PM', done: true },
      { step: 'Payment Confirmed', date: '04 Nov 2024, 07:02 PM', done: true },
      { step: 'Processing', date: '05 Nov 2024, 09:00 AM', done: true },
      { step: 'Shipped', date: 'Expected: 11 Nov 2024', done: false },
      { step: 'Out for Delivery', date: '', done: false },
      { step: 'Delivered', date: '', done: false },
    ],
  },
];

