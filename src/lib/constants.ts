/**
 * Configurações centrais da Dercibs Doces.
 * Altere o número abaixo para o WhatsApp oficial da loja (formato internacional, só dígitos).
 */
export const WHATSAPP_NUMBER = "559885175955";

export const BRAND_NAME = "Dercibs Doces";

// Só publicar endereço, referência e mapa quando confirmados pela loja.
export const STORE_LOCATION: {
  address: string | null;
  reference: string | null;
  mapsUrl: string | null;
} = { address: null, reference: null, mapsUrl: null };

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
