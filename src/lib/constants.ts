/**
 * Configurações centrais da Dercibs Doces.
 * Altere o número abaixo para o WhatsApp oficial da loja (formato internacional, só dígitos).
 */
export const WHATSAPP_NUMBER = "559885175955";

export const BRAND_NAME = "Dercibs Doces";

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
