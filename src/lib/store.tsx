import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SIZES, type SizeId } from "@/lib/constants";

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

const CART_KEY = "dercibs.cart.v1";
const USER_KEY = "dercibs.customer.v1";

interface StoreValue {
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

const StoreContext = createContext<StoreValue | null>(null);

function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [customer, setCustomerState] = useState<Customer | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedUser = readJSON<Customer>(USER_KEY);
    if (savedUser?.remember) setCustomerState(savedUser);
    setItems(readJSON<CartItem[]>(CART_KEY) ?? []);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const setCustomer = useCallback((c: Customer) => {
    setCustomerState(c);
    if (c.remember) localStorage.setItem(USER_KEY, JSON.stringify(c));
    else localStorage.removeItem(USER_KEY);
  }, []);

  const clearCustomer = useCallback(() => {
    setCustomerState(null);
    localStorage.removeItem(USER_KEY);
  }, []);

  const addItem = useCallback<StoreValue["addItem"]>((item) => {
    const size = SIZES.find((s) => s.id === item.sizeId)!;
    const key = `${item.productId}-${item.sizeId}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      }
      return [
        ...prev,
        { ...item, key, unitPrice: size.price, sizeLabel: size.label },
      ];
    });
  }, []);

  const increment = useCallback((key: string) => {
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  }, []);

  const decrement = useCallback((key: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<StoreValue>(() => {
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const total = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
    return {
      hydrated,
      customer,
      setCustomer,
      clearCustomer,
      items,
      itemCount,
      total,
      addItem,
      increment,
      decrement,
      removeItem,
      clearCart,
    };
  }, [
    hydrated,
    customer,
    items,
    setCustomer,
    clearCustomer,
    addItem,
    increment,
    decrement,
    removeItem,
    clearCart,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore precisa estar dentro de StoreProvider");
  return ctx;
}
