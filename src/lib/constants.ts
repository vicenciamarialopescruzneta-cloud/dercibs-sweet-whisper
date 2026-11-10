/**
 * Configurações centrais da Dercibs Doces.
 * Altere o número abaixo para o WhatsApp oficial da loja (formato internacional, só dígitos).
 */
export const WHATSAPP_NUMBER = "559885175955";

export const BRAND_NAME = "Dercibs Doces";

// Ponto informado pela loja: 4°07'57.6"S 43°19'06.8"W.
export const STORE_LOCATION: {
  address: string | null;
  reference: string | null;
  mapsUrl: string | null;
} = {
  address: 'Coordenadas: 4°07\'57.6"S, 43°19\'06.8"W',
  reference: null,
  mapsUrl: "https://www.google.com/maps?q=-4.1326667,-43.3185556",
};

export const WHATSAPP_DISPLAY = "+55 98 8517-5955";

export type SizeId = "200" | "250";

export interface SizeOption {
  id: SizeId;
  label: string;
  price: number;
}

export const SIZES: SizeOption[] = [
  { id: "200", label: "200ml", price: 10 },
  { id: "250", label: "250ml", price: 12 },
];

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
