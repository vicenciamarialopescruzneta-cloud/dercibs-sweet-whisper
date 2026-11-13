export interface DeliveryCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number | null;
}

export interface DeliveryLocation {
  address: string;
  city: string;
  neighborhood: string;
  reference: string;
  coordinates: DeliveryCoordinates | null;
  shareWithOrder: boolean;
}

export function emptyDeliveryLocation(): DeliveryLocation {
  return { address: "", city: "", neighborhood: "", reference: "", coordinates: null, shareWithOrder: false };
}

export function normalizeDeliveryLocation(value: unknown): DeliveryLocation | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  const text = (key: string, limit: number) => typeof raw[key] === "string" ? raw[key].trim().slice(0, limit) : "";
  let coordinates: DeliveryCoordinates | null = null;
  if (raw.coordinates && typeof raw.coordinates === "object") {
    const point = raw.coordinates as Record<string, unknown>;
    if (typeof point.latitude === "number" && Number.isFinite(point.latitude) && Math.abs(point.latitude) <= 90 &&
      typeof point.longitude === "number" && Number.isFinite(point.longitude) && Math.abs(point.longitude) <= 180) {
      coordinates = {
        latitude: point.latitude,
        longitude: point.longitude,
        accuracy: typeof point.accuracy === "number" && Number.isFinite(point.accuracy) && point.accuracy >= 0 ? point.accuracy : null,
      };
    }
  }
  const location: DeliveryLocation = {
    address: text("address", 180), city: text("city", 80), neighborhood: text("neighborhood", 80), reference: text("reference", 180),
    coordinates, shareWithOrder: raw.shareWithOrder === true,
  };
  return location.address || coordinates ? location : null;
}

export function buildDeliveryLocationLines(location: DeliveryLocation | null | undefined): string[] {
  const confirmed = normalizeDeliveryLocation(location);
  if (!confirmed?.shareWithOrder) return [];
  const lines = ["📍 LOCALIZAÇÃO DO CLIENTE"];
  if (confirmed.address) lines.push(`Endereço: ${confirmed.address}`);
  if (confirmed.city) lines.push(`Cidade: ${confirmed.city}`);
  if (confirmed.neighborhood) lines.push(`Bairro: ${confirmed.neighborhood}`);
  if (confirmed.reference) lines.push(`Referência: ${confirmed.reference}`);
  if (confirmed.coordinates) {
    const { latitude, longitude, accuracy } = confirmed.coordinates;
    lines.push(`Localização GPS: https://www.google.com/maps?q=${latitude},${longitude}`);
    if (accuracy !== null) lines.push(`Precisão aproximada do GPS: ${Math.round(accuracy)} m`);
  }
  lines.push("Por favor, confirme a possibilidade de entrega e qualquer taxa antes de fechar o pedido.");
  return lines;
}