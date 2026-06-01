import Link from "next/link";

export function Footer() {
  return (
    <>
      <section className="py-12 border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
                  <div className="py-4 md:py-0 px-4 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-red-50 text-primary flex items-center justify-center mb-4">
                          <i className="fas fa-truck text-2xl"></i>
                      </div>
                      <h3 className="font-bold text-gray-800 mb-1">Free Shipping</h3>
                      <p className="text-sm text-gray-500">On all orders above ₹5000</p>
                  </div>
                  <div className="py-4 md:py-0 px-4 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-red-50 text-primary flex items-center justify-center mb-4">
                          <i className="fas fa-tools text-2xl"></i>
                      </div>
                      <h3 className="font-bold text-gray-800 mb-1">Free Installation</h3>
                      <p className="text-sm text-gray-500">Expert assembly included</p>
                  </div>
                  <div className="py-4 md:py-0 px-4 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-red-50 text-primary flex items-center justify-center mb-4">
                          <i className="fas fa-shield-alt text-2xl"></i>
                      </div>
                      <h3 className="font-bold text-gray-800 mb-1">Up to 5 Year Warranty</h3>
                      <p className="text-sm text-gray-500">Peace of mind guaranteed</p>
                  </div>
                  <div className="py-4 md:py-0 px-4 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-red-50 text-primary flex items-center justify-center mb-4">
                          <i className="fas fa-undo text-2xl"></i>
                      </div>
                      <h3 className="font-bold text-gray-800 mb-1">Easy Returns</h3>
                      <p className="text-sm text-gray-500">14-day return policy</p>
                  </div>
              </div>
          </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-16 mt-auto">
          <div className="container mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                  <div className="lg:col-span-2">
                      <Link href="/" className="flex items-center space-x-2 mb-6">
                          <span className="text-3xl font-extrabold tracking-tight text-white">Primewood</span>
                      </Link>
                      <p className="text-gray-400 mb-6 text-sm leading-relaxed max-w-sm">Transforming spaces into beautiful homes and productive offices. Explore India's largest furniture brand with a legacy of trust and quality.</p>
                      <div className="flex space-x-4">
                          <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition"><i className="fab fa-facebook-f"></i></Link>
                          <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition"><i className="fab fa-twitter"></i></Link>
                          <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition"><i className="fab fa-instagram"></i></Link>
                          <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition"><i className="fab fa-youtube"></i></Link>
                      </div>
                  </div>
                  
                  <div>
                      <h4 className="text-white font-bold mb-6">Categories</h4>
                      <ul className="space-y-3 text-sm">
                          <li><Link href="/category" className="hover:text-primary transition">Living Room</Link></li>
                          <li><Link href="/category" className="hover:text-primary transition">Bedroom</Link></li>
                          <li><Link href="/category" className="hover:text-primary transition">Dining</Link></li>
                          <li><Link href="/category" className="hover:text-primary transition">Office & Study</Link></li>
                          <li><Link href="/category" className="hover:text-primary transition">Storage</Link></li>
                      </ul>
                  </div>
                  
                  <div>
                      <h4 className="text-white font-bold mb-6">Customer Service</h4>
                      <ul className="space-y-3 text-sm">
                          <li><Link href="#" className="hover:text-primary transition">Track Order</Link></li>
                          <li><Link href="#" className="hover:text-primary transition">Return Policy</Link></li>
                          <li><Link href="#" className="hover:text-primary transition">Warranty Information</Link></li>
                          <li><Link href="#" className="hover:text-primary transition">Store Locator</Link></li>
                          <li><Link href="#" className="hover:text-primary transition">Contact Us</Link></li>
                      </ul>
                  </div>
                  
                  <div>
                      <h4 className="text-white font-bold mb-6">Newsletter</h4>
                      <p className="text-sm text-gray-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                      <div className="flex">
                          <input type="email" placeholder="Enter your email" className="w-full bg-gray-800 border-none rounded-l-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary text-white text-sm" />
                          <button className="bg-primary hover:bg-red-700 text-white px-4 rounded-r-lg transition">
                              <i className="fas fa-paper-plane"></i>
                          </button>
                      </div>
                  </div>
              </div>
              
              <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                  <p>&copy; 2026 Primewood. All rights reserved.</p>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                      <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
                      <Link href="#" className="hover:text-white transition">Terms of Service</Link>
                  </div>
              </div>
          </div>
      </footer>
    </>
  );
}
