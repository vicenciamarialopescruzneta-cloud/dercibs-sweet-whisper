import { WHATSAPP_NUMBER, formatBRL } from "@/lib/constants";
import type { CartItem, Customer } from "@/lib/store";

const DIVIDER = "━━━━━━━━━━━━━━";

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
) {
  const lines: string[] = [];
  lines.push("Olá, Dercibs Doces! 💕");
  lines.push("");
  lines.push(`Me chamo ${customer?.name?.trim() ?? "Cliente"}.`);
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
  lines.push("Aguardo a confirmação do meu pedido! 💕🍰");
  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
