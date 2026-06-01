import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { defaultProducts } from "@/data/products";

export default function Home() {
  return (
    <>
      <Header />
      
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
              <Link href="#products" className="bg-primary hover:bg-red-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition shadow-lg shadow-red-500/30 text-center">Shop Now</Link>
              <Link href="/category" className="bg-transparent border border-gray-300 hover:border-gray-800 text-gray-800 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition text-center">Explore Stores</Link>
            </div>
          </div>
        </div>
      </section>

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

      <section id="products" className="py-16 bg-lightbg flex-grow">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-secondary">Bestsellers</h2>
              <p className="text-gray-500 mt-2">Discover our most loved furniture pieces</p>
            </div>
            <Link href="/category" className="text-primary font-medium hover:underline hidden sm:block">View All Products <i className="fas fa-arrow-right ml-1"></i></Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {defaultProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/category" className="inline-block bg-white border border-gray-300 text-gray-800 px-6 py-2 rounded-full font-medium">View All Products</Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
