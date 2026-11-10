import { describe, expect, it } from "bun:test";
import { SIZES, WHATSAPP_NUMBER, formatBRL } from "./constants";
import { buildOrderMessage, buildContactMessage, buildWhatsAppUrl, validateOrder } from "./whatsapp";
import type { CartItem } from "./store";

function item(name: string, sizeId: "200" | "250", quantity: number, categoryName = "Bolo no Pote"): CartItem {
  const size = SIZES.find((s) => s.id === sizeId);
  if (!size) throw new Error("Missing size");
  return { key: name + sizeId, productId: name, productName: name, categoryName, sizeId, sizeLabel: size.label, unitPrice: size.price, quantity, image: "photo" };
}
const maria = { name: "Maria", phone: "", remember: true };

describe("WhatsApp order invariants", () => {
  it("prices remain 200ml = 10 and 250ml = 12", () => {
    expect(SIZES.map(({ id, price }) => [id, price])).toEqual([["200", 10], ["250", 12]]);
  });
  it("2 Chocolate 200ml subtotal is 20", () => {
    const chocolate = item("Chocolate", "200", 2);
    const subtotal = chocolate.quantity * chocolate.unitPrice;
    expect(subtotal).toBe(20);
    expect(buildOrderMessage(maria, [chocolate], subtotal)).toContain(`2x Bolo no Pote — Chocolate — 200ml — ${formatBRL(20)}`);
  });
  it("2 Chocolate and 1 Ninho give 32 with exactly both product lines", () => {
    const items = [item("Chocolate", "200", 2), item("Ninho", "250", 1)];
    const total = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
    expect(total).toBe(32);
    const message = buildOrderMessage(maria, items, total);
    expect(message.split("\n").filter((s) => s.startsWith("• "))).toHaveLength(2);
    expect(message).toContain(`TOTAL DO PEDIDO: ${formatBRL(32)}`);
  });
  it("3 Oreo 250ml give 36 preserving the real menu category", () => {
    const oreo = item("Oreo", "250", 3, "Torta no Pote");
    expect(oreo.quantity * oreo.unitPrice).toBe(36);
    expect(buildOrderMessage({ ...maria, name: "João" }, [oreo], 36)).toContain(`3x Torta no Pote — Oreo — 250ml — ${formatBRL(36)}`);
  });
  it("targets only the official number and preserves accents, emoji and line breaks", () => {
    expect(WHATSAPP_NUMBER).toBe("559885175955");
    const message = buildOrderMessage({ ...maria, name: "João" }, [item("Maracujá", "250", 1)], 12);
    const url = new URL(buildWhatsAppUrl(message));
    expect(url.pathname).toBe("/559885175955");
    expect(url.searchParams.get("text")).toBe(message);
  });
  it("blocks missing names", () => {
    expect(validateOrder({ ...maria, name: " " }, [item("Chocolate", "200", 1)])).not.toBeNull();
  });
  it("blocks empty carts", () => {
    expect(validateOrder(maria, [])).not.toBeNull();
  });
  it("blocks incomplete order entries", () => {
    expect(validateOrder(maria, [{ ...item("Chocolate", "200", 1), categoryName: "" }])).not.toBeNull();
  });
  it("uses optional phone and requests unconfirmed location rather than inventing it", () => {
    const message = buildOrderMessage({ ...maria, phone: "(98) 99999-1111" }, [item("Chocolate", "200", 1)], 10);
    expect(message).toContain("(98) 99999-1111");
    expect(message).toContain("Por favor, envie o endereço");
    expect(new URL(buildWhatsAppUrl(buildContactMessage("João", "location"))).searchParams.get("text")).toContain("João");
  });
});