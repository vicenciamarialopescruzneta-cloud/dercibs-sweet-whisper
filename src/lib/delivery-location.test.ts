import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildDeliveryLocationLines, emptyDeliveryLocation, normalizeDeliveryLocation } from "./delivery-location";

describe("optional customer location", () => {
  it("does not require a location or GPS", () => {
    assert.equal(normalizeDeliveryLocation(emptyDeliveryLocation()), null);
    assert.deepEqual(buildDeliveryLocationLines(null), []);
  });
  it("accepts a manual address without GPS and retains city, neighborhood and reference", () => {
    const location = normalizeDeliveryLocation({
      ...emptyDeliveryLocation(), address: " Rua das Flores, 19 ", city: " São Luís ", neighborhood: " Centro ", reference: " Ao lado da praça ",
    });
    assert.deepEqual(location, {
      address: "Rua das Flores, 19", city: "São Luís", neighborhood: "Centro", reference: "Ao lado da praça", coordinates: null, shareWithOrder: false,
    });
  });
  it("accepts GPS alone only with valid coordinates", () => {
    const location = normalizeDeliveryLocation({ ...emptyDeliveryLocation(), coordinates: { latitude: -2.53, longitude: -44.3, accuracy: 15 } });
    assert.deepEqual(location?.coordinates, { latitude: -2.53, longitude: -44.3, accuracy: 15 });
    assert.equal(normalizeDeliveryLocation({ ...emptyDeliveryLocation(), coordinates: { latitude: 91, longitude: 0 } }), null);
    assert.equal(normalizeDeliveryLocation({ ...emptyDeliveryLocation(), coordinates: { latitude: 0, longitude: -181 } }), null);
  });
  it("does not share saved personal location without explicit consent", () => {
    assert.deepEqual(buildDeliveryLocationLines({ ...emptyDeliveryLocation(), address: "Rua Privada, 19" }), []);
  });
  it("shares confirmed details and a real map link only when authorized", () => {
    const location = {
      ...emptyDeliveryLocation(), address: "Rua das Flores, 19", city: "São Luís", neighborhood: "Centro", reference: "Ao lado da praça",
      coordinates: { latitude: -2.53, longitude: -44.3, accuracy: 15 }, shareWithOrder: true,
    };
    const result = buildDeliveryLocationLines(location).join("\n");
    for (const value of [location.address, location.city, location.neighborhood, location.reference, "https://www.google.com/maps?q=-2.53,-44.3"])
      assert.ok(result.includes(value));
  });
  it("never trusts a string claiming sharing consent or malformed saved values", () => {
    const value = normalizeDeliveryLocation({ ...emptyDeliveryLocation(), address: "Rua Privada, 19", shareWithOrder: "true" });
    assert.equal(value?.shareWithOrder, false);
    assert.deepEqual(buildDeliveryLocationLines(value), []);
    assert.equal(normalizeDeliveryLocation("invalid"), null);
  });
});