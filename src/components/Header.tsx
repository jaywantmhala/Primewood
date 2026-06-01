"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

interface MegaMenuCategory {
  id: string;
  name: string;
  image: string;
  href: string;
  items?: { name: string; href: string }[];
}

const LIVING_ROOM_CATEGORIES: MegaMenuCategory[] = [
  { 
    id: "sofas", 
    name: "Sofas & Loungers", 
    image: "/images/sofa_standard.png", 
    href: "/category?type=sofas",
    items: [
      { name: "Sofas", href: "/category?type=sofas&tab=Sofas" },
      { name: "Recliner Sofas", href: "/category?type=sofas&tab=Recliner Sofas" },
      { name: "Sofa sets", href: "/category?type=sofas&tab=Sofa sets" },
      { name: "Sofa cum beds", href: "/category?type=sofas&tab=Sofa cum beds" },
      { name: "L shaped and corner sofa", href: "/category?type=sofas&tab=L shaped and corner sofa" },
      { name: "2-Seater Sofas", href: "/category?type=sofas&tab=2-Seater Sofas" },
      { name: "1-Seater Sofas", href: "/category?type=sofas&tab=1-Seater Sofas" },
      { name: "3-Seater Sofas", href: "/category?type=sofas&tab=3-Seater Sofas" }
    ]
  },
  { 
    id: "tables", 
    name: "Tables", 
    image: "/images/dining_table.png", 
    href: "/category?type=tables",
    items: [
      { name: "Coffee Tables", href: "/category?type=tables&tab=Coffee Tables" },
      { name: "Corner Tables", href: "/category?type=tables&tab=Corner Tables" }
    ]
  },
  { 
    id: "bean-bags", 
    name: "Bean bags & pouffes", 
    image: "/images/bean_bag.png", 
    href: "/category?type=bean-bags",
    items: [
      { name: "Bean Bags", href: "/category?type=bean-bags&tab=Bean Bags" },
      { name: "Pouffes", href: "/category?type=bean-bags&tab=Pouffes" },
      { name: "Ottomans", href: "/category?type=bean-bags&tab=Ottomans" }
    ]
  },
  { 
    id: "cabinets", 
    name: "Cabinets", 
    image: "/images/almirah.png", 
    href: "/category?type=cabinets",
    items: [
      { name: "Books Shelves", href: "/category?type=cabinets&tab=Books Shelves" },
      { name: "Display Units", href: "/category?type=cabinets&tab=Display Units" },
      { name: "TV units", href: "/category?type=cabinets&tab=TV units" },
      { name: "Shoes Racks", href: "/category?type=cabinets&tab=Shoes  Racks" }
    ]
  },
  { 
    id: "chairs", 
    name: "Chairs", 
    image: "/images/recliner_sofa.png", 
    href: "/category?type=chairs",
    items: [
      { name: "Leisure Chairs", href: "/category?type=chairs&tab=Leisure Chairs" },
      { name: "Wing Chairs", href: "/category?type=chairs&tab=Wing Chairs" },
      { name: "Easy Chairs", href: "/category?type=chairs&tab=Easy Chairs" }
    ]
  },
  { 
    id: "soft-furnishing", 
    name: "Soft furnishing", 
    image: "/images/soft_furnishing.png", 
    href: "/category?type=soft-furnishing",
    items: [
      { name: "Pillows", href: "/category?type=soft-furnishing&tab=Pillows" },
      { name: "Cusion Covers", href: "/category?type=soft-furnishing&tab=Cusion Covers" },
      { name: "Throws", href: "/category?type=soft-furnishing&tab=Throws" },
      { name: "Rugs", href: "/category?type=soft-furnishing&tab=Rugs" }
    ]
  }
];

const BEDROOM_CATEGORIES: MegaMenuCategory[] = [
  { 
    id: "almirahs", 
    name: "Almirahs & wardrobes", 
    image: "/images/almirah.png", 
    href: "/category?type=almirahs",
    items: [
      { name: "Steel Almirahs", href: "/category?type=almirahs&tab=Steel Almirahs" },
      { name: "Wooden Wardrobes", href: "/category?type=almirahs&tab=Wooden Wardrobes" },
      { name: "2 Door Wardrobes", href: "/category?type=almirahs&tab=2 Door Wardrobes" },
      { name: "3 Door Wardrobes", href: "/category?type=almirahs&tab=3 Door Wardrobes" },
      { name: "4 Door Wardrobes", href: "/category?type=almirahs&tab=4 Door Wardrobes" },
      { name: "Sliding Wardrobes", href: "/category?type=almirahs&tab=Sliding Wardrobes" }
    ]
  },
  { 
    id: "beds", 
    name: "Beds", 
    image: "/images/bed.png", 
    href: "/category?type=beds",
    items: [
      { name: "King Beds", href: "/category?type=beds&tab=King Beds" },
      { name: "Queen Beds", href: "/category?type=beds&tab=Queen Beds" },
      { name: "Single Beds", href: "/category?type=beds&tab=Single Beds" },
      { name: "Homecare Beds", href: "/category?type=beds&tab=Homecare Beds" },
      { name: "Wooden Beds", href: "/category?type=beds&tab=Wooden Beds" },
      { name: "Metal Beds", href: "/category?type=beds&tab=Metal Beds" },
      { name: "Double Beds", href: "/category?type=beds&tab=Double Beds" }
    ]
  },
  { 
    id: "bed-sets", 
    name: "Bed and Mattress Sets", 
    image: "/images/bed_mattress_set.png", 
    href: "/category?type=mattresses&tab=Beds and mattress set" 
  },
  { 
    id: "mattresses", 
    name: "Mattresses", 
    image: "/images/luxury_mattress.png", 
    href: "/category?type=mattresses",
    items: [
      { name: "Beds and mattress set", href: "/category?type=mattresses&tab=Beds and mattress set" },
      { name: "Orthopedic Mattresses", href: "/category?type=mattresses&tab=Orthopedic Mattresses" },
      { name: "Memory Foam Mattresses", href: "/category?type=mattresses&tab=Memory Foam Mattresses" },
      { name: "Latex Mattresses", href: "/category?type=mattresses&tab=Latex Mattresses" },
      { name: "Spring Mattresses", href: "/category?type=mattresses&tab=Spring Mattresses" }
    ]
  },
  { 
    id: "tables", 
    name: "Tables", 
    image: "/images/dining_table.png", 
    href: "/category?type=bedroom-tables",
    items: [
      { name: "Corner Tables", href: "/category?type=bedroom-tables&tab=Corner Tables" },
      { name: "Bedside Tables", href: "/category?type=bedroom-tables&tab=Bedside Tables" },
      { name: "Dressing Tables", href: "/category?type=bedroom-tables&tab=Dressing Tables" }
    ]
  },
  { 
    id: "chairs", 
    name: "Chairs", 
    image: "/images/recliner_sofa.png", 
    href: "/category?type=bedroom-chairs",
    items: [
      { name: "Work Chairs", href: "/category?type=bedroom-chairs&tab=Work Chairs" },
      { name: "Gaming Chairs", href: "/category?type=bedroom-chairs&tab=Gaming Chairs" }
    ]
  },
  { 
    id: "lockers", 
    name: "Home lockers", 
    image: "/images/locker.png", 
    href: "/category?type=lockers",
    items: [
      { name: "Digital Lockers", href: "/category?type=lockers&tab=Digital Lockers" },
      { name: "Biometric Lockers", href: "/category?type=lockers&tab=Biometric Lockers" },
      { name: "Manual Lockers", href: "/category?type=lockers&tab=Manual Lockers" }
    ]
  },
  { 
    id: "cabinets", 
    name: "Cabinets", 
    image: "/images/almirah.png", 
    href: "/category?type=cabinets",
    items: [
      { name: "Chest of Drawers", href: "/category?type=cabinets&tab=Chest of Drawers" }
    ]
  },
  { id: "bean-bags", name: "Bean bags and pouffes", image: "/images/bean_bag.png", href: "/category" }
];

const DINING_ROOM_CATEGORIES: MegaMenuCategory[] = [
  { 
    id: "dining-sets", 
    name: "Dining Sets", 
    image: "/images/dining_table.png", 
    href: "/category?type=dining-sets",
    items: [
      { name: "4 seats", href: "/category?type=dining-sets&tab=4 seats" },
      { name: "6 seater", href: "/category?type=dining-sets&tab=6 seater" },
      { name: "8 seater", href: "/category?type=dining-sets&tab=8 seater" }
    ]
  },
  { 
    id: "dining-tables", 
    name: "Dining Tables", 
    image: "/images/dining_table.png", 
    href: "/category?type=dining-tables",
    items: [
      { name: "4 seater", href: "/category?type=dining-tables&tab=4 seater" },
      { name: "6 seater", href: "/category?type=dining-tables&tab=6 seater" },
      { name: "8 seater", href: "/category?type=dining-tables&tab=8 seater" }
    ]
  },
  { 
    id: "dining-chairs", 
    name: "Dining Chairs", 
    image: "/images/dining_chair.png", 
    href: "/category?type=dining-chairs",
    items: [
      { name: "Dining Chairs", href: "/category?type=dining-chairs&tab=Dining Chairs" }
    ]
  },
  { 
    id: "dining-benches", 
    name: "Dining Benches", 
    image: "/images/dining_bench.png", 
    href: "/category?type=dining-benches",
    items: [
      { name: "Dining Benches", href: "/category?type=dining-benches&tab=Dining Benches" }
    ]
  },
  { 
    id: "dining-accessories", 
    name: "Dining Accessories", 
    image: "/images/soft_furnishing.png", 
    href: "/category?type=dining-accessories",
    items: [
      { name: "Table Mats", href: "/category?type=dining-accessories&tab=Table Mats" },
      { name: "Table Runners", href: "/category?type=dining-accessories&tab=Table Runners" }
    ]
  },
];

const OFFICE_CATEGORIES: MegaMenuCategory[] = [
  { 
    id: "office-chairs", 
    name: "Chairs", 
    image: "/images/ergonomic_office_chair.png", 
    href: "/category?type=office-chairs",
    items: [
      { name: "Work Chairs", href: "/category?type=office-chairs&tab=Work Chairs" },
      { name: "Gaming Chairs", href: "/category?type=office-chairs&tab=Gaming Chairs" }
    ]
  },
  { 
    id: "office-tables", 
    name: "Tables", 
    image: "/images/study_desk.png", 
    href: "/category?type=office-tables",
    items: [
      { name: "Work Desks & Study Tables", href: "/category?type=office-tables&tab=Work Desks & Study Tables" },
      { name: "Corner Tables", href: "/category?type=office-tables&tab=Corner Tables" }
    ]
  }
];

const KITCHEN_CATEGORIES: MegaMenuCategory[] = [
  { 
    id: "modular-kitchens", 
    name: "Modular Kitchen Sets", 
    image: "/images/modular_kitchen.png", 
    href: "/category?type=modular-kitchens",
    items: [
      { name: "L-Shaped Kitchens", href: "/category?type=modular-kitchens&tab=L-Shaped Kitchens" },
      { name: "U-Shaped Kitchens", href: "/category?type=modular-kitchens&tab=U-Shaped Kitchens" },
      { name: "Straight Kitchens", href: "/category?type=modular-kitchens&tab=Straight Kitchens" }
    ]
  }
];

export function Header() {
  const { cartCount } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [isLivingRoomOpen, setIsLivingRoomOpen] = useState(false);
  const [isBedroomOpen, setIsBedroomOpen] = useState(false);
  const [isDiningOpen, setIsDiningOpen] = useState(false);
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);
  const [isKitchenOpen, setIsKitchenOpen] = useState(false);
  const [isAllProductsOpen, setIsAllProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activeLivingSub, setActiveLivingSub] = useState("sofas");
  const [activeBedroomSub, setActiveBedroomSub] = useState("almirahs");
  const [activeDiningSub, setActiveDiningSub] = useState("dining-sets");
  const [activeOfficeSub, setActiveOfficeSub] = useState("office-chairs");
  const [activeKitchenSub, setActiveKitchenSub] = useState("modular-kitchens");

  useEffect(() => {
    setUser(localStorage.getItem("interio_user"));
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("Do you want to Log Out?")) {
      localStorage.removeItem("interio_user");
      setUser(null);
      showToast("Logged out successfully", "info");
      router.push("/");
    }
  };

  return (
    <>
      <div className="bg-brandblue text-white text-xs py-2 px-4 md:px-8 flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="#" className="hover:text-primary transition opacity-90">Become a dealer</Link>
          <Link href="#" className="hover:text-primary transition opacity-90">Store locator</Link>
          <Link href="#" className="hover:text-primary transition opacity-90">Contact us</Link>
          <Link href="#" className="hover:text-primary transition opacity-90">Services</Link>
        </div>
        <div className="flex space-x-4 font-semibold">
          <Link href="#" className="bg-primary text-white px-2 py-0.5 rounded">For Homes</Link>
          <Link href="#" className="hover:text-primary transition opacity-90">For Businesses</Link>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-extrabold tracking-tight text-secondary">Primewood</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <input type="text" placeholder="Search for Furniture, Mattresses & more..." className="w-full bg-gray-100 border border-transparent focus:bg-white focus:border-primary rounded-full py-2.5 pl-5 pr-12 outline-none transition-all duration-300" />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
              <i className="fas fa-search text-lg"></i>
            </button>
          </div>

          <div className="flex items-center space-x-6">
            {user ? (
              <Link href="#" onClick={handleLogout} className="text-gray-600 hover:text-primary flex flex-col items-center group transition">
                <i className="far fa-user text-xl text-primary group-hover:scale-110 duration-200"></i>
                <span className="text-xs mt-1 font-semibold text-primary">Hi, {user}</span>
              </Link>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-primary flex flex-col items-center group transition">
                <i className="far fa-user text-xl group-hover:scale-110 duration-200"></i>
                <span className="text-xs mt-1 font-medium">Log In</span>
              </Link>
            )}
            
            <Link href="#" className="text-gray-600 hover:text-primary flex flex-col items-center group transition">
              <i className="far fa-heart text-xl group-hover:scale-110 duration-200"></i>
              <span className="text-xs mt-1 font-medium">Wishlist</span>
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-primary flex flex-col items-center group transition relative">
              <i className="fas fa-shopping-cart text-xl group-hover:scale-110 duration-200"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">{cartCount}</span>
              )}
              <span className="text-xs mt-1 font-medium">Cart</span>
            </Link>
            
            {/* Burger Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block lg:hidden text-gray-600 hover:text-primary focus:outline-none transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
            </button>
          </div>
        </div>

        <nav className="border-t border-gray-100 hidden lg:block relative">
          <div className="container mx-auto px-4 md:px-8 relative">
            <ul className="flex items-center space-x-8 text-sm font-medium text-gray-700">
              {/* Living Room Mega Menu */}
              <li 
                onMouseEnter={() => setIsLivingRoomOpen(true)}
                onMouseLeave={() => setIsLivingRoomOpen(false)}
                className="py-4"
              >
                <Link 
                  href="/category" 
                  className={`hover:text-primary transition flex items-center focus:outline-none ${isLivingRoomOpen ? 'text-primary font-semibold' : ''}`}
                >
                  Living room
                </Link>
                
                {isLivingRoomOpen && (
                  <div 
                    className="absolute left-4 right-4 md:left-8 md:right-8 top-full mt-0 bg-white border border-gray-200 shadow-2xl rounded-b-2xl z-50 flex overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ minHeight: '480px' }}
                  >
                    {/* Left Column - Categories list */}
                    <div className="w-1/4 bg-[#f9f7f4] py-4 border-r border-gray-200/50 flex flex-col">
                      {LIVING_ROOM_CATEGORIES.map((category) => (
                        <button
                          key={category.id}
                          onMouseEnter={() => setActiveLivingSub(category.id)}
                          className={`w-full text-left px-8 py-3.5 text-[15px] font-medium border-b border-gray-100 transition-all duration-200 flex items-center justify-between ${
                            activeLivingSub === category.id
                              ? "bg-white text-primary font-semibold border-l-4 border-l-primary pl-7"
                              : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
                          }`}
                        >
                          <span>{category.name}</span>
                          {activeLivingSub === category.id && (
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Right Column - Subcategories & Featured Image */}
                    <div className="w-3/4 bg-white p-6 flex flex-row space-x-8">
                      {(() => {
                        const currentCategory = LIVING_ROOM_CATEGORIES.find((cat) => cat.id === activeLivingSub);
                        if (!currentCategory) return null;
                        return (
                          <>
                            {/* Left Side: Subcategories List */}
                            <div className="w-1/2 flex flex-col justify-start">
                              <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-4">
                                Shop by Product
                              </h3>
                              {currentCategory.items ? (
                                <div className="grid grid-cols-1 gap-y-3">
                                  {currentCategory.items.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      onClick={() => setIsLivingRoomOpen(false)}
                                      className="text-[15px] font-semibold text-gray-600 hover:text-primary transition-colors flex items-center group/item"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover/item:bg-primary mr-2.5 transition-all"></span>
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-400 font-medium">Explore our beautiful collection.</p>
                              )}
                            </div>

                            {/* Right Side: Single featured full-size image */}
                            <div className="w-1/2 flex flex-col justify-between">
                              <Link 
                                href={currentCategory.href} 
                                onClick={() => setIsLivingRoomOpen(false)}
                                className="group relative w-full h-full rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100/60"
                                style={{ minHeight: '340px' }}
                              >
                                <img 
                                  src={currentCategory.image} 
                                  alt={currentCategory.name} 
                                  className="object-contain w-full h-full p-4 group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                                  style={{ maxHeight: '280px' }}
                                />
                                
                                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-lg p-3 shadow-lg flex items-center justify-between group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                  <div>
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 group-hover:text-white/80 font-bold">Featured Collection</span>
                                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-white mt-0.5">{currentCategory.name}</h4>
                                  </div>
                                  <div className="flex items-center space-x-1.5 bg-gray-50 text-gray-800 font-bold text-xs px-3 py-1.5 rounded group-hover:bg-white group-hover:text-primary transition-all duration-300">
                                    <span>Explore All</span>
                                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </li>

              {/* Bedroom Mega Menu */}
              <li 
                onMouseEnter={() => setIsBedroomOpen(true)}
                onMouseLeave={() => setIsBedroomOpen(false)}
                className="py-4"
              >
                <Link 
                  href="/category" 
                  className={`hover:text-primary transition flex items-center focus:outline-none ${isBedroomOpen ? 'text-primary font-semibold' : ''}`}
                >
                  Bedroom
                </Link>
                
                {isBedroomOpen && (
                  <div 
                    className="absolute left-4 right-4 md:left-8 md:right-8 top-full mt-0 bg-white border border-gray-200 shadow-2xl rounded-b-2xl z-50 flex overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ minHeight: '480px' }}
                  >
                    {/* Left Column - Categories list */}
                    <div className="w-1/4 bg-[#f9f7f4] py-4 border-r border-gray-200/50 flex flex-col overflow-y-auto" style={{ maxHeight: '480px' }}>
                      {BEDROOM_CATEGORIES.map((category) => (
                        <button
                          key={category.id}
                          onMouseEnter={() => setActiveBedroomSub(category.id)}
                          className={`w-full text-left px-8 py-3 text-[14px] font-medium border-b border-gray-100 transition-all duration-200 flex items-center justify-between ${
                            activeBedroomSub === category.id
                              ? "bg-white text-primary font-semibold border-l-4 border-l-primary pl-7"
                              : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
                          }`}
                        >
                          <span>{category.name}</span>
                          {activeBedroomSub === category.id && (
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Right Column - Subcategories & Featured Image */}
                    <div className="w-3/4 bg-white p-6 flex flex-row space-x-8">
                      {(() => {
                        const currentCategory = BEDROOM_CATEGORIES.find((cat) => cat.id === activeBedroomSub);
                        if (!currentCategory) return null;
                        return (
                          <>
                            {/* Left Side: Subcategories List */}
                            <div className="w-1/2 flex flex-col justify-start">
                              <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-4">
                                Shop by Product
                              </h3>
                              {currentCategory.items ? (
                                <div className="grid grid-cols-1 gap-y-3">
                                  {currentCategory.items.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      onClick={() => setIsBedroomOpen(false)}
                                      className="text-[15px] font-semibold text-gray-600 hover:text-primary transition-colors flex items-center group/item"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover/item:bg-primary mr-2.5 transition-all"></span>
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-400 font-medium">Explore our beautiful collection.</p>
                              )}
                            </div>

                            {/* Right Side: Single featured full-size image */}
                            <div className="w-1/2 flex flex-col justify-between">
                              <Link 
                                href={currentCategory.href} 
                                onClick={() => setIsBedroomOpen(false)}
                                className="group relative w-full h-full rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100/60"
                                style={{ minHeight: '340px' }}
                              >
                                <img 
                                  src={currentCategory.image} 
                                  alt={currentCategory.name} 
                                  className="object-contain w-full h-full p-4 group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                                  style={{ maxHeight: '280px' }}
                                />
                                
                                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-lg p-3 shadow-lg flex items-center justify-between group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                  <div>
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 group-hover:text-white/80 font-bold">Featured Collection</span>
                                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-white mt-0.5">{currentCategory.name}</h4>
                                  </div>
                                  <div className="flex items-center space-x-1.5 bg-gray-50 text-gray-800 font-bold text-xs px-3 py-1.5 rounded group-hover:bg-white group-hover:text-primary transition-all duration-300">
                                    <span>Explore All</span>
                                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </li>

              {/* Dining Room Mega Menu */}
              <li 
                onMouseEnter={() => setIsDiningOpen(true)}
                onMouseLeave={() => setIsDiningOpen(false)}
                className="py-4"
              >
                <Link 
                  href="/category" 
                  className={`hover:text-primary transition flex items-center focus:outline-none ${isDiningOpen ? 'text-primary font-semibold' : ''}`}
                >
                  Dining room
                </Link>
                
                {isDiningOpen && (
                  <div 
                    className="absolute left-4 right-4 md:left-8 md:right-8 top-full mt-0 bg-white border border-gray-200 shadow-2xl rounded-b-2xl z-50 flex overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ minHeight: '480px' }}
                  >
                    {/* Left Column - Categories list */}
                    <div className="w-1/4 bg-[#f9f7f4] py-4 border-r border-gray-200/50 flex flex-col">
                      {DINING_ROOM_CATEGORIES.map((category) => (
                        <button
                          key={category.id}
                          onMouseEnter={() => setActiveDiningSub(category.id)}
                          className={`w-full text-left px-8 py-3.5 text-[15px] font-medium border-b border-gray-100 transition-all duration-200 flex items-center justify-between ${
                            activeDiningSub === category.id
                              ? "bg-white text-primary font-semibold border-l-4 border-l-primary pl-7"
                              : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
                          }`}
                        >
                          <span>{category.name}</span>
                          {activeDiningSub === category.id && (
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Right Column - Single featured full-size image */}
                    <div className="w-3/4 bg-white p-6 flex flex-col justify-between">
                      {(() => {
                        const currentCategory = DINING_ROOM_CATEGORIES.find((cat) => cat.id === activeDiningSub);
                        if (!currentCategory) return null;
                        return (
                          <Link 
                            href={currentCategory.href} 
                            onClick={() => setIsDiningOpen(false)}
                            className="group relative w-full h-full rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100/60"
                          >
                            <img 
                              src={currentCategory.image} 
                              alt={currentCategory.name} 
                              className="object-contain w-full h-full p-4 group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                              style={{ maxHeight: '440px' }}
                            />
                            
                            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-lg p-4 shadow-lg flex items-center justify-between group-hover:bg-primary group-hover:text-white transition-all duration-300">
                              <div>
                                <span className="text-xs uppercase tracking-wider text-gray-400 group-hover:text-white/80 font-bold">Featured Collection</span>
                                <h4 className="text-lg font-bold text-gray-800 group-hover:text-white mt-0.5">{currentCategory.name}</h4>
                              </div>
                              <div className="flex items-center space-x-2 bg-gray-50 text-gray-800 font-semibold text-sm px-4 py-2 rounded-md group-hover:bg-white group-hover:text-primary transition-all duration-300">
                                <span>Explore All</span>
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                              </div>
                            </div>
                          </Link>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </li>

              {/* Office & Study Mega Menu */}
              <li 
                onMouseEnter={() => setIsOfficeOpen(true)}
                onMouseLeave={() => setIsOfficeOpen(false)}
                className="py-4"
              >
                <Link 
                  href="/category" 
                  className={`hover:text-primary transition flex items-center focus:outline-none ${isOfficeOpen ? 'text-primary font-semibold' : ''}`}
                >
                  Office and Study
                </Link>
                
                {isOfficeOpen && (
                  <div 
                    className="absolute left-4 right-4 md:left-8 md:right-8 top-full mt-0 bg-white border border-gray-200 shadow-2xl rounded-b-2xl z-50 flex overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ minHeight: '480px' }}
                  >
                    {/* Left Column - Categories list */}
                    <div className="w-1/4 bg-[#f9f7f4] py-4 border-r border-gray-200/50 flex flex-col">
                      {OFFICE_CATEGORIES.map((category) => (
                        <button
                          key={category.id}
                          onMouseEnter={() => setActiveOfficeSub(category.id)}
                          className={`w-full text-left px-8 py-3.5 text-[15px] font-medium border-b border-gray-100 transition-all duration-200 flex items-center justify-between ${
                            activeOfficeSub === category.id
                              ? "bg-white text-primary font-semibold border-l-4 border-l-primary pl-7"
                              : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
                          }`}
                        >
                          <span>{category.name}</span>
                          {activeOfficeSub === category.id && (
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Right Column - Subcategories & Featured Image */}
                    <div className="w-3/4 bg-white p-6 flex flex-row space-x-8">
                      {(() => {
                        const currentCategory = OFFICE_CATEGORIES.find((cat) => cat.id === activeOfficeSub);
                        if (!currentCategory) return null;
                        return (
                          <>
                            {/* Left Side: Subcategories List */}
                            <div className="w-1/2 flex flex-col justify-start">
                              <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-4">
                                Shop by Product
                              </h3>
                              {currentCategory.items ? (
                                <div className="grid grid-cols-1 gap-y-3">
                                  {currentCategory.items.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      onClick={() => setIsOfficeOpen(false)}
                                      className="text-[15px] font-semibold text-gray-600 hover:text-primary transition-colors flex items-center group/item"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover/item:bg-primary mr-2.5 transition-all"></span>
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-400 font-medium">Explore our beautiful collection.</p>
                              )}
                            </div>

                            {/* Right Side: Single featured full-size image */}
                            <div className="w-1/2 flex flex-col justify-between">
                              <Link 
                                href={currentCategory.href} 
                                onClick={() => setIsOfficeOpen(false)}
                                className="group relative w-full h-full rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100/60"
                                style={{ minHeight: '340px' }}
                              >
                                <img 
                                  src={currentCategory.image} 
                                  alt={currentCategory.name} 
                                  className="object-contain w-full h-full p-4 group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                                  style={{ maxHeight: '280px' }}
                                />
                                
                                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-lg p-3 shadow-lg flex items-center justify-between group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                  <div>
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 group-hover:text-white/80 font-bold">Featured Collection</span>
                                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-white mt-0.5">{currentCategory.name}</h4>
                                  </div>
                                  <div className="flex items-center space-x-1.5 bg-gray-50 text-gray-800 font-bold text-xs px-3 py-1.5 rounded group-hover:bg-white group-hover:text-primary transition-all duration-300">
                                    <span>Explore All</span>
                                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </li>

              {/* Modular Kitchens Mega Menu */}
              <li 
                onMouseEnter={() => setIsKitchenOpen(true)}
                onMouseLeave={() => setIsKitchenOpen(false)}
                className="py-4"
              >
                <Link 
                  href="/category" 
                  className={`hover:text-primary transition flex items-center focus:outline-none ${isKitchenOpen ? 'text-primary font-semibold' : ''}`}
                >
                  Modular Kitchens
                </Link>
                
                {isKitchenOpen && (
                  <div 
                    className="absolute left-4 right-4 md:left-8 md:right-8 top-full mt-0 bg-white border border-gray-200 shadow-2xl rounded-b-2xl z-50 flex overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ minHeight: '480px' }}
                  >
                    {/* Left Column - Categories list */}
                    <div className="w-1/4 bg-[#f9f7f4] py-4 border-r border-gray-200/50 flex flex-col">
                      {KITCHEN_CATEGORIES.map((category) => (
                        <button
                          key={category.id}
                          onMouseEnter={() => setActiveKitchenSub(category.id)}
                          className={`w-full text-left px-8 py-3.5 text-[15px] font-medium border-b border-gray-100 transition-all duration-200 flex items-center justify-between ${
                            activeKitchenSub === category.id
                              ? "bg-white text-primary font-semibold border-l-4 border-l-primary pl-7"
                              : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
                          }`}
                        >
                          <span>{category.name}</span>
                          {activeKitchenSub === category.id && (
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Right Column - Subcategories & Featured Image */}
                    <div className="w-3/4 bg-white p-6 flex flex-row space-x-8">
                      {(() => {
                        const currentCategory = KITCHEN_CATEGORIES.find((cat) => cat.id === activeKitchenSub);
                        if (!currentCategory) return null;
                        return (
                          <>
                            {/* Left Side: Subcategories List */}
                            <div className="w-1/2 flex flex-col justify-start">
                              <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-4">
                                Shop by Product
                              </h3>
                              {currentCategory.items ? (
                                <div className="grid grid-cols-1 gap-y-3">
                                  {currentCategory.items.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      onClick={() => setIsKitchenOpen(false)}
                                      className="text-[15px] font-semibold text-gray-600 hover:text-primary transition-colors flex items-center group/item"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover/item:bg-primary mr-2.5 transition-all"></span>
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-400 font-medium">Explore our beautiful collection.</p>
                              )}
                            </div>

                            {/* Right Side: Single featured full-size image */}
                            <div className="w-1/2 flex flex-col justify-between">
                              <Link 
                                href={currentCategory.href} 
                                onClick={() => setIsKitchenOpen(false)}
                                className="group relative w-full h-full rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100/60"
                                style={{ minHeight: '340px' }}
                              >
                                <img 
                                  src={currentCategory.image} 
                                  alt={currentCategory.name} 
                                  className="object-contain w-full h-full p-4 group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                                  style={{ maxHeight: '280px' }}
                                />
                                
                                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-lg p-3 shadow-lg flex items-center justify-between group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                  <div>
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 group-hover:text-white/80 font-bold">Featured Collection</span>
                                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-white mt-0.5">{currentCategory.name}</h4>
                                  </div>
                                  <div className="flex items-center space-x-1.5 bg-gray-50 text-gray-800 font-bold text-xs px-3 py-1.5 rounded group-hover:bg-white group-hover:text-primary transition-all duration-300">
                                    <span>Explore All</span>
                                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </li>
              {/* All Products Mega Menu */}
              <li
                onMouseEnter={() => setIsAllProductsOpen(true)}
                onMouseLeave={() => setIsAllProductsOpen(false)}
                className="py-4"
              >
                <Link
                  href="/category"
                  className={`hover:text-primary transition flex items-center focus:outline-none ${isAllProductsOpen ? 'text-primary font-semibold' : ''}`}
                >
                  All Products
                </Link>

                {isAllProductsOpen && (
                  <div
                    className="absolute left-4 right-4 md:left-8 md:right-8 top-full mt-0 bg-white border border-gray-200 shadow-2xl rounded-b-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    {/* Top bar */}
                    <div className="bg-[#f9f7f4] border-b border-gray-100 px-8 py-3 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Browse All Categories</span>
                      <Link href="/category" onClick={() => setIsAllProductsOpen(false)} className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
                        View All Products <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </Link>
                    </div>

                    <div className="grid grid-cols-5 gap-0 divide-x divide-gray-100">

                      {/* Column 1 â€” Sofas & Storage */}
                      <div className="p-6 flex flex-col space-y-6">
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 pb-1.5 border-b border-primary/20">Sofas &amp; Loungers</h3>
                          <ul className="space-y-2">
                            {["Sofas","Sofa sets","Recliner Sofas","Sofa cum beds","L shaped and corner sofa","1-Seater Sofas","2-Seater Sofas","3-Seater Sofas"].map(item => (
                              <li key={item}><Link href={`/category?type=sofas&tab=${item}`} onClick={() => setIsAllProductsOpen(false)} className="text-[13px] text-gray-600 hover:text-primary transition-colors block hover:translate-x-0.5 duration-150">{item}</Link></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 pb-1.5 border-b border-primary/20">Bean Bags &amp; Pouffes</h3>
                          <ul className="space-y-2">
                            {["Bean Bags","Pouffes","Ottomans"].map(item => (
                              <li key={item}><Link href={`/category?type=bean-bags&tab=${item}`} onClick={() => setIsAllProductsOpen(false)} className="text-[13px] text-gray-600 hover:text-primary transition-colors block hover:translate-x-0.5 duration-150">{item}</Link></li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Column 2 â€” Bedroom */}
                      <div className="p-6 flex flex-col space-y-6">
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 pb-1.5 border-b border-primary/20">Beds</h3>
                          <ul className="space-y-2">
                            {["King Beds","Queen Beds","Single Beds","Double Beds","Wooden Beds","Metal Beds","Homecare Beds"].map(item => (
                              <li key={item}><Link href={`/category?type=beds&tab=${item}`} onClick={() => setIsAllProductsOpen(false)} className="text-[13px] text-gray-600 hover:text-primary transition-colors block hover:translate-x-0.5 duration-150">{item}</Link></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 pb-1.5 border-b border-primary/20">Mattresses</h3>
                          <ul className="space-y-2">
                            {["Orthopedic Mattresses","Memory Foam","Latex Mattresses","Spring Mattresses"].map(item => (
                              <li key={item}><Link href={`/category?type=mattresses&tab=${item}`} onClick={() => setIsAllProductsOpen(false)} className="text-[13px] text-gray-600 hover:text-primary transition-colors block hover:translate-x-0.5 duration-150">{item}</Link></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 pb-1.5 border-b border-primary/20">Almirahs &amp; Wardrobes</h3>
                          <ul className="space-y-2">
                            {["Steel Almirahs","Wooden Wardrobes","2-Door Wardrobes","3-Door Wardrobes","Sliding Wardrobes"].map(item => (
                              <li key={item}><Link href={`/category?type=almirahs&tab=${item}`} onClick={() => setIsAllProductsOpen(false)} className="text-[13px] text-gray-600 hover:text-primary transition-colors block hover:translate-x-0.5 duration-150">{item}</Link></li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Column 3 â€” Dining */}
                      <div className="p-6 flex flex-col space-y-6">
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 pb-1.5 border-b border-primary/20">Dining Furniture</h3>
                          <ul className="space-y-2">
                            {[{label:"Dining Sets",type:"dining-sets"},{label:"Dining Tables",type:"dining-tables"},{label:"Dining Chairs",type:"dining-chairs"},{label:"Dining Benches",type:"dining-benches"}].map(item => (
                              <li key={item.label}><Link href={`/category?type=${item.type}`} onClick={() => setIsAllProductsOpen(false)} className="text-[13px] text-gray-600 hover:text-primary transition-colors block hover:translate-x-0.5 duration-150">{item.label}</Link></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 pb-1.5 border-b border-primary/20">Dining Accessories</h3>
                          <ul className="space-y-2">
                            {["Table Mats","Table Runners"].map(item => (
                              <li key={item}><Link href={`/category?type=dining-accessories&tab=${item}`} onClick={() => setIsAllProductsOpen(false)} className="text-[13px] text-gray-600 hover:text-primary transition-colors block hover:translate-x-0.5 duration-150">{item}</Link></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 pb-1.5 border-b border-primary/20">Tables</h3>
                          <ul className="space-y-2">
                            {[
                              {label:"Coffee Tables",href:"/category?type=tables&tab=Coffee Tables"},
                              {label:"Bedside Tables",href:"/category?type=bedroom-tables&tab=Bedside Tables"},
                              {label:"Dressing Tables",href:"/category?type=bedroom-tables&tab=Dressing Tables"}
                            ].map(item => (
                              <li key={item.label}><Link href={item.href} onClick={() => setIsAllProductsOpen(false)} className="text-[13px] text-gray-600 hover:text-primary transition-colors block hover:translate-x-0.5 duration-150">{item.label}</Link></li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Column 4 â€” Cabinets, Lockers & Chairs */}
                      <div className="p-6 flex flex-col space-y-6">
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 pb-1.5 border-b border-primary/20">Cabinets</h3>
                          <ul className="space-y-2">
                            {["Chest of Drawers","Display Units","TV units","Shoe Racks","Book Shelves"].map(item => (
                              <li key={item}><Link href={`/category?type=cabinets&tab=${item}`} onClick={() => setIsAllProductsOpen(false)} className="text-[13px] text-gray-600 hover:text-primary transition-colors block hover:translate-x-0.5 duration-150">{item}</Link></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 pb-1.5 border-b border-primary/20">Home Lockers</h3>
                          <ul className="space-y-2">
                            {["Digital Lockers","Biometric Lockers","Manual Lockers"].map(item => (
                              <li key={item}><Link href={`/category?type=lockers&tab=${item}`} onClick={() => setIsAllProductsOpen(false)} className="text-[13px] text-gray-600 hover:text-primary transition-colors block hover:translate-x-0.5 duration-150">{item}</Link></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 pb-1.5 border-b border-primary/20">Chairs</h3>
                          <ul className="space-y-2">
                            {["Leisure Chairs","Wing Chairs","Easy Chairs"].map(item => (
                              <li key={item}><Link href={`/category?type=chairs&tab=${item}`} onClick={() => setIsAllProductsOpen(false)} className="text-[13px] text-gray-600 hover:text-primary transition-colors block hover:translate-x-0.5 duration-150">{item}</Link></li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Column 5 â€” Office, Kitchen & Soft */}
                      <div className="p-6 flex flex-col space-y-6">
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 pb-1.5 border-b border-primary/20">Office &amp; Study</h3>
                          <ul className="space-y-2">
                            {[
                              {label:"Work Chairs",href:"/category?type=office-chairs&tab=Work Chairs"},
                              {label:"Gaming Chairs",href:"/category?type=office-chairs&tab=Gaming Chairs"},
                              {label:"Work Desks & Study Tables",href:"/category?type=office-tables&tab=Work Desks & Study Tables"},
                              {label:"Corner Tables",href:"/category?type=office-tables&tab=Corner Tables"}
                            ].map(item => (
                              <li key={item.label}><Link href={item.href} onClick={() => setIsAllProductsOpen(false)} className="text-[13px] text-gray-600 hover:text-primary transition-colors block hover:translate-x-0.5 duration-150">{item.label}</Link></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 pb-1.5 border-b border-primary/20">Modular Kitchen</h3>
                          <ul className="space-y-2">
                            {["L-Shaped Kitchens","U-Shaped Kitchens","Straight Kitchens"].map(item => (
                              <li key={item}><Link href={`/category?type=modular-kitchens&tab=${item}`} onClick={() => setIsAllProductsOpen(false)} className="text-[13px] text-gray-600 hover:text-primary transition-colors block hover:translate-x-0.5 duration-150">{item}</Link></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 pb-1.5 border-b border-primary/20">Soft Furnishing</h3>
                          <ul className="space-y-2">
                            {[{label:"Curtains & Drapes",href:"/category?type=soft-furnishing&tab=Curtains"},{label:"Cushions & Covers",href:"/category?type=soft-furnishing&tab=Cushions"},{label:"Bed Linen",href:"/category?type=soft-furnishing&tab=Bed Linen"}].map(item => (
                              <li key={item.label}><Link href={item.href} onClick={() => setIsAllProductsOpen(false)} className="text-[13px] text-gray-600 hover:text-primary transition-colors block hover:translate-x-0.5 duration-150">{item.label}</Link></li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </li>
              <li className="py-4"><Link href="/category" className="hover:text-primary transition text-red-500 font-semibold">Offers</Link></li>
            </ul>
          </div>
        </nav>

        {/* Mobile Accordion Collapsible Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-y-auto max-h-[calc(100vh-80px)] animate-in slide-in-from-top duration-300">
            <div className="px-6 py-4 flex flex-col space-y-4">
              {/* Search Bar on Mobile */}
              <div className="relative md:hidden w-full">
                <input type="text" placeholder="Search for Furniture..." className="w-full bg-gray-100 rounded-full py-2.5 pl-5 pr-12 outline-none" />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
                  <i className="fas fa-search text-lg"></i>
                </button>
              </div>

              {/* Accordion Navigation */}
              <div className="flex flex-col divide-y divide-gray-100">
                <div className="py-3">
                  <span className="font-bold text-gray-800 mb-2 block">Living room</span>
                  <ul className="pl-2 space-y-3 text-sm text-gray-700">
                    {LIVING_ROOM_CATEGORIES.map(cat => (
                      <li key={cat.id} className="border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                        <Link href={cat.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary font-bold text-gray-800 block py-1">
                          {cat.name}
                        </Link>
                        {cat.items && (
                          <ul className="pl-4 mt-1 space-y-1.5 text-xs text-gray-500 border-l border-gray-100 ml-1">
                            {cat.items.map(sub => (
                              <li key={sub.name}>
                                <Link href={sub.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary block py-0.5">
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="py-3">
                  <span className="font-bold text-gray-800 mb-2 block">Bedroom</span>
                  <ul className="pl-2 space-y-3 text-sm text-gray-700">
                    {BEDROOM_CATEGORIES.map(cat => (
                      <li key={cat.id} className="border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                        <Link href={cat.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary font-bold text-gray-800 block py-1">
                          {cat.name}
                        </Link>
                        {cat.items && (
                          <ul className="pl-4 mt-1 space-y-1.5 text-xs text-gray-500 border-l border-gray-100 ml-1">
                            {cat.items.map(sub => (
                              <li key={sub.name}>
                                <Link href={sub.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary block py-0.5">
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="py-3">
                  <span className="font-bold text-gray-800">Dining room</span>
                  <ul className="pl-4 mt-2 space-y-2 text-sm text-gray-600">
                    {DINING_ROOM_CATEGORIES.map(cat => (
                      <li key={cat.id}><Link href={cat.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary block py-1">{cat.name}</Link></li>
                    ))}
                  </ul>
                </div>
                <div className="py-3">
                  <span className="font-bold text-gray-800 mb-2 block">Office and Study</span>
                  <ul className="pl-2 space-y-3 text-sm text-gray-700">
                    {OFFICE_CATEGORIES.map(cat => (
                      <li key={cat.id} className="border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                        <Link href={cat.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary font-bold text-gray-800 block py-1">
                          {cat.name}
                        </Link>
                        {cat.items && (
                          <ul className="pl-4 mt-1 space-y-1.5 text-xs text-gray-500 border-l border-gray-100 ml-1">
                            {cat.items.map(sub => (
                              <li key={sub.name}>
                                <Link href={sub.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary block py-0.5">
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="py-3">
                  <span className="font-bold text-gray-800 mb-2 block">Modular Kitchens</span>
                  <ul className="pl-2 space-y-3 text-sm text-gray-700">
                    {KITCHEN_CATEGORIES.map(cat => (
                      <li key={cat.id} className="border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                        <Link href={cat.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary font-bold text-gray-800 block py-1">
                          {cat.name}
                        </Link>
                        {cat.items && (
                          <ul className="pl-4 mt-1 space-y-1.5 text-xs text-gray-500 border-l border-gray-100 ml-1">
                            {cat.items.map(sub => (
                              <li key={sub.name}>
                                <Link href={sub.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary block py-0.5">
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="py-3">
                  <Link href="/category" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-gray-800 hover:text-primary block">
                    All Products
                  </Link>
                </div>
                <div className="py-3">
                  <Link href="/category" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-red-500 hover:text-red-600 block">
                    Offers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
