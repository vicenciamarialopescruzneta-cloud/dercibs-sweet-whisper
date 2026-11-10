import { createContext, useContext } from "react";
import type { SizeId } from "@/lib/constants";

export interface CartItem {
  key: string;
  productId: string;
  productName: string;
  categoryName: string;
  sizeId: SizeId;
  sizeLabel: string;
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface Customer {
  name: string;
  phone: string;
  remember: boolean;
}

export interface StoreValue {
  hydrated: boolean;
  customer: Customer | null;
  setCustomer: (c: Customer) => void;
  clearCustomer: () => void;
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (item: Omit<CartItem, "key" | "unitPrice" | "sizeLabel">) => void;
  increment: (key: string) => void;
  decrement: (key: string) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
}

// Keep context identity outside the refreshable provider and its product imports.
export const StoreContext = createContext<StoreValue | null>(null);

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore precisa estar dentro de StoreProvider");
  return ctx;
}