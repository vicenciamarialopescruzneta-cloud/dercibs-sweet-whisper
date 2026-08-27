import { WHATSAPP_NUMBER, BRAND_NAME, formatBRL } from "@/lib/constants";
import type { CartItem, Customer } from "@/lib/store";

export function buildOrderMessage(
  customer: Customer | null,
  items: CartItem[],
  total: number,
) {
  const lines: string[] = [];
  lines.push(`*Novo pedido — ${BRAND_NAME}* 🐝`);
  lines.push("");
  lines.push(`*Cliente:* ${customer?.name ?? "Cliente"}`);
  if (customer?.phone) lines.push(`*WhatsApp:* ${customer.phone}`);
  lines.push("");
  lines.push("*Itens:*");
  for (const item of items) {
    lines.push(
      `• ${item.quantity}x ${item.categoryName} ${item.productName} — ${item.sizeLabel} — ${formatBRL(item.quantity * item.unitPrice)}`,
    );
  }
  lines.push("");
  lines.push(`*Total: ${formatBRL(total)}*`);
  lines.push("");
  lines.push("Obrigada pelo carinho! 💗");
  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
