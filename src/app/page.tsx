"use client";
import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { defaultProducts } from "@/data/products";

export default function Home() {
  const [activeCuratedTab, setActiveCuratedTab] = useState("sofas");

  // Filter products by category for Curated section (sofas, beds, dining)
  const curatedProducts = defaultProducts.filter((p) => {
    if (activeCuratedTab === "sofas") {
      return p.category === "sofas";
    }
    if (activeCuratedTab === "beds") {
      return p.category === "beds";
    }
    if (activeCuratedTab === "dining") {
      return p.category === "dining";
    }
    return false;
  });

  // Products for the "Just arrived" section (first 4 items with prices)
  const justArrivedProducts = defaultProducts.slice(0, 4);

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gray-50 h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero.png" alt="Modern Living Room" className="w-full h-full object-cover object-center filter brightness-[0.85]" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-xl bg-white/90 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-xl transform transition hover:scale-[1.02] duration-300">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">New Collection</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">Elevate Your Living Space</h1>
            <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">Discover our premium range of intelligently designed furniture for homes and offices that blend comfort with modern aesthetics.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="#just-arrived" className="bg-primary hover:bg-red-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition shadow-lg shadow-red-500/30 text-center">Shop Now</Link>
              <Link href="/category" className="bg-transparent border border-gray-300 hover:border-gray-800 text-gray-800 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition text-center">Explore Stores</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl font-bold text-center mb-10 text-secondary">Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { icon: "fa-couch", name: "Sofas", type: "sofas" },
              { icon: "fa-bed", name: "Beds", type: "beds" },
              { icon: "fa-utensils", name: "Dining", type: "dining-sets" },
              { icon: "fa-door-closed", name: "Wardrobes", type: "almirahs" },
              { icon: "fa-laptop-house", name: "Study Desks", type: "office-tables" },
              { icon: "fa-shield-alt", name: "Lockers", type: "lockers" },
            ].map((cat, i) => (
              <Link key={i} href={`/category?type=${cat.type}`} className="group flex flex-col items-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-lightbg flex items-center justify-center mb-4 overflow-hidden border border-gray-100 group-hover:border-primary transition duration-300 group-hover:shadow-md">
                  <i className={`fas ${cat.icon} text-2xl sm:text-4xl text-gray-400 group-hover:text-primary transition duration-300 transform group-hover:scale-110`}></i>
                </div>
                <span className="font-medium text-gray-700 group-hover:text-primary transition">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Just Arrived Section (with Price and Add to Cart) */}
      <section id="just-arrived" className="py-16 bg-lightbg">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-secondary">Just arrived</h2>
            </div>
            <Link href="/category" className="text-primary font-medium hover:underline hidden sm:flex items-center gap-1.5 pb-1 border-b border-primary/20">
              view all products <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {justArrivedProducts.map((p) => (
              <ProductCard key={p.id} product={p} showPrice={false} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/category" className="inline-block bg-white border border-gray-300 text-gray-800 px-6 py-2 rounded-full font-medium">view all products</Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="h-[2px] bg-gray-100 relative">
          <div className="absolute left-1/4 w-32 h-[3px] bg-primary -top-[0.5px]"></div>
        </div>
      </div>

      {/* Moments That Matter (Video Player Embed) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-secondary mb-2">Moments That Matter</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-10"></div>
          
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
            <iframe 
              src="https://www.youtube.com/embed/y881t8ilMyc" 
              title="Designed for the Moments That Matter | Primewood Industries"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Curated for you (No Price, Category Redirection) */}
      <section className="py-16 bg-[#F9F7F4]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-secondary mb-4">Curated for you</h2>
            
            {/* Curated Tabs Bar */}
            <div className="flex border-b border-gray-200 w-full mb-8 text-sm">
              {[
                { label: "Sofas & Recliners", key: "sofas" },
                { label: "Beds", key: "beds" },
                { label: "Dining", key: "dining" }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCuratedTab(tab.key)}
                  className={`px-6 sm:px-8 py-3.5 font-bold transition-all relative outline-none ${
                    activeCuratedTab === tab.key
                      ? "text-secondary font-extrabold"
                      : "text-gray-400 hover:text-gray-700 font-semibold"
                  }`}
                >
                  <span>{tab.label}</span>
                  {activeCuratedTab === tab.key && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {curatedProducts.slice(0, 5).map((p) => (
              <Link 
                key={p.id} 
                href={`/category?type=${activeCuratedTab === "dining" ? "dining-sets" : activeCuratedTab}`}
                className="group flex flex-col cursor-pointer"
              >
                <div className="aspect-[4/5] bg-white rounded-lg overflow-hidden flex items-center justify-center p-4 mb-3 relative border border-gray-100/60 shadow-sm group-hover:shadow-md transition-all duration-300">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500 ease-out mix-blend-multiply" 
                  />
                </div>
                <h3 className="font-semibold text-gray-800 text-[14px] leading-snug line-clamp-2 min-h-[40px] mb-2 group-hover:text-primary transition-colors">
                  {p.name}
                </h3>
                {/* Red underline indicator */}
                <div className="w-8 h-[2px] bg-primary transition-all duration-300 group-hover:w-16"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop By Collection (Hotspot Overlays) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-secondary mb-8">Shop by collection</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Box (Wide Sofa Set Banner) */}
            <div className="lg:col-span-3 relative rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-[21/10] group">
              <img src="/images/sofa_set_blue.png" alt="Bayflow Sofa Set" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Pulsing Hotspots */}
              <div className="absolute top-[35%] left-[25%] group/spot cursor-pointer">
                <span className="flex h-6 w-6 items-center justify-center relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white shadow-md"></span>
                </span>
              </div>
              <div className="absolute top-[48%] left-[54%] group/spot cursor-pointer">
                <span className="flex h-6 w-6 items-center justify-center relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white shadow-md"></span>
                </span>
              </div>
              <div className="absolute top-[42%] left-[72%] group/spot cursor-pointer">
                <span className="flex h-6 w-6 items-center justify-center relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white shadow-md"></span>
                </span>
              </div>

              {/* Bottom Label overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white">
                <h3 className="text-xl md:text-2xl font-bold">Bayflow Sofa Set</h3>
                <Link href="/category?type=sofas" className="bg-white/20 hover:bg-white/35 backdrop-blur-sm text-white px-5 py-2 rounded-md text-xs font-bold transition flex items-center gap-1.5 uppercase tracking-wider">
                  View all products <i className="fas fa-chevron-right text-[10px]"></i>
                </Link>
              </div>
            </div>

            {/* Right Box (Narrow Secondary Collection Banner) */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-auto group">
              <img src="/images/sofa_l_shaped.png" alt="Secondary Collection" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">Corner Comforts</h3>
                <Link href="/category?type=sofas" className="text-xs font-bold hover:underline uppercase tracking-wider flex items-center gap-1">
                  Explore <i className="fas fa-chevron-right text-[10px]"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Consultation Banners */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Modular Kitchen Banner */}
            <div className="relative rounded-2xl overflow-hidden h-[340px] group shadow-lg">
              <img src="/images/modular_kitchen.png" alt="Modular Kitchens" className="w-full h-full object-cover filter brightness-[0.8]" />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center p-6 text-center text-white">
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#FF5A50] mb-2">Modular Kitchens</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold max-w-sm mb-3">Looking for a new kitchen?</h3>
                <Link href="#" className="border-b-2 border-white hover:text-[#FF5A50] hover:border-[#FF5A50] transition pb-0.5 text-sm font-bold uppercase tracking-wider">
                  Book a consultant
                </Link>
              </div>
            </div>

            {/* Home Interiors Banner */}
            <div className="relative rounded-2xl overflow-hidden h-[340px] group shadow-lg">
              <img src="/images/hero.png" alt="Home Interiors" className="w-full h-full object-cover filter brightness-[0.8]" />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center p-6 text-center text-white">
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#FF5A50] mb-2">Home Interiors</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold max-w-sm mb-3">Looking to design your space?</h3>
                <Link href="#" className="border-b-2 border-white hover:text-[#FF5A50] hover:border-[#FF5A50] transition pb-0.5 text-sm font-bold uppercase tracking-wider mb-2">
                  Book a consultant
                </Link>
                <span className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Available in Mumbai</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Exchange Banner */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 bg-[#efece6] rounded-2xl overflow-hidden shadow-md">
            <div className="md:col-span-2 relative aspect-[16/9] md:aspect-auto">
              <img src="/images/bed.png" alt="Upgrade Your Space" className="w-full h-full object-cover" />
            </div>
            <div className="p-8 sm:p-12 flex flex-col justify-center bg-[#efece6]">
              <h3 className="text-2xl font-black text-gray-900 leading-tight mb-3">Upgrade Your Space, Enjoy hassle free Exchange!</h3>
              <p className="text-sm text-gray-600 mb-6">Exchange your old furniture and save up to <span className="font-bold text-primary">₹5000</span></p>
              <Link href="/category?type=beds" className="bg-white text-gray-900 hover:bg-gray-50 border border-gray-300 font-bold px-6 py-3 rounded text-center w-full sm:w-fit transition text-sm shadow-sm uppercase tracking-wider">
                Explore Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interio for India Red Statistics Strip */}
      <section className="bg-primary text-white py-10">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-white/80">Primewood for India · <span className="text-white">Providing comfort and style for modern living</span></h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x divide-white/20">
            <div className="px-4">
              <div className="text-4xl md:text-5xl font-black mb-1">30+</div>
              <div className="text-xs uppercase tracking-wider text-white/80 font-bold">Innovative products launched every year</div>
            </div>
            <div className="px-4">
              <div className="text-4xl md:text-5xl font-black mb-1">17,000+</div>
              <div className="text-xs uppercase tracking-wider text-white/80 font-bold">Pin codes serviced</div>
            </div>
            <div className="px-4">
              <div className="text-4xl md:text-5xl font-black mb-1">1000+</div>
              <div className="text-xs uppercase tracking-wider text-white/80 font-bold">Stores across the country</div>
            </div>
          </div>
        </div>
      </section>

      {/* Find a store near you */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-[21/9] group shadow-xl">
            <img src="/images/bed_mattress_set.png" alt="Bedroom Setup" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 md:bg-transparent md:bg-gradient-to-r from-black/60 to-transparent"></div>
            
            {/* Center/Left Card Overlay */}
            <div className="absolute inset-0 flex items-center px-8 md:px-16 z-10">
              <div className="max-w-md bg-black/60 backdrop-blur-md p-8 rounded-xl border border-white/10 text-white shadow-2xl">
                <h3 className="text-2xl sm:text-3xl font-black mb-3">Find a store near you</h3>
                <p className="text-xs text-white/80 leading-relaxed mb-6">
                  Our stores give you the chance to experience our collection up close, as well as interact with our expert team. Come visit us soon!
                </p>
                <Link href="/category" className="inline-block bg-primary hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded shadow-lg transition">
                  Find a store near you &gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Furniture care services */}
      <section className="py-16 bg-lightbg border-t border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-bold text-secondary">Furniture care services</h2>
            <Link href="#" className="text-gray-500 font-bold text-xs hover:text-primary transition uppercase tracking-wider border-b border-gray-400 hover:border-primary pb-0.5">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Reupholstery */}
            <div className="bg-white rounded-xl border border-gray-150 p-6 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-md transition">
              <div>
                <div className="w-12 h-12 bg-red-50 text-primary rounded-full flex items-center justify-center mb-4 text-lg">
                  <i className="fas fa-couch"></i>
                </div>
                <h3 className="font-extrabold text-gray-800 text-base mb-2">Reupholstery</h3>
                <p className="text-xs text-gray-500 leading-relaxed max-w-xs mb-4">
                  Give your furniture a refined new look to uplift its style and make it last longer.
                </p>
              </div>
              <Link href="#" className="text-xs font-bold text-secondary hover:text-primary transition uppercase border-b-2 border-secondary hover:border-primary pb-0.5 tracking-wider">
                Read More
              </Link>
            </div>

            {/* Cleaning */}
            <div className="bg-white rounded-xl border border-gray-150 p-6 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-md transition">
              <div>
                <div className="w-12 h-12 bg-red-50 text-primary rounded-full flex items-center justify-center mb-4 text-lg">
                  <i className="fas fa-broom"></i>
                </div>
                <h3 className="font-extrabold text-gray-800 text-base mb-2">Cleaning</h3>
                <p className="text-xs text-gray-500 leading-relaxed max-w-xs mb-4">
                  Treat yourself to luxuriously clean sofas, chairs, and carpets.
                </p>
              </div>
              <Link href="#" className="text-xs font-bold text-secondary hover:text-primary transition uppercase border-b-2 border-secondary hover:border-primary pb-0.5 tracking-wider">
                Read More
              </Link>
            </div>

            {/* Repainting */}
            <div className="bg-white rounded-xl border border-gray-150 p-6 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-md transition">
              <div>
                <div className="w-12 h-12 bg-red-50 text-primary rounded-full flex items-center justify-center mb-4 text-lg">
                  <i className="fas fa-paint-roller"></i>
                </div>
                <h3 className="font-extrabold text-gray-800 text-base mb-2">Repainting</h3>
                <p className="text-xs text-gray-500 leading-relaxed max-w-xs mb-4">
                  Give your wardrobes and almirahs a fresh coat of paint and keep them looking brand new.
                </p>
              </div>
              <Link href="#" className="text-xs font-bold text-secondary hover:text-primary transition uppercase border-b-2 border-secondary hover:border-primary pb-0.5 tracking-wider">
                Read More
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
          <span className="text-6xl text-gray-200 font-serif leading-none block mb-2">&ldquo;</span>
          <p className="text-lg md:text-xl font-bold text-gray-800 leading-relaxed max-w-xl mx-auto mb-6">
            "This is my second purchase from Primewood Industries Private Limited online, the product quality and service is very good."
          </p>
          <div className="w-10 h-0.5 bg-primary mx-auto mb-3"></div>
          <span className="text-xs uppercase tracking-widest font-extrabold text-gray-400">Deepak Vyas</span>
        </div>
      </section>

      {/* Go to Business Banner */}
      <section className="py-16 bg-lightbg border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Shop for your business</span>
              <h2 className="text-3xl sm:text-4xl font-black text-secondary leading-tight max-w-md">
                We enhance modern businesses and working environments
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
                Your workspace needs to foster collaboration and productivity. We design products and workspaces that do both.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="#" className="bg-primary hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded shadow-md transition flex items-center justify-center gap-1.5">
                  Go to business <i className="fas fa-arrow-right text-[10px]"></i>
                </Link>
                <Link href="#" className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded transition flex items-center justify-center gap-1.5">
                  Enquire now <i className="fas fa-phone-alt text-[10px]"></i>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl border border-gray-200">
              <img src="/images/study_desk.png" alt="Office Workspace" className="w-full h-full object-cover" />
            </div>

          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
