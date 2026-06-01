"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { defaultProducts } from "@/data/products";


export default function Category() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex flex-col justify-between animate-pulse">
        <Header />
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="h-12 w-12 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    }>
      <CategoryContent />
    </Suspense>
  );
}

function getDefaultTab(type: string): string {
  switch (type) {
    case "tables":
      return "Coffee Tables";
    case "bean-bags":
      return "Bean Bags";
    case "cabinets":
      return "Books Shelves";
    case "chairs":
      return "Leisure Chairs";
    case "soft-furnishing":
      return "Pillows";
    case "almirahs":
      return "Steel Almirahs";
    case "beds":
      return "King Beds";
    case "mattresses":
      return "Beds and mattress set";
    case "bedroom-tables":
      return "Corner Tables";
    case "bedroom-chairs":
      return "Work Chairs";
    case "lockers":
      return "Digital Lockers";
    case "dining-sets":
      return "4 seats";
    case "dining-tables":
      return "4 seater";
    case "dining-chairs":
      return "Dining Chairs";
    case "dining-benches":
      return "Dining Benches";
    case "dining-accessories":
      return "Table Mats";
    case "office-chairs":
      return "Work Chairs";
    case "office-tables":
      return "Work Desks & Study Tables";
    case "modular-kitchens":
      return "L-Shaped Kitchens";
    default:
      return "Sofas";
  }
}

function getCategoryName(type: string, activeTab: string): string {
  switch (type) {
    case "tables":
      return "Tables";
    case "bean-bags":
      return "Bean Bags & Pouffes";
    case "cabinets":
      return "Cabinets";
    case "chairs":
      return "Chairs";
    case "soft-furnishing":
      return "Soft Furnishing";
    case "almirahs":
      return "Almirahs & Wardrobes";
    case "beds":
      return "Beds & Bed Frames";
    case "mattresses":
      return "Mattresses & Bed Sets";
    case "bedroom-tables":
      return "Bedroom Tables";
    case "bedroom-chairs":
      return "Bedroom Chairs";
    case "lockers":
      return "Home Lockers";
    case "dining-sets":
      return "Dining Sets";
    case "dining-tables":
      return "Dining Tables";
    case "dining-chairs":
      return "Dining Chairs";
    case "dining-benches":
      return "Dining Benches";
    case "dining-accessories":
      return "Dining Accessories";
    case "office-chairs":
      return "Office Chairs";
    case "office-tables":
      return "Office & Study Tables";
    case "modular-kitchens":
      return "Modular Kitchen Sets";
    default:
      return activeTab;
  }
}

function CategoryContent() {

  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "sofas";
  const query = searchParams.get("q") || "";

  const isTables = type === "tables";
  const isBeanBags = type === "bean-bags";
  const isCabinets = type === "cabinets";
  const isChairs = type === "chairs";
  const isSoftFurnishing = type === "soft-furnishing";
  const isAlmirahs = type === "almirahs";
  const isBeds = type === "beds";
  const isMattresses = type === "mattresses";
  const isBedroomTables = type === "bedroom-tables";
  const isBedroomChairs = type === "bedroom-chairs";
  const isLockers = type === "lockers";
  const isDiningSets = type === "dining-sets";
  const isDiningTables = type === "dining-tables";
  const isDiningChairs = type === "dining-chairs";
  const isDiningBenches = type === "dining-benches";
  const isDiningAccessories = type === "dining-accessories";
  const isOfficeChairs = type === "office-chairs";
  const isOfficeTables = type === "office-tables";
  const isModularKitchens = type === "modular-kitchens";

  const subCategories = useMemo(() => {
    if (isTables) {
      return ["Coffee Tables", "Corner Tables"];
    }
    if (isBeanBags) {
      return ["Bean Bags", "Pouffes", "Ottomans"];
    }
    if (isCabinets) {
      return ["Books Shelves", "Display Units", "TV units", "Shoes  Racks", "Chest of Drawers"];
    }
    if (isDiningSets) {
      return ["4 seats", "6 seater", "8 seater"];
    }
    if (isDiningTables) {
      return ["4 seater", "6 seater", "8 seater"];
    }
    if (isDiningChairs) {
      return ["Dining Chairs"];
    }
    if (isDiningBenches) {
      return ["Dining Benches"];
    }
    if (isDiningAccessories) {
      return ["Table Mats", "Table Runners"];
    }
    if (isOfficeChairs) {
      return ["Work Chairs", "Gaming Chairs"];
    }
    if (isOfficeTables) {
      return ["Work Desks & Study Tables", "Corner Tables"];
    }
    if (isModularKitchens) {
      return ["L-Shaped Kitchens", "U-Shaped Kitchens", "Straight Kitchens"];
    }
    if (isChairs) {
      return ["Leisure Chairs", "Wing Chairs", "Easy Chairs"];
    }
    if (isSoftFurnishing) {
      return ["Pillows", "Cusion Covers", "Throws", "Rugs"];
    }
    if (isAlmirahs) {
      return [
        "Steel Almirahs",
        "Wooden Wardrobes",
        "2 Door Wardrobes",
        "3 Door Wardrobes",
        "4 Door Wardrobes",
        "Sliding Wardrobes"
      ];
    }
    if (isBeds) {
      return [
        "King Beds",
        "Queen Beds",
        "Single Beds",
        "Homecare Beds",
        "Wooden Beds",
        "Metal Beds",
        "Double Beds"
      ];
    }
    if (isMattresses) {
      return [
        "Beds and mattress set",
        "Orthopedic Mattresses",
        "Memory Foam Mattresses",
        "Latex Mattresses",
        "Spring Mattresses"
      ];
    }
    if (isBedroomTables) {
      return ["Corner Tables", "Bedside Tables", "Dressing Tables"];
    }
    if (isBedroomChairs) {
      return ["Work Chairs", "Gaming Chairs"];
    }
    if (isLockers) {
      return ["Digital Lockers", "Biometric Lockers", "Manual Lockers"];
    }
    return [
      "Sofas",
      "Recliner Sofas",
      "Sofa sets",
      "Sofa cum beds",
      "L shaped and corner sofa",
      "2-Seater Sofas",
      "1-Seater Sofas",
      "3-Seater Sofas"
    ];
  }, [isTables, isBeanBags, isCabinets, isChairs, isSoftFurnishing, isAlmirahs, isBeds, isMattresses, isBedroomTables, isBedroomChairs, isLockers, isDiningSets, isDiningTables, isDiningChairs, isDiningBenches, isDiningAccessories, isOfficeChairs, isOfficeTables, isModularKitchens]);

  const [activeTab, setActiveTab] = useState(getDefaultTab(type));

  // Keep state updated if type or query parameter changes
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && subCategories.includes(tabParam)) {
      setActiveTab(tabParam);
    } else {
      setActiveTab(getDefaultTab(type));
    }
  }, [type, searchParams, subCategories]);



  const filteredProducts = useMemo(() => {
    if (query) {
      return defaultProducts.filter(
        p => p.name.toLowerCase().includes(query.toLowerCase()) || 
             p.description.toLowerCase().includes(query.toLowerCase()) ||
             p.category.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (isTables) {
      let tables = defaultProducts.filter(p => p.category === "tables");
      if (activeTab === "Coffee Tables") {
        return tables.filter(p => p.name.toLowerCase().includes("coffee"));
      }
      if (activeTab === "Corner Tables") {
        return tables.filter(p => p.name.toLowerCase().includes("corner") || p.name.toLowerCase().includes("side"));
      }
      return tables;
    } else if (isBeanBags) {
      let beanBags = defaultProducts.filter(p => p.category === "bean-bags");
      if (activeTab === "Bean Bags") {
        return beanBags.filter(p => p.name.toLowerCase().includes("bean"));
      }
      if (activeTab === "Pouffes") {
        return beanBags.filter(p => p.name.toLowerCase().includes("pouffe"));
      }
      if (activeTab === "Ottomans") {
        return beanBags.filter(p => p.name.toLowerCase().includes("ottoman"));
      }
      return beanBags;
    } else if (isCabinets) {
      let cabinets = defaultProducts.filter(p => p.category === "cabinets");
      if (activeTab === "Books Shelves") {
        return cabinets.filter(p => p.name.toLowerCase().includes("shelf") || p.name.toLowerCase().includes("shelves") || p.name.toLowerCase().includes("book"));
      }
      if (activeTab === "Display Units") {
        return cabinets.filter(p => p.name.toLowerCase().includes("display"));
      }
      if (activeTab === "TV units") {
        return cabinets.filter(p => p.name.toLowerCase().includes("tv"));
      }
      if (activeTab === "Shoes  Racks") {
        return cabinets.filter(p => p.name.toLowerCase().includes("shoe") || p.name.toLowerCase().includes("shoes") || p.name.toLowerCase().includes("rack"));
      }
      if (activeTab === "Chest of Drawers") {
        return cabinets.filter(p => p.name.toLowerCase().includes("drawer") || p.description.toLowerCase().includes("drawer") || p.name.toLowerCase().includes("chest"));
      }
      return cabinets;
    } else if (isChairs) {
      let chairs = defaultProducts.filter(p => p.category === "chairs");
      if (activeTab === "Leisure Chairs") {
        return chairs.filter(p => p.name.toLowerCase().includes("leisure"));
      }
      if (activeTab === "Wing Chairs") {
        return chairs.filter(p => p.name.toLowerCase().includes("wing"));
      }
      if (activeTab === "Easy Chairs") {
        return chairs.filter(p => p.name.toLowerCase().includes("easy"));
      }
      return chairs;
    } else if (isSoftFurnishing) {
      let softFurnishing = defaultProducts.filter(p => p.category === "soft-furnishing");
      if (activeTab === "Pillows") {
        return softFurnishing.filter(p => p.name.toLowerCase().includes("pillow"));
      }
      if (activeTab === "Cusion Covers") {
        return softFurnishing.filter(p => p.name.toLowerCase().includes("cusion") || p.name.toLowerCase().includes("cushion") || p.name.toLowerCase().includes("cover"));
      }
      if (activeTab === "Throws") {
        return softFurnishing.filter(p => p.name.toLowerCase().includes("throw") || p.name.toLowerCase().includes("blanket"));
      }
      if (activeTab === "Rugs") {
        return softFurnishing.filter(p => p.name.toLowerCase().includes("rug") || p.name.toLowerCase().includes("carpet"));
      }
      return softFurnishing;
    } else if (isAlmirahs) {
      let almirahs = defaultProducts.filter(p => p.category === "wardrobes" || p.category === "almirahs");
      if (activeTab === "Steel Almirahs") {
        return almirahs.filter(p => p.name.toLowerCase().includes("steel") || p.material.toLowerCase() === "steel");
      }
      if (activeTab === "Wooden Wardrobes") {
        return almirahs.filter(p => p.name.toLowerCase().includes("wood") || p.name.toLowerCase().includes("wooden") || p.material.toLowerCase() === "wood" || p.material.toLowerCase() === "engineered wood");
      }
      if (activeTab === "2 Door Wardrobes") {
        return almirahs.filter(p => p.name.toLowerCase().includes("2-door") || p.name.toLowerCase().includes("2 door") || p.description.toLowerCase().includes("2-door") || p.description.toLowerCase().includes("2 door"));
      }
      if (activeTab === "3 Door Wardrobes") {
        return almirahs.filter(p => p.name.toLowerCase().includes("3-door") || p.name.toLowerCase().includes("3 door") || p.description.toLowerCase().includes("3-door") || p.description.toLowerCase().includes("3 door"));
      }
      if (activeTab === "4 Door Wardrobes") {
        return almirahs.filter(p => p.name.toLowerCase().includes("4-door") || p.name.toLowerCase().includes("4 door") || p.description.toLowerCase().includes("4-door") || p.description.toLowerCase().includes("4 door"));
      }
      if (activeTab === "Sliding Wardrobes") {
        return almirahs.filter(p => p.name.toLowerCase().includes("sliding") || p.description.toLowerCase().includes("sliding"));
      }
      return almirahs;
    } else if (isBeds) {
      let beds = defaultProducts.filter(p => p.category === "beds" || p.category === "bed-sets");
      if (activeTab === "King Beds") {
        return beds.filter(p => p.name.toLowerCase().includes("king") || p.description.toLowerCase().includes("king"));
      }
      if (activeTab === "Queen Beds") {
        return beds.filter(p => p.name.toLowerCase().includes("queen") || p.description.toLowerCase().includes("queen"));
      }
      if (activeTab === "Single Beds") {
        return beds.filter(p => p.name.toLowerCase().includes("single") || p.description.toLowerCase().includes("single"));
      }
      if (activeTab === "Homecare Beds") {
        return beds.filter(p => p.name.toLowerCase().includes("homecare") || p.name.toLowerCase().includes("medical") || p.description.toLowerCase().includes("homecare") || p.description.toLowerCase().includes("adjustable"));
      }
      if (activeTab === "Wooden Beds") {
        return beds.filter(p => p.name.toLowerCase().includes("wood") || p.name.toLowerCase().includes("wooden") || p.material.toLowerCase() === "wood" || p.material.toLowerCase() === "engineered wood");
      }
      if (activeTab === "Metal Beds") {
        return beds.filter(p => p.name.toLowerCase().includes("metal") || p.name.toLowerCase().includes("steel") || p.material.toLowerCase() === "metal" || p.material.toLowerCase() === "steel");
      }
      if (activeTab === "Double Beds") {
        return beds.filter(p => p.name.toLowerCase().includes("double") || p.name.toLowerCase().includes("king") || p.name.toLowerCase().includes("queen") || p.description.toLowerCase().includes("double") || p.description.toLowerCase().includes("king"));
      }
      return beds;
    } else if (isMattresses) {
      let mattresses = defaultProducts.filter(p => p.category === "mattresses" || p.category === "bed-sets" || p.category === "beds");
      if (activeTab === "Beds and mattress set") {
        return mattresses.filter(p => p.category === "bed-sets" || p.name.toLowerCase().includes("set") || p.description.toLowerCase().includes("set") || p.name.toLowerCase().includes("combo"));
      }
      if (activeTab === "Orthopedic Mattresses") {
        return mattresses.filter(p => p.name.toLowerCase().includes("ortho") || p.description.toLowerCase().includes("ortho") || p.name.toLowerCase().includes("spine"));
      }
      if (activeTab === "Memory Foam Mattresses") {
        return mattresses.filter(p => p.name.toLowerCase().includes("memory") || p.description.toLowerCase().includes("memory"));
      }
      if (activeTab === "Latex Mattresses") {
        return mattresses.filter(p => p.name.toLowerCase().includes("latex") || p.description.toLowerCase().includes("latex"));
      }
      if (activeTab === "Spring Mattresses") {
        return mattresses.filter(p => p.name.toLowerCase().includes("spring") || p.description.toLowerCase().includes("spring") || p.name.toLowerCase().includes("coil"));
      }
      return mattresses;
    } else if (isDiningSets) {
      let dining = defaultProducts.filter(p => p.category === "dining");
      if (activeTab === "4 seats") {
        return dining.filter(p => p.name.toLowerCase().includes("4") || p.description.toLowerCase().includes("4"));
      }
      if (activeTab === "6 seater") {
        return dining.filter(p => p.name.toLowerCase().includes("6") || p.description.toLowerCase().includes("6"));
      }
      if (activeTab === "8 seater") {
        return dining.filter(p => p.name.toLowerCase().includes("8") || p.description.toLowerCase().includes("8"));
      }
      return dining;
    } else if (isDiningTables) {
      let diningTables = defaultProducts.filter(p => p.category === "dining-tables");
      if (activeTab === "4 seater") {
        return diningTables.filter(p => p.name.toLowerCase().includes("4") || p.description.toLowerCase().includes("4"));
      }
      if (activeTab === "6 seater") {
        return diningTables.filter(p => p.name.toLowerCase().includes("6") || p.description.toLowerCase().includes("6"));
      }
      if (activeTab === "8 seater") {
        return diningTables.filter(p => p.name.toLowerCase().includes("8") || p.description.toLowerCase().includes("8"));
      }
      return diningTables;
    } else if (isDiningChairs) {
      let diningChairs = defaultProducts.filter(p => p.category === "dining-chairs");
      return diningChairs;
    } else if (isDiningBenches) {
      let diningBenches = defaultProducts.filter(p => p.category === "dining-benches");
      return diningBenches;
    } else if (isDiningAccessories) {
      let diningAcc = defaultProducts.filter(p => p.category === "dining-accessories");
      if (activeTab === "Table Mats") {
        return diningAcc.filter(p => p.name.toLowerCase().includes("mat") || p.name.toLowerCase().includes("mats") || p.description.toLowerCase().includes("mat"));
      }
      if (activeTab === "Table Runners") {
        return diningAcc.filter(p => p.name.toLowerCase().includes("runner") || p.name.toLowerCase().includes("runners") || p.description.toLowerCase().includes("runner"));
      }
      return diningAcc;
    } else if (isOfficeChairs) {
      let chairs = defaultProducts.filter(p => p.category === "office-chairs" || p.category === "office" || p.category === "bedroom-chairs");
      if (activeTab === "Work Chairs") {
        return chairs.filter(p => p.name.toLowerCase().includes("work") || p.name.toLowerCase().includes("office") || p.name.toLowerCase().includes("ergonomic") || p.description.toLowerCase().includes("office") || p.description.toLowerCase().includes("armrests"));
      }
      if (activeTab === "Gaming Chairs") {
        return chairs.filter(p => p.name.toLowerCase().includes("gaming") || p.description.toLowerCase().includes("gaming"));
      }
      return chairs;
    } else if (isOfficeTables) {
      let tables = defaultProducts.filter(p => p.category === "office-tables" || p.category === "office");
      if (activeTab === "Work Desks & Study Tables") {
        return tables.filter(p => p.name.toLowerCase().includes("study") || p.name.toLowerCase().includes("desk") || p.description.toLowerCase().includes("study") || p.description.toLowerCase().includes("desk"));
      }
      if (activeTab === "Corner Tables") {
        return defaultProducts.filter(p => (p.category === "tables" || p.category === "office-tables" || p.category === "office" || p.category === "bedroom-tables") && (p.name.toLowerCase().includes("corner") || p.name.toLowerCase().includes("side")));
      }
      return tables;
    } else if (isModularKitchens) {
      let kitchens = defaultProducts.filter(p => p.category === "modular-kitchens" || p.category === "kitchen");
      if (activeTab === "L-Shaped Kitchens") {
        return kitchens.filter(p => p.name.toLowerCase().includes("l-shaped") || p.name.toLowerCase().includes("l shaped") || p.description.toLowerCase().includes("l-shaped") || p.description.toLowerCase().includes("l shaped"));
      }
      if (activeTab === "U-Shaped Kitchens") {
        return kitchens.filter(p => p.name.toLowerCase().includes("u-shaped") || p.name.toLowerCase().includes("u shaped") || p.description.toLowerCase().includes("u-shaped") || p.description.toLowerCase().includes("u shaped"));
      }
      if (activeTab === "Straight Kitchens") {
        return kitchens.filter(p => p.name.toLowerCase().includes("straight") || p.description.toLowerCase().includes("straight") || p.name.toLowerCase().includes("linear") || p.description.toLowerCase().includes("linear"));
      }
      return kitchens;
    } else if (isBedroomTables) {
      let tables = defaultProducts.filter(p => p.category === "bedroom-tables");
      if (activeTab === "Corner Tables") {
        let filtered = tables.filter(p => p.name.toLowerCase().includes("corner") || p.description.toLowerCase().includes("corner") || p.name.toLowerCase().includes("side"));
        if (filtered.length === 0) {
          return defaultProducts.filter(p => p.category === "tables" && (p.name.toLowerCase().includes("corner") || p.name.toLowerCase().includes("side")));
        }
        return filtered;
      }
      if (activeTab === "Bedside Tables") {
        return tables.filter(p => p.name.toLowerCase().includes("bedside") || p.name.toLowerCase().includes("nightstand") || p.description.toLowerCase().includes("bedside"));
      }
      if (activeTab === "Dressing Tables") {
        return tables.filter(p => p.name.toLowerCase().includes("dress") || p.name.toLowerCase().includes("dresser") || p.name.toLowerCase().includes("vanity") || p.description.toLowerCase().includes("mirror"));
      }
      return tables;
    } else if (isBedroomChairs) {
      let chairs = defaultProducts.filter(p => p.category === "bedroom-chairs");
      if (activeTab === "Work Chairs") {
        return defaultProducts.filter(p => p.category === "office" && (p.name.toLowerCase().includes("chair") || p.name.toLowerCase().includes("desk")));
      }
      if (activeTab === "Gaming Chairs") {
        return chairs.filter(p => p.name.toLowerCase().includes("gaming") || p.description.toLowerCase().includes("gaming"));
      }
      return chairs;
    } else if (isLockers) {
      let lockers = defaultProducts.filter(p => p.category === "lockers");
      if (activeTab === "Digital Lockers") {
        return lockers.filter(p => p.name.toLowerCase().includes("digital") || p.description.toLowerCase().includes("electronic") || p.description.toLowerCase().includes("pin"));
      }
      if (activeTab === "Biometric Lockers") {
        return lockers.filter(p => p.name.toLowerCase().includes("biometric") || p.name.toLowerCase().includes("fingerprint") || p.description.toLowerCase().includes("biometric"));
      }
      if (activeTab === "Manual Lockers") {
        return lockers.filter(p => p.name.toLowerCase().includes("manual") || p.name.toLowerCase().includes("key") || p.description.toLowerCase().includes("manual") || p.description.toLowerCase().includes("key"));
      }
      return lockers;
    } else {
      // Filter only sofas
      let sofas = defaultProducts.filter(p => p.category === "sofas");
      
      // Filter based on activeTab subcategories
      if (activeTab === "Recliner Sofas") {
        return sofas.filter(p => p.name.toLowerCase().includes("recliner"));
      }
      if (activeTab === "Sofa cum beds") {
        return sofas.filter(p => p.name.toLowerCase().includes("bed"));
      }
      if (activeTab === "L shaped and corner sofa") {
        return sofas.filter(p => p.name.toLowerCase().includes("shaped") || p.name.toLowerCase().includes("corner"));
      }
      if (activeTab === "Sofa sets") {
        return sofas.filter(p => p.name.toLowerCase().includes("set"));
      }
      if (activeTab === "2-Seater Sofas") {
        return sofas.filter(p => p.name.toLowerCase().includes("2-seater"));
      }
      if (activeTab === "1-Seater Sofas") {
        return sofas.filter(p => p.name.toLowerCase().includes("1-seater"));
      }
      if (activeTab === "3-Seater Sofas") {
        return sofas.filter(p => p.name.toLowerCase().includes("3-seater"));
      }
      return sofas;
    }
  }, [isTables, isBeanBags, isCabinets, isChairs, isSoftFurnishing, isAlmirahs, isBeds, isMattresses, isBedroomTables, isBedroomChairs, isLockers, isDiningSets, isDiningTables, isDiningChairs, isDiningBenches, isDiningAccessories, isOfficeChairs, isOfficeTables, isModularKitchens, activeTab, query]);



  return (
    <>
      <Header />
      
      {/* Category Container */}
      <div className="container mx-auto px-4 md:px-8 py-6 flex-grow animate-in fade-in duration-500">
        
        {/* Breadcrumbs */}
        {query ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Search</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{query}</span>
          </div>
        ) : isTables ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Living room</span>
            <span className="text-gray-300">/</span>
            <span>Tables</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isBeanBags ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Living room</span>
            <span className="text-gray-300">/</span>
            <span>Bean bags & pouffes</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isCabinets ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Living room</span>
            <span className="text-gray-300">/</span>
            <span>Cabinets</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isChairs ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Living room</span>
            <span className="text-gray-300">/</span>
            <span>Chairs</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isSoftFurnishing ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Living room</span>
            <span className="text-gray-300">/</span>
            <span>Soft furnishing</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isAlmirahs ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Bedroom</span>
            <span className="text-gray-300">/</span>
            <span>Almirahs & wardrobes</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isBeds ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Bedroom</span>
            <span className="text-gray-300">/</span>
            <span>Beds</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isMattresses ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Bedroom</span>
            <span className="text-gray-300">/</span>
            <span>Mattresses</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isBedroomTables ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Bedroom</span>
            <span className="text-gray-300">/</span>
            <span>Bedroom Tables</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isBedroomChairs ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Bedroom</span>
            <span className="text-gray-300">/</span>
            <span>Bedroom Chairs</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isLockers ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Bedroom</span>
            <span className="text-gray-300">/</span>
            <span>Home Lockers</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isDiningSets ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Dining room</span>
            <span className="text-gray-300">/</span>
            <span>Dining Sets</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isDiningTables ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Dining room</span>
            <span className="text-gray-300">/</span>
            <span>Dining Tables</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isDiningChairs ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Dining room</span>
            <span className="text-gray-300">/</span>
            <span>Dining Chairs</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isDiningBenches ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Dining room</span>
            <span className="text-gray-300">/</span>
            <span>Dining Benches</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isDiningAccessories ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Dining room</span>
            <span className="text-gray-300">/</span>
            <span>Dining Accessories</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isOfficeChairs ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Office & Study</span>
            <span className="text-gray-300">/</span>
            <span>Chairs</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isOfficeTables ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Office & Study</span>
            <span className="text-gray-300">/</span>
            <span>Tables</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : isModularKitchens ? (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Modular Kitchens</span>
            <span className="text-gray-300">/</span>
            <span>Kitchen Sets</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        ) : (
          <div className="text-xs text-gray-400 font-medium flex items-center space-x-1.5 mb-6">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>Living room</span>
            <span className="text-gray-300">/</span>
            <span>Sofas & Loungers</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-semibold">{activeTab}</span>
          </div>
        )}

        {/* Category Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 px-4">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span>{query ? `Search Results for "${query}"` : getCategoryName(type, activeTab)}</span>
            <span className="text-sm font-normal text-gray-400 bg-gray-100 rounded-full px-3 py-1">
              {filteredProducts.length} Products
            </span>
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed font-medium">
            {query 
              ? `Showing search results for "${query}" found across all furniture categories.`
              : (isTables 
                  ? "Explore our gorgeous collection of designer coffee tables and sleek corner end tables, designed to elevate your living room decor and add functional utility to your home."
                  : isBeanBags
                    ? "Unwind in ultimate comfort with our collection of premium, durable bean bags, handcrafted floor pouffes, and elegant storage ottomans, designed for cozy living."
                    : isCabinets
                      ? "Organize your living space elegantly with our premium collection of Books Shelves, designer Display Units, high-performance TV Units, and spacious Shoes Racks."
                      : isChairs
                        ? "Sit back and relax in absolute style with our curated collection of cozy Leisure Chairs, high-back Wing Chairs, and ergonomic Easy Chairs."
                        : isBedroomTables
                          ? "Discover our elegant collection of bedroom tables, including beautiful nightstands, bedside drawer tables, and premium vanity dressing tables with LED mirrors."
                          : isBedroomChairs
                            ? "Find the perfect seating with our selection of work-from-home study chairs and heavy-duty immersive RGB-lit gaming chairs designed for ultimate comfort."
                            : isLockers
                              ? "Secure your valuable items with our high-security home lockers, offering smart digital PIN keys, premium biometric fingerprint entry, and robust manual key vaults."
                              : isDiningSets
                                ? "Bring families together with our beautiful range of premium 4 seats, 6 seater, and luxury 8 seater dining sets, crafted for memorable dining experiences."
                                : isDiningTables
                                  ? "Enhance your dining space with our exquisite collection of premium 4 seater glass tables, handcrafted solid walnut 6 seater tables, and luxury extendable mahogany 8 seater dining tables."
                                  : isDiningChairs
                                    ? "Dine in comfort and style with our gorgeous curated collection of premium upholstered fabric velvet dining chairs and natural solid wood dining chairs."
                                      : isDiningBenches
                                        ? "Add versatile and space-saving seating to your dining space with our exquisite collection of premium upholstered velvet benches and handcrafted oak slatted dining benches."
                                        : isDiningAccessories
                                          ? "Elevate your table setting with our premium collection of luxury woven cotton table mats and exquisite handcrafted linen table runners."
                                          : isOfficeChairs
                                            ? "Enhance your workspace productivity and comfort with our premium range of ergonomic work chairs and immersive carbon-fiber gaming chairs."
                                            : isOfficeTables
                                              ? "Design an inspiring and clutter-free workspace with our premium collection of solid wood study desks, smart work tables, and space-saving corner tables."
                                              : isModularKitchens
                                                ? "Cook in style with our premium collection of L-shaped, U-shaped, and straight modular kitchen sets, featuring robust water-resistant cabinetry and modern stove integrations."
                                                : ""
                )
            }
            {!query && isSoftFurnishing && "Decorate your home with our luxury range of premium, organic support Pillows, square Cusion Covers, cozy knitted Sofa Throws, and plush wool Rugs."}
            {!query && isAlmirahs && "Organize your bedroom beautifully with our premium selection of heavy-duty Steel Almirahs, elegant Wooden Wardrobes, spacious 2, 3, or 4 Door Wardrobes, and sleek modern Sliding Wardrobes."}
            {!query && isBeds && "Experience sleep at its finest with our curated selection of premium master King Beds, comfortable Queen Beds, space-saving Single Beds, motorized Homecare Beds, handcrafted Wooden Beds, sleek Metal Beds, and luxury Double Beds."}
            {!query && isMattresses && "Discover ultimate sleep luxury with our premium range of complete Bed and Mattress Sets, orthopedic support mattresses, contouring memory foam, natural organic latex, and pocket spring mattresses."}
            {!query && !isTables && !isBeanBags && !isCabinets && !isChairs && !isSoftFurnishing && !isAlmirahs && !isBeds && !isMattresses && !isBedroomTables && !isBedroomChairs && !isLockers && !isDiningSets && !isDiningTables && !isDiningChairs && !isDiningBenches && !isDiningAccessories && !isOfficeChairs && !isOfficeTables && !isModularKitchens && "A great sofa is the heart of your home. That's why we've designed our collection for unwinding, connecting or working - keeping you comfortable whatever your day holds. Choose from a variety of configurations and finishes to find the perfect style for you."}
          </p>
        </div>

        {/* Horizontal Subcategory Pill Tabs */}
        {!query && (
          <div className="pt-3">
            <div className="flex overflow-x-auto py-2 -mx-4 px-4 md:mx-0 md:px-0 space-x-3 scrollbar-hide justify-start sm:justify-center">
              {subCategories.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-6 py-2.5 rounded-md text-sm font-semibold border transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-[#f5ebd9] border-[#e0cbab] text-[#78593a]"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}



        {/* Product Cards Grid */}
        <div className="py-8">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              <i className={`${isTables ? 'fas fa-table' : (isBeanBags ? 'fas fa-circle animate-bounce' : (isCabinets ? 'fas fa-archive' : (isChairs ? 'fas fa-chair animate-bounce' : 'fas fa-couch')))} text-5xl mb-4 text-gray-300`}></i>
              <p className="font-semibold text-lg">No matching products found in this category.</p>
              <p className="text-sm text-gray-400 mt-1">Try exploring other subcategories above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} showPrice={false} />
              ))}
            </div>
          )}
        </div>
        
      </div>
      
      <Footer />
    </>
  );
}
