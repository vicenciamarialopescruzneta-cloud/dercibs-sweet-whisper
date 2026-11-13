import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { SIZES, WHATSAPP_NUMBER, formatBRL } from "./constants";
import { buildOrderMessage, buildContactMessage, buildWhatsAppUrl, validateOrder } from "./whatsapp";
import type { CartItem } from "./store";
import { emptyDeliveryLocation } from "./delivery-location";

function item(name: string, sizeId: "200" | "250", quantity: number, categoryName = "Bolo no Pote"): CartItem {
  const size = SIZES.find((s) => s.id === sizeId);
  if (!size) throw new Error("Missing size");
  return { key: name + sizeId, productId: name, productName: name, categoryName, sizeId, sizeLabel: size.label, unitPrice: size.price, quantity, image: "photo" };
}
const maria = { name: "Maria", phone: "", remember: true };

describe("WhatsApp order invariants", () => {
  it("adds the confirmed customer address when authorized without altering the order total", () => {
    const location = { ...emptyDeliveryLocation(), address: "Rua das Flores, 19", city: "São Luís", neighborhood: "Centro", reference: "Ao lado da praça", shareWithOrder: true };
    const message = buildOrderMessage(maria, [item("Chocolate", "200", 2)], 20, location);
    assert.ok(message.includes(location.address));
    assert.ok(message.includes(location.city));
    assert.ok(message.includes(location.neighborhood));
    assert.ok(message.includes(location.reference));
    assert.ok(message.includes(formatBRL(20)));
    assert.equal(new URL(buildWhatsAppUrl(message)).searchParams.get("text"), message);
  });
  it("does not disclose a saved customer address if sharing was denied", () => {
    const location = { ...emptyDeliveryLocation(), address: "Rua Privada, 19", city: "São Luís" };
    const message = buildOrderMessage(maria, [item("Chocolate", "200", 1)], 10, location);
    assert.equal(message.includes(location.address), false);
    assert.equal(message.includes(location.city), false);
  });
  it("prices remain 200ml = 10 and 250ml = 12", () => {
    assert.deepEqual(SIZES.map(({ id, price }) => [id, price]), [["200", 10], ["250", 12]]);
  });
  it("2 Chocolate 200ml subtotal is 20", () => {
    const chocolate = item("Chocolate", "200", 2);
    const subtotal = chocolate.quantity * chocolate.unitPrice;
    assert.equal(subtotal, 20);
    assert.ok(buildOrderMessage(maria, [chocolate], subtotal).includes(`2x Bolo no Pote — Chocolate — 200ml — ${formatBRL(20)}`));
  });
  it("2 Chocolate and 1 Ninho give 32 with exactly both product lines", () => {
    const items = [item("Chocolate", "200", 2), item("Ninho", "250", 1)];
    const total = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
    assert.equal(total, 32);
    const message = buildOrderMessage(maria, items, total);
    assert.equal(message.split("\n").filter((s) => s.startsWith("• ")).length, 2);
    assert.ok(message.includes(`TOTAL DO PEDIDO: ${formatBRL(32)}`));
  });
  it("3 Oreo 250ml give 36 preserving the real menu category", () => {
    const oreo = item("Oreo", "250", 3, "Torta no Pote");
    assert.equal(oreo.quantity * oreo.unitPrice, 36);
    assert.ok(buildOrderMessage({ ...maria, name: "João" }, [oreo], 36).includes(`3x Torta no Pote — Oreo — 250ml — ${formatBRL(36)}`));
  });
  it("targets only the official number and preserves accents, emoji and line breaks", () => {
    assert.equal(WHATSAPP_NUMBER, "559885175955");
    const message = buildOrderMessage({ ...maria, name: "João" }, [item("Maracujá", "250", 1)], 12);
    const url = new URL(buildWhatsAppUrl(message));
    assert.equal(url.pathname, "/559885175955");
    assert.equal(url.searchParams.get("text"), message);
  });
  it("blocks missing names", () => {
    assert.notEqual(validateOrder({ ...maria, name: " " }, [item("Chocolate", "200", 1)]), null);
  });
  it("blocks empty carts", () => {
    assert.notEqual(validateOrder(maria, []), null);
  });
  it("blocks incomplete order entries", () => {
    assert.notEqual(validateOrder(maria, [{ ...item("Chocolate", "200", 1), categoryName: "" }]), null);
  });
  it("uses optional phone and requests unconfirmed location rather than inventing it", () => {
    const message = buildOrderMessage({ ...maria, phone: "(98) 99999-1111" }, [item("Chocolate", "200", 1)], 10);
    assert.ok(message.includes("(98) 99999-1111"));
    assert.ok(message.includes("Por favor, envie o endereço"));
    assert.ok(new URL(buildWhatsAppUrl(buildContactMessage("João", "location"))).searchParams.get("text")?.includes("João"));
  });
});