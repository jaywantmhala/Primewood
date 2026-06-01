"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

type ToastType = "success" | "error" | "info";

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-md px-4 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center justify-between gap-3 px-6 py-3.5 rounded-lg shadow-xl text-white transition-all duration-300 ${
              toast.type === "success"
                ? "bg-primary"
                : toast.type === "error"
                ? "bg-black"
                : "bg-brandblue"
            }`}
          >
            <div className="flex items-center gap-3">
              <i
                className={`fas ${
                  toast.type === "success" ? "fa-shopping-bag" : "fa-info-circle"
                } text-lg`}
              ></i>
              <span className="font-medium text-sm tracking-wide">
                {toast.message}
              </span>
            </div>
            <button
              className="text-white/80 hover:text-white"
              onClick={() => removeToast(toast.id)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
