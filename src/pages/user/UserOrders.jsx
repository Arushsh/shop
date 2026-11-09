import { useState } from 'react';
import {
  Package, CheckCircle, Clock, Truck, ChevronRight, Eye,
  FileText, ShieldCheck, Download, Printer, ArrowRight
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';

export default function UserOrders() {
  const { orders } = useStore();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  return (
    <div className="space-y-8 pb-20">
      <div className="border-b border-primary/8 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">
          Purchase History
        </span>
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          My Orders & Shipments
        </h1>
        <p className="text-xs text-primary/50 mt-1">
          Monitor order preparation, air cargo logistics, and download tax invoices
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-primary/10 shadow-sm space-y-6 hover:shadow-card-hover transition-all"
          >
            {/* Order meta bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-primary/8 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-extrabold text-base text-primary">
                    {order.id}
                  </span>
                  <Badge status={order.status === 'Delivered' ? 'delivered' : order.status === 'In Transit' ? 'shipped' : 'processing'} />
                </div>
                <p className="text-xs text-primary/50">
                  Booked on {order.date} • Settled via {order.paymentMethod}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[11px] text-primary/40 block">Order Total</span>
                  <strong className="text-base font-extrabold text-primary">
                    ₹{order.amount.toLocaleString('en-IN')}
                  </strong>
                </div>

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="btn-outline text-xs px-4 py-2 font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5"
                >
                  <Eye size={14} /> Tracking
                </button>

                <button
                  onClick={() => setInvoiceOrder(order)}
                  className="p-2 rounded-xl border border-primary/15 text-primary/70 hover:text-primary hover:bg-primary/5"
                  title="Tax Invoice"
                >
                  <FileText size={16} />
                </button>
              </div>
            </div>

            {/* Item Thumbnails */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#F7F7F5] border border-primary/5">
                  <img
                    src={item.product?.images?.[0] || item.product?.image || 'https://via.placeholder.com/80'}
                    alt={item.product?.name || 'Garment'}
                    className="w-16 h-20 object-cover rounded-xl bg-white flex-shrink-0"
                  />
                  <div className="min-w-0 space-y-0.5">
                    <p className="font-bold text-xs text-primary truncate">{item.product?.name}</p>
                    <p className="text-[11px] text-primary/50">Size: {item.size} • Qty: {item.qty}</p>
                    <p className="text-xs font-extrabold text-primary">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick status bar */}
            <div className="flex items-center justify-between text-xs text-primary/60 pt-2 border-t border-primary/5">
              <span className="truncate">Delivering to: {order.shippingAddress?.address}</span>
              <span className="text-accent font-bold cursor-pointer hover:underline flex items-center gap-1 flex-shrink-0" onClick={() => setSelectedOrder(order)}>
                Full Timeline <ChevronRight size={13} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* TRACKING TIMELINE MODAL */}
      {selectedOrder && (
        <Modal title={`Shipment Timeline — ${selectedOrder.id}`} onClose={() => setSelectedOrder(null)} size="md">
          <div className="space-y-6 text-xs">
            <div className="p-4 rounded-2xl bg-[#F7F7F5] flex justify-between items-center">
              <div>
                <span className="text-primary/50 block text-[10px] uppercase font-bold tracking-wider">Current Logistics Status</span>
                <span className="font-extrabold text-sm text-primary">{selectedOrder.status}</span>
              </div>
              <div className="text-right">
                <span className="text-primary/50 block text-[10px] uppercase font-bold tracking-wider">Invoice Total</span>
                <span className="font-black text-sm text-primary">₹{selectedOrder.amount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Milestones */}
            <div className="space-y-4 px-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-primary/50">
                Milestone Progress
              </h4>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-primary/10">
                {selectedOrder.timeline.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <span
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        step.done
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                          : 'bg-primary/20 text-white ring-4 ring-primary/5'
                      }`}
                    >
                      {step.done ? <CheckCircle size={12} /> : idx + 1}
                    </span>
                    <div>
                      <p className={`font-bold ${step.done ? 'text-primary' : 'text-primary/40'}`}>
                        {step.step}
                      </p>
                      {step.date && (
                        <p className="text-[11px] text-primary/50 mt-0.5">{step.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="p-3.5 rounded-xl border border-primary/10 space-y-1">
              <p className="font-bold text-primary">Consignee Shipping Address</p>
              <p className="text-primary/70">{selectedOrder.shippingAddress?.name}</p>
              <p className="text-primary/70">{selectedOrder.shippingAddress?.address}</p>
              <p className="text-primary/50">Contact: {selectedOrder.shippingAddress?.phone}</p>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setSelectedOrder(null)} className="btn-outline text-xs">Close</button>
            </div>
          </div>
        </Modal>
      )}

      {/* MOCK INVOICE PREVIEW MODAL */}
      {invoiceOrder && (
        <Modal title={`Tax Invoice #${invoiceOrder.id}`} onClose={() => setInvoiceOrder(null)} size="lg">
          <div className="p-6 bg-white space-y-6 text-xs text-primary border border-primary/10 rounded-2xl">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-primary/10 pb-4">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight">THREADLINE ATELIER</h2>
                <p className="text-[11px] text-primary/50">Luxury Garment Retailing & Sartorial Studio</p>
                <p className="text-[10px] text-primary/40 mt-1">GSTIN: 29AAACT9812M1Z5 • Registered in India</p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold block text-sm">INVOICE #{invoiceOrder.id}</span>
                <span className="text-primary/50">Date: {invoiceOrder.date}</span>
              </div>
            </div>

            {/* Billed To */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-primary/40 block">Billed To (Customer):</span>
                <p className="font-bold text-primary mt-1">{invoiceOrder.shippingAddress?.name}</p>
                <p className="text-primary/70">{invoiceOrder.shippingAddress?.address}</p>
                <p className="text-primary/50">{invoiceOrder.shippingAddress?.phone}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-primary/40 block">Payment Mode:</span>
                <p className="font-bold text-primary mt-1">{invoiceOrder.paymentMethod}</p>
                <p className="text-emerald-700 font-semibold">Payment Status: Confirmed & Paid</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-primary/10 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#F7F7F5] border-b border-primary/10 text-[11px] font-bold text-primary/70">
                  <tr>
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5">Size / Color</th>
                    <th className="p-2.5 text-center">Qty</th>
                    <th className="p-2.5 text-right">Unit Price</th>
                    <th className="p-2.5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5 text-xs">
                  {invoiceOrder.items.map((it, i) => (
                    <tr key={i}>
                      <td className="p-2.5 font-bold">{it.product?.name}</td>
                      <td className="p-2.5 text-primary/60">{it.size} / {it.color}</td>
                      <td className="p-2.5 text-center">{it.qty}</td>
                      <td className="p-2.5 text-right">₹{it.price.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-right font-bold">₹{(it.price * it.qty).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Invoice Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-1.5 text-xs">
                <div className="flex justify-between text-primary/70">
                  <span>Subtotal:</span>
                  <span>₹{invoiceOrder.invoice?.subtotal || invoiceOrder.amount}</span>
                </div>
                <div className="flex justify-between text-primary/70">
                  <span>Applicable GST:</span>
                  <span>₹{invoiceOrder.invoice?.taxGst || 0}</span>
                </div>
                <div className="flex justify-between text-primary/70">
                  <span>Shipping:</span>
                  <span className="text-emerald-700">Free</span>
                </div>
                <div className="flex justify-between font-black text-sm text-primary border-t border-primary/10 pt-2">
                  <span>Total Paid:</span>
                  <span>₹{invoiceOrder.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-primary/10 text-xs">
              <span className="text-[11px] text-primary/40 italic">This is an authentic computer-generated receipt.</span>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print?.()}
                  className="btn-outline px-4 py-1.5 text-xs flex items-center gap-1.5"
                >
                  <Printer size={13} /> Print
                </button>
                <button
                  onClick={() => alert('Simulated invoice download as PDF complete.')}
                  className="btn-primary px-4 py-1.5 text-xs flex items-center gap-1.5"
                >
                  <Download size={13} /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
