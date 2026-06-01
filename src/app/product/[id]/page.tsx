"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { defaultProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function ProductDetail() {
  const { id } = useParams();
  const product = defaultProducts.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<"none" | "valid" | "invalid">("none");

  useEffect(() => {
    if (product) {
      setSelectedColor(Object.keys(product.colors)[0]);
    }
  }, [product]);

  if (!product) return <div className="text-center py-20 text-2xl font-bold">Product not found</div>;

  const currentImage = product.colors[selectedColor] || product.image;

  const checkPincode = () => {
    if (/^\d{6}$/.test(pincode)) {
      setPincodeStatus("valid");
    } else {
      setPincodeStatus("invalid");
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 md:px-8 py-10 flex-grow">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px]">
              <img src={currentImage} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <span className="capitalize">{product.category}</span>
              <span>/</span>
              <span className="capitalize">{product.material}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-yellow-400 text-sm">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i>
                <span className="text-gray-500 ml-2 font-medium">({product.reviewsCount} Reviews)</span>
              </div>
            </div>
            
            <div className="flex items-end space-x-3 mb-6 pb-6 border-b border-gray-100">
              <span className="text-4xl font-bold text-gray-900">₹{product.price.toLocaleString("en-IN")}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through mb-1">₹{product.originalPrice.toLocaleString("en-IN")}</span>
              )}
              {product.discount && (
                <span className="text-green-600 font-bold mb-1 ml-2">{product.discount}</span>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Color: <span className="font-normal text-gray-600">{selectedColor}</span></h3>
              <div className="flex space-x-3">
                {Object.keys(product.colors).map((color) => (
                  <button 
                    key={color}
                    onClick={() => { setSelectedColor(color); showToast(`Switched color to ${color}`, "info"); }}
                    className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? 'ring-2 ring-primary border-white' : 'border-gray-200'} focus:outline-none`}
                    style={{ backgroundColor: color.includes("Blue") ? "#3B82F6" : color.includes("Black") ? "#1F2937" : color.includes("Walnut") ? "#8B5A2B" : "#D1D5DB" }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <div className="flex space-x-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-lg h-12 px-4 w-32 justify-between">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-primary"><i className="fas fa-minus"></i></button>
                <span className="font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-primary"><i className="fas fa-plus"></i></button>
              </div>
              <button 
                onClick={() => addToCart(product.id, quantity, selectedColor)}
                className="flex-1 bg-primary hover:bg-red-700 text-white font-bold rounded-lg transition shadow-lg shadow-red-500/30 flex items-center justify-center"
              >
                Add to Cart
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-2">Check Delivery & Installation</h3>
              <div className="flex">
                <input 
                  type="text" 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter PIN Code" 
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 focus:outline-none focus:border-primary" 
                />
                <button onClick={checkPincode} className="bg-gray-800 text-white px-6 py-3 rounded-r-lg hover:bg-gray-700 transition">Check</button>
              </div>
              
              {pincodeStatus === "valid" && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                  <div className="flex items-center font-bold mb-1">
                    <i className="fas fa-check-circle mr-2 text-green-600"></i> Delivery & Installation Available
                  </div>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-xs text-green-600 font-medium">
                    <li>Delivery By Monday, 01 Jun</li>
                    <li>Assembly By Thursday, 04 Jun (Free Assembly)</li>
                  </ul>
                </div>
              )}
              {pincodeStatus === "invalid" && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-primary flex items-center font-medium">
                  <i className="fas fa-times-circle mr-2"></i> Please enter a valid 6-digit Indian PIN Code.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
