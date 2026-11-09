import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck,
  Tag, CheckCircle2, Truck, RefreshCw, AlertCircle
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import EmptyState from '../../components/common/EmptyState';
import Modal from '../../components/common/Modal';
import { MOCK_COUPONS } from '../../data/mockData';

export default function UserCart() {
  const navigate = useNavigate();
  const { cart, updateCartQty, removeFromCart, clearCart, addresses, addOrder } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || '');
  const [paymentMode, setPaymentMode] = useState('UPI');

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.qty, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'flat') {
      discountAmount = appliedCoupon.discount;
    } else {
      discountAmount = Math.round((subtotal * appliedCoupon.discount) / 100);
    }
  }

  const shipping = subtotal >= 2999 || subtotal === 0 ? 0 : 250;
  const taxes = Math.round(subtotal * 0.05); // 5% apparel GST
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping + taxes);

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    const found = MOCK_COUPONS.find((c) => c.code === code);
    if (found) {
      if (subtotal < found.min) {
        setCouponMessage(`Minimum order value of ₹${found.min} required for this coupon.`);
      } else {
        setAppliedCoupon(found);
        setCouponMessage(`Success: ${found.label} applied!`);
      }
    } else {
      setCouponMessage('Invalid promo voucher. Try THREADLINE10, SPRING25, or VIP500.');
    }
  };

  const handlePlaceOrder = () => {
    const targetAddr = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
    const newOrder = addOrder({
      amount: grandTotal,
      paymentMethod: paymentMode === 'UPI' ? 'UPI • Instant Settlement' : 'Visa / Mastercard ending 4092',
      items: cart.map((i) => ({
        product: i.product,
        size: i.size,
        color: i.color,
        qty: i.qty,
        price: i.product.price,
      })),
      shippingAddress: {
        name: targetAddr?.name || 'Customer',
        phone: targetAddr?.phone || '+91 98765 43210',
        address: `${targetAddr?.line1}, ${targetAddr?.city} - ${targetAddr?.pincode}`,
      },
      invoice: {
        subtotal,
        discount: discountAmount,
        taxGst: taxes,
        shipping,
        total: grandTotal,
      },
    });

    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setIsCheckoutOpen(false);
      setCheckoutSuccess(false);
      navigate('/orders');
    }, 2200);
  };

  if (cart.length === 0 && !checkoutSuccess) {
    return (
      <div className="py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your Shopping Bag is Empty"
          description="You haven't selected any garments for purchase yet. Browse our tailored seasonal arrivals."
          action={
            <Link to="/shop" className="btn-primary text-xs px-6 py-3 rounded-full uppercase tracking-wider font-bold">
              Shop Sartorial Ready-to-Wear <ArrowRight size={14} />
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24">
      <div className="border-b border-primary/8 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">
          Order Review
        </span>
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          Shopping Bag ({cart.reduce((a, b) => a + b.qty, 0)} Items)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Item Rows (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl border border-primary/10 overflow-hidden divide-y divide-primary/5 shadow-sm">
            {cart.map((item) => (
              <div key={item.key} className="p-5 flex gap-4 sm:gap-6 items-center">
                <img
                  src={item.product.images?.[0] || item.product.image}
                  alt={item.product.name}
                  onClick={() => navigate(`/product/${item.product.id}`)}
                  className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-2xl bg-[#EFEFED] cursor-pointer hover:scale-102 transition-transform flex-shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                        {item.product.brand}
                      </span>
                      <h3
                        onClick={() => navigate(`/product/${item.product.id}`)}
                        className="font-bold text-sm sm:text-base text-primary hover:text-accent cursor-pointer transition-colors truncate"
                      >
                        {item.product.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.key)}
                      className="p-1.5 text-primary/40 hover:text-red-500 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#F7F7F5] text-primary/70 font-semibold border border-primary/5">
                      Size: {item.size}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#F7F7F5] text-primary/70 font-semibold border border-primary/5">
                      Color: {item.color}
                    </span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    {/* Stepper */}
                    <div className="flex items-center border border-primary/20 rounded-xl bg-white overflow-hidden">
                      <button
                        onClick={() => updateCartQty(item.key, item.qty - 1)}
                        className="px-2.5 py-1 text-primary hover:bg-primary/5"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-xs font-bold text-primary">{item.qty}</span>
                      <button
                        onClick={() => updateCartQty(item.key, item.qty + 1)}
                        className="px-2.5 py-1 text-primary hover:bg-primary/5"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-extrabold text-sm sm:text-base text-primary">
                        ₹{(item.product.price * item.qty).toLocaleString('en-IN')}
                      </p>
                      {item.qty > 1 && (
                        <p className="text-[10px] text-primary/40">₹{item.product.price.toLocaleString('en-IN')} each</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs pt-1">
            <Link to="/shop" className="text-accent font-bold hover:underline">
              ← Continue Curating Wardrobe
            </Link>
            <button onClick={clearCart} className="text-red-500 hover:underline font-semibold">
              Clear All Items
            </button>
          </div>
        </div>

        {/* Order Price Breakdown & Checkout (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-primary/10 shadow-sm space-y-6">
            <h3 className="font-extrabold text-primary text-base">Summary of Charges</h3>

            {/* Voucher Application */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-primary/70 flex items-center gap-1.5">
                <Tag size={13} className="text-accent" /> Promotional Voucher
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. THREADLINE10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="input text-xs uppercase"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="btn-outline px-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p className={`text-[11px] font-semibold ${couponMessage.startsWith('Success') ? 'text-emerald-700' : 'text-red-500'}`}>
                  {couponMessage}
                </p>
              )}
            </div>

            {/* Pricing details */}
            <div className="space-y-3 text-xs border-t border-primary/8 pt-4">
              <div className="flex justify-between text-primary/70">
                <span>Subtotal ({cart.length} unique garments)</span>
                <span className="font-bold text-primary">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Promotional Discount</span>
                  <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-primary/70">
                <span>Express Courier Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-bold">Complimentary</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-primary/70">
                <span>Applicable GST (5%)</span>
                <span>₹{taxes.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between items-baseline text-base font-extrabold text-primary border-t border-primary/10 pt-4">
                <span>Estimated Total</span>
                <span className="text-2xl font-black text-primary">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="btn-accent w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-wider justify-center shadow-lg"
            >
              Proceed to Mock Checkout <ArrowRight size={15} />
            </button>

            <div className="pt-2 flex flex-col gap-2 text-[11px] text-primary/50 text-center">
              <p className="flex items-center justify-center gap-1.5 font-medium text-emerald-800">
                <ShieldCheck size={14} /> 256-Bit Bank-Grade Simulated Encryption
              </p>
              <p>Doorstep inspection & 10-day exchange available on all orders.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <Modal title="Simulated Checkout Experience" onClose={() => !checkoutSuccess && setIsCheckoutOpen(false)} size="md">
          {checkoutSuccess ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-extrabold text-primary">Order Confirmed!</h3>
              <p className="text-xs text-primary/60 max-w-sm mx-auto">
                Thank you, {addresses[0]?.name || 'Valued Patron'}. Your bespoke garment order is booked at the atelier. Redirecting to timeline tracking...
              </p>
            </div>
          ) : (
            <div className="space-y-5 text-xs">
              <div className="p-3.5 bg-accent/15 border border-accent/30 rounded-2xl text-accent-950 font-medium leading-relaxed">
                Frontend Sandbox Mode: Simulated checkout for demonstration. No payment gateway charges or credit card validations occur.
              </div>

              {/* Delivery Address Choice */}
              <div className="space-y-2">
                <label className="font-bold uppercase tracking-wider text-primary/70">
                  Select Delivery Address
                </label>
                <div className="space-y-2">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        selectedAddressId === addr.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-primary/10 hover:border-primary/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryAddr"
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                        className="mt-0.5 text-accent"
                      />
                      <div className="text-[11px] text-primary/80">
                        <p className="font-bold text-primary">{addr.name} ({addr.type})</p>
                        <p>{addr.line1}, {addr.city} - {addr.pincode}</p>
                        <p className="text-primary/50">Phone: {addr.phone}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Mode Selection */}
              <div className="space-y-2">
                <label className="font-bold uppercase tracking-wider text-primary/70">
                  Simulated Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label
                    onClick={() => setPaymentMode('UPI')}
                    className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer ${
                      paymentMode === 'UPI' ? 'border-primary bg-primary/5 font-bold text-primary' : 'border-primary/10 text-primary/70'
                    }`}
                  >
                    <input type="radio" checked={paymentMode === 'UPI'} readOnly className="text-accent" />
                    <span>UPI / QR Intent</span>
                  </label>
                  <label
                    onClick={() => setPaymentMode('Card')}
                    className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer ${
                      paymentMode === 'Card' ? 'border-primary bg-primary/5 font-bold text-primary' : 'border-primary/10 text-primary/70'
                    }`}
                  >
                    <input type="radio" checked={paymentMode === 'Card'} readOnly className="text-accent" />
                    <span>Credit / Debit Card</span>
                  </label>
                </div>
              </div>

              {/* Amount Due confirmation */}
              <div className="p-3.5 bg-[#F7F7F5] rounded-xl flex items-center justify-between font-bold text-sm text-primary">
                <span>Final Payable:</span>
                <span className="text-lg font-black">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="btn-outline text-xs px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="btn-primary text-xs px-6 py-2.5 font-bold uppercase tracking-wider"
                >
                  Authorize & Place Order
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
