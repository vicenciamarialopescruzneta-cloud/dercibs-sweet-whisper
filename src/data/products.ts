import chocolatePotes from "@/assets/chocolate_potes.jpg.asset.json";
import oreoPotes from "@/assets/oreo_potes.jpg.asset.json";
import maracujaTortaPotes from "@/assets/maracuja_torta_potes.jpg.asset.json";
import maracujaBoloPotes from "@/assets/maracuja_bolo_potes.jpg.asset.json";
import morangoPote from "@/assets/morango_pote.jpg.asset.json";

/** Fotos reais enviadas pela loja; preservar as anteriores sem nova foto correspondente. */
const PHOTOS = {
  chocolate: chocolatePotes.url,
  ninho: "/__l5e/assets-v1/8d467c12-60a9-4fa7-9579-a2b3d49c2406/real-ninho.jpg",
  casadinho: "/__l5e/assets-v1/cc6e5681-2b1a-46c5-8d81-43f88dd2a4a0/real-casadinho.jpg",
  maracujaBolo: maracujaBoloPotes.url,
  abacaxiCoco: "/__l5e/assets-v1/1ae6746e-b4c7-4847-8da6-8f193402007c/real-abacaxi-coco.jpg",
  limao: "/__l5e/assets-v1/2bc583b2-089e-4305-a65c-6ef127424092/real-limao.jpg",
  maracujaTorta: maracujaTortaPotes.url,
  abacaxi: "/__l5e/assets-v1/ff8f7b9b-ab3c-4682-93c1-2f57be20f99f/real-abacaxi.jpg",
  morango: morangoPote.url,
  oreo: oreoPotes.url,
  uva: "/__l5e/assets-v1/29d8c018-cfbc-4afd-a167-0631042a0ba6/real-uva.jpg",
};


export type CategoryId = "bolo" | "torta" | "especiais";

export interface Category {
  id: CategoryId;
  name: string;
  emoji: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  { id: "bolo", name: "Bolo no Pote", emoji: "🍰" },
  { id: "torta", name: "Torta no Pote", emoji: "🥧" },
  { id: "especiais", name: "Especiais", emoji: "✨" },
];

export const PRODUCTS: Product[] = [
  {
    id: "bolo-chocolate",
    name: "Chocolate",
    category: "bolo",
    description: "Massa fofinha de chocolate com brigadeiro cremoso e ganache.",
    image: PHOTOS.chocolate,
  },
  {
    id: "bolo-ninho",
    name: "Ninho",
    category: "bolo",
    description: "Camadas de creme de leite Ninho com raspas de chocolate.",
    image: PHOTOS.ninho,
  },
  {
    id: "bolo-casadinho",
    name: "Casadinho",
    category: "bolo",
    description: "O clássico encontro do brigadeiro com o creme de Ninho.",
    image: PHOTOS.casadinho,
  },
  {
    id: "bolo-maracuja",
    name: "Maracujá",
    category: "bolo",
    description: "Creme delicado de maracujá com calda da fruta por cima.",
    image: PHOTOS.maracujaBolo,
  },
  {
    id: "bolo-abacaxi-coco",
    name: "Abacaxi com Coco",
    category: "bolo",
    description: "Abacaxi caramelizado, creme branco e coco fresquinho.",
    image: PHOTOS.abacaxiCoco,
  },
  {
    id: "torta-limao",
    name: "Limão",
    category: "torta",
    description: "Base crocante de biscoito com creme cítrico de limão.",
    image: PHOTOS.limao,
  },
  {
    id: "torta-maracuja",
    name: "Maracujá",
    category: "torta",
    description: "Creme gelado de maracujá com sementes da fruta.",
    image: PHOTOS.maracujaTorta,
  },
  {
    id: "torta-abacaxi",
    name: "Abacaxi",
    category: "torta",
    description: "Creme suave com pedaços doces de abacaxi.",
    image: PHOTOS.abacaxi,
  },
  {
    id: "torta-morango",
    name: "Morango",
    category: "torta",
    description: "Creme branco com geleia caseira de morango.",
    image: PHOTOS.morango,
  },
  {
    id: "torta-oreo",
    name: "Oreo",
    category: "torta",
    description: "Camadas de creme com muito biscoito Oreo triturado.",
    image: PHOTOS.oreo,
  },
  {
    id: "especial-surpresa-uva",
    name: "Surpresa de Uva",
    category: "especiais",
    description: "Uvas fresquinhas envolvidas em creme e calda de uva.",
    image: PHOTOS.uva,
  },
];
