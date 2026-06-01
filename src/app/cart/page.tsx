"use client";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cart, updateQuantity, removeItem } = useCart();
  const [showExitModal, setShowExitModal] = useState(false);
  const router = useRouter();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  let subtotal = 0;
  let originalTotal = 0;
  
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    originalTotal += (item.originalPrice || item.price) * item.quantity;
  });

  const discount = originalTotal - subtotal;

  const proceedToCheckout = () => {
    setShowExitModal(true);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 md:px-8 py-10 flex-grow bg-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-2/3 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            {cart.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-xl border border-gray-100">
                  <i className="fas fa-shopping-basket text-6xl text-gray-300 mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h3>
                  <p className="text-gray-500 mb-6">Browse our wide catalog of gorgeous furniture and items!</p>
                  <Link href="/" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-lg shadow-md hover:bg-red-700 transition">Start Shopping</Link>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <span className="font-bold text-gray-700">{totalItems} Items in your Cart</span>
                </div>
                {cart.map((item, index) => (
                  <div key={`${item.id}-${item.color}`} className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-6 items-center sm:items-start last:border-b-0">
                      <div className="w-28 h-28 bg-gray-50 rounded-lg p-2 border border-gray-100 flex items-center justify-center flex-shrink-0">
                          <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 flex flex-col sm:flex-row justify-between w-full">
                          <div>
                              <h3 className="font-bold text-gray-800 leading-snug mb-1">{item.name}</h3>
                              <p className="text-xs text-gray-400 mb-4 font-medium">Color Family: {item.color}</p>
                              <div className="flex items-center border border-gray-300 rounded w-24 justify-between h-8 bg-white">
                                  <button onClick={() => updateQuantity(index, -1)} className="px-2 text-gray-500 hover:text-primary"><i className="fas fa-minus text-[10px]"></i></button>
                                  <span className="text-sm font-semibold">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(index, 1)} className="px-2 text-gray-500 hover:text-primary"><i className="fas fa-plus text-[10px]"></i></button>
                              </div>
                          </div>
                          <div className="text-right mt-4 sm:mt-0 flex flex-col justify-between items-end">
                              <div>
                                  <div className="text-lg font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                                  {item.originalPrice && <div className="text-xs text-gray-400 line-through">₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}</div>}
                              </div>
                              <button onClick={() => removeItem(index)} className="text-xs text-red-500 font-medium hover:underline flex items-center mt-3"><i className="far fa-trash-alt mr-1"></i> Remove</button>
                          </div>
                      </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="w-full lg:w-1/3">
            {cart.length > 0 ? (
              <div className="bg-[#3e3e3e] text-white rounded-xl shadow-xl p-6 sticky top-24">
                  <h2 className="font-bold text-lg mb-6 border-b border-white/10 pb-4">Order Summary</h2>
                  
                  <div className="space-y-4 text-sm mb-6 border-b border-white/10 pb-6 text-white/80">
                      <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>₹{originalTotal.toLocaleString('en-IN')}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-400">
                            <span>Discount</span>
                            <span>-₹{discount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                          <span>Shipping</span>
                          <span className="text-green-400 font-semibold">Free</span>
                      </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                      <span className="font-bold text-lg">Total Amount</span>
                      <span className="font-bold text-2xl text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  <button onClick={proceedToCheckout} className="w-full text-center bg-primary hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-lg shadow-lg transition duration-200 mb-4 block">
                      Proceed to Checkout
                  </button>
                  
                  <Link href="/" className="block w-full text-center text-sm font-medium text-white/60 hover:text-white">Continue Shopping</Link>
              </div>
            ) : (
              <div className="bg-[#3e3e3e] text-white rounded-xl p-6 opacity-60 pointer-events-none">
                  <h2 className="font-bold text-lg mb-6">Order Summary</h2>
                  <p className="text-sm">Please add items to your cart to proceed.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {/* Exit Intent Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-[#231F20]/80 backdrop-blur-sm flex items-center justify-center z-[99999] p-4 transition-all duration-300">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl scale-100 opacity-100">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5 text-primary text-3xl">
                    <i className="fas fa-lock"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Payment Gateway</h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">Do you want to complete the purchase before you leave? Rest assured, your payment and data is 100% encrypted.</p>
                <div className="flex gap-4">
                    <button onClick={() => setShowExitModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-lg transition">Continue</button>
                    <button onClick={() => router.push('/checkout')} className="flex-1 bg-primary hover:bg-red-700 text-white font-bold py-3 rounded-lg text-center transition block">Checkout</button>
                </div>
            </div>
        </div>
      )}
    </>
  );
}
