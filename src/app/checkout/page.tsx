"use client";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    // basic validation
    if (!form.checkValidity()) {
      showToast("Please fill all mandatory fields to place the order", "error");
      return;
    }

    showToast("Processing Payment & Placing Order...", "info");
    
    setTimeout(() => {
      clearCart();
      setShowConfirm(true);
    }, 1500);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 md:px-8 py-10 flex-grow bg-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm mr-3">1</span>
                      Contact Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-full md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                          <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" />
                      </div>
                      <div className="col-span-full md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                          <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" />
                      </div>
                      <div className="col-span-full">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                          <input type="email" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" />
                      </div>
                      <div className="col-span-full">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                          <input type="tel" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" />
                      </div>
                  </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm mr-3">2</span>
                      Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-full">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                          <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" />
                      </div>
                      <div className="col-span-full md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                          <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" />
                      </div>
                      <div className="col-span-full md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                          <select required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white">
                              <option value="">Select State</option>
                              <option>Maharashtra</option>
                              <option>Delhi</option>
                              <option>Karnataka</option>
                          </select>
                      </div>
                      <div className="col-span-full md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code *</label>
                          <input type="text" required pattern="[0-9]{6}" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" />
                      </div>
                  </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm mr-3">3</span>
                      Payment Method
                  </h2>
                  <div className="space-y-3">
                      <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                          <input type="radio" name="payment" className="text-primary focus:ring-primary h-4 w-4" defaultChecked />
                          <div className="ml-3 flex-1 flex justify-between items-center">
                              <span className="font-medium text-gray-900">Credit / Debit Card</span>
                              <div className="flex space-x-1">
                                  <i className="fab fa-cc-visa text-2xl text-blue-700"></i>
                                  <i className="fab fa-cc-mastercard text-2xl text-red-600"></i>
                              </div>
                          </div>
                      </label>
                      <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                          <input type="radio" name="payment" className="text-primary focus:ring-primary h-4 w-4" />
                          <div className="ml-3 flex-1 flex justify-between items-center">
                              <span className="font-medium text-gray-900">UPI (GPay, PhonePe, Paytm)</span>
                              <i className="fas fa-mobile-alt text-xl text-gray-500"></i>
                          </div>
                      </label>
                      <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                          <input type="radio" name="payment" className="text-primary focus:ring-primary h-4 w-4" />
                          <div className="ml-3 flex-1 flex justify-between items-center">
                              <span className="font-medium text-gray-900">Net Banking</span>
                              <i className="fas fa-university text-xl text-gray-500"></i>
                          </div>
                      </label>
                  </div>
              </div>

              <button type="submit" className="w-full text-center bg-primary hover:bg-red-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg transition duration-200 text-lg">
                  Pay ₹{subtotal.toLocaleString('en-IN')} & Place Order
              </button>
            </form>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-[#3e3e3e] text-white rounded-xl shadow-xl p-6 sticky top-24">
              <h2 className="font-bold text-lg mb-6 border-b border-white/10 pb-4">Order Summary ({totalItems} Items)</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 summary-items-list custom-scrollbar">
                {cart.length > 0 ? (
                  cart.map(item => (
                    <div key={`${item.id}-${item.color}`} className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <img src={item.image} className="w-12 h-12 object-contain bg-gray-50 rounded p-1 border border-gray-200 mr-3" />
                            <div>
                                <p className="font-medium text-gray-100 line-clamp-1 w-40 text-sm">{item.name}</p>
                                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                            </div>
                        </div>
                        <span className="font-medium text-sm">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">Your cart is empty.</p>
                )}
              </div>

              <div className="space-y-4 text-sm mb-6 border-y border-white/10 py-6 text-white/80">
                  <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="checkout-subtotal">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-400 font-semibold">Free</span>
                  </div>
              </div>
              
              <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-white checkout-total">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-[#231F20]/80 backdrop-blur-md flex items-center justify-center z-[99999] p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl transition-all duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 text-4xl">
                    <i className="fas fa-check-circle"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h3>
                <p className="text-sm text-gray-500 mb-6">Thank you for shopping with Primewood Industries Private Limited. Your delivery & assembly will be processed shortly.</p>
                <button onClick={() => router.push('/')} className="block w-full bg-primary hover:bg-red-700 text-white font-bold py-3 rounded-lg transition">
                  Back to Home
                </button>
            </div>
        </div>
      )}
    </>
  );
}
