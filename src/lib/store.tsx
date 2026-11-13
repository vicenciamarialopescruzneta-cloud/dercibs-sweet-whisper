import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SIZES } from "@/lib/constants";
import { PRODUCTS } from "@/data/products";
import { normalizeDeliveryLocation, type DeliveryLocation } from "@/lib/delivery-location";
import { StoreContext, type CartItem, type Customer, type StoreValue } from "@/lib/store-context";
export type { CartItem, Customer } from "@/lib/store-context";

const CART_KEY = "dercibs.cart.v1";
const USER_KEY = "dercibs.customer.v1";
const LOCATION_KEY = "dercibs.delivery-location.v1";

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
  const [deliveryLocation, setDeliveryLocationState] = useState<DeliveryLocation | null>(null);

  useEffect(() => {
    const savedUser = readJSON<Customer>(USER_KEY);
    if (savedUser?.remember) setCustomerState(savedUser);
    setDeliveryLocationState(normalizeDeliveryLocation(readJSON<unknown>(LOCATION_KEY)));
    const savedItems = readJSON<CartItem[]>(CART_KEY) ?? [];
    // Photo updates must also reach previously saved carts, without changing their quantities or prices.
    setItems(savedItems.map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      return product ? { ...item, image: product.image } : item;
    }));
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

  const setDeliveryLocation = useCallback((location: DeliveryLocation) => {
    const confirmed = normalizeDeliveryLocation(location);
    if (!confirmed) return false;
    try {
      localStorage.setItem(LOCATION_KEY, JSON.stringify(confirmed));
      setDeliveryLocationState(confirmed);
      return true;
    } catch {
      return false;
    }
  }, []);

  const clearDeliveryLocation = useCallback(() => {
    try {
      localStorage.removeItem(LOCATION_KEY);
      setDeliveryLocationState(null);
      return true;
    } catch {
      return false;
    }
  }, []);

  const addItem = useCallback<StoreValue["addItem"]>((item) => {
    const size = SIZES.find((s) => s.id === item.sizeId);
    if (!size) return;
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
      deliveryLocation,
      setDeliveryLocation,
      clearDeliveryLocation,
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
    deliveryLocation,
    setDeliveryLocation,
    clearDeliveryLocation,
    addItem,
    increment,
    decrement,
    removeItem,
    clearCart,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

