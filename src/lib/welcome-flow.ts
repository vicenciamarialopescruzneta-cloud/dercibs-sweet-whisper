export const WELCOME_LOADING_MS = 5_000;

export function validateWelcomeDetails(name: string, phone: string): "name" | "phone" | null {
  if (name.trim().length < 2) return "name";
  if (phone.trim()) {
    const digits = phone.replace(/\D/g, "");
    const validLength = digits.length === 10 || digits.length === 11 ||
      (digits.startsWith("55") && (digits.length === 12 || digits.length === 13));
    if (!validLength || !/^[\d\s()+-]+$/.test(phone)) return "phone";
  }
  return null;
}

export function scheduleMenuOpening(openMenu: () => void): () => void {
  const timer = setTimeout(openMenu, WELCOME_LOADING_MS);
  return () => clearTimeout(timer);
}