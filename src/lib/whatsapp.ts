import { BRAND_NAME, STORE_LOCATION, WHATSAPP_NUMBER, formatBRL } from "@/lib/constants";
import type { CartItem, Customer } from "@/lib/store";

const DIVIDER = "━━━━━━━━━━━━━━";

export interface CustomerLocation {
  latitude: number;
  longitude: number;
}

export function validateOrder(customer: Customer | null, items: CartItem[]) {
  if (!customer?.name?.trim()) return "Digite seu nome para continuar 💕";
  if (items.length === 0) return "Seu carrinho está vazio 💕";
  const incomplete = items.some(
    (i) =>
      !i.productName ||
      !i.categoryName ||
      !i.sizeLabel ||
      !i.quantity ||
      i.quantity < 1 ||
      !i.unitPrice,
  );
  if (incomplete) return "Alguns itens estão incompletos. Refaça a escolha, por favor 💕";
  return null;
}

export function buildOrderMessage(
  customer: Customer | null,
  items: CartItem[],
  total: number,
  customerLocation?: CustomerLocation | null,
) {
  const lines: string[] = [];
  lines.push("Olá, Dercibs Doces! 💕");
  lines.push("");
  lines.push(`Me chamo ${customer?.name?.trim() ?? "Cliente"}.`);
  if (customer?.phone?.trim()) lines.push(`📱 Meu contato: ${customer.phone.trim()}`);
  lines.push("");
  lines.push("Gostaria de fazer o seguinte pedido:");
  lines.push("");
  lines.push("🍰 MEU PEDIDO");
  lines.push("");
  for (const item of items) {
    lines.push(
      `• ${item.quantity}x ${item.categoryName} — ${item.productName} — ${item.sizeLabel} — ${formatBRL(item.quantity * item.unitPrice)}`,
    );
  }
  lines.push("");
  lines.push(DIVIDER);
  lines.push("");
  lines.push(`💰 TOTAL DO PEDIDO: ${formatBRL(total)}`);
  lines.push("");
  lines.push("📍 LOCALIZAÇÃO DA LOJA / RETIRADA");
  if (STORE_LOCATION.address) {
    lines.push(STORE_LOCATION.address);
    if (STORE_LOCATION.reference) lines.push(`Referência: ${STORE_LOCATION.reference}`);
    if (STORE_LOCATION.mapsUrl) lines.push(STORE_LOCATION.mapsUrl);
  } else {
    lines.push("Por favor, envie o endereço e um ponto de referência para a retirada.");
  }
  if (customerLocation) {
    const customerMapsUrl = `https://www.google.com/maps?q=${customerLocation.latitude},${customerLocation.longitude}`;
    lines.push("");
    lines.push("📍 MINHA LOCALIZAÇÃO (CLIENTE)");
    lines.push(customerMapsUrl);
  }
  lines.push("Por favor, confirme a disponibilidade dos sabores e o horário para retirada.");
  lines.push("");
  lines.push("Aguardo a confirmação do meu pedido! 💕🍰");
  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildContactMessage(name?: string, topic: "contact" | "location" = "contact") {
  const greeting = `Olá, ${BRAND_NAME}! 💕${name?.trim() ? ` Me chamo ${name.trim()}.` : ""}`;
  return [
    greeting,
    "",
    topic === "location"
      ? "Gostaria de saber o endereço, o ponto de referência e o horário para retirada dos doces. Pode me enviar a localização?"
      : "Gostaria de saber mais sobre os sabores disponíveis, os ingredientes e como combinar a retirada do meu pedido.",
    "",
    "Obrigada(o)! 🍰",
  ].join("\n");
}
