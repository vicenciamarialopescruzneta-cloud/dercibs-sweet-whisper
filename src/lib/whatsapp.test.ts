import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { SIZES, STORE_LOCATION, WHATSAPP_NUMBER, formatBRL } from "./constants";
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
  it("includes the store's confirmed coordinates and Google Maps link", () => {
    const message = buildOrderMessage(maria, [item("Chocolate", "200", 1)], 10);
    assert.ok(STORE_LOCATION.mapsUrl?.includes("-4.1326667,-43.3185556"));
    assert.ok(message.includes("4°07'57.6\"S, 43°19'06.8\"W"));
    assert.ok(message.includes(STORE_LOCATION.mapsUrl ?? ""));
  });
  it("adds the customer's GPS link only when the customer shares it", () => {
    const messageWithoutGps = buildOrderMessage(maria, [item("Chocolate", "200", 1)], 10);
    const messageWithGps = buildOrderMessage(maria, [item("Chocolate", "200", 1)], 10, {
      latitude: -4.13,
      longitude: -43.31,
    });
    assert.ok(!messageWithoutGps.includes("LOCALIZAÇÃO DO CLIENTE / ENTREGA"));
    assert.ok(messageWithGps.includes("https://www.google.com/maps?q=-4.13,-43.31"));
  });
  it("includes the customer's manually saved delivery address", () => {
    const message = buildOrderMessage(maria, [item("Chocolate", "200", 1)], 10, {
      address: "Rua das Flores, 123",
      city: "Afonso Cunha",
      neighborhood: "Centro",
      reference: "Próximo à praça",
    });
    assert.ok(message.includes("Endereço: Rua das Flores, 123"));
    assert.ok(message.includes("Cidade: Afonso Cunha"));
    assert.ok(message.includes("Bairro: Centro"));
    assert.ok(message.includes("Ponto de referência: Próximo à praça"));
  });
  it("uses optional phone and keeps the location contact message", () => {
    const message = buildOrderMessage({ ...maria, phone: "(98) 99999-1111" }, [item("Chocolate", "200", 1)], 10);
    assert.ok(message.includes("(98) 99999-1111"));
    assert.ok(new URL(buildWhatsAppUrl(buildContactMessage("João", "location"))).searchParams.get("text")?.includes("João"));
  });
});
