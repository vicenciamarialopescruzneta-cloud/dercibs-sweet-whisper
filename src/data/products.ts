import boloMaracuja from "@/assets/bolo-maracuja.jpg";
import boloAbacaxiCoco from "@/assets/bolo-abacaxi-coco.jpg";
import tortaLimao from "@/assets/torta-limao.jpg";
import tortaAbacaxi from "@/assets/torta-abacaxi.jpg";
import surpresaUva from "@/assets/surpresa-uva.jpg";

/** Fotos reais enviadas pela loja. */
const PHOTOS = {
  casadinho: "/__l5e/assets-v1/0c9a2c4e-0373-4aa9-a29f-3ca2df50e740/image.png",
  ninho: "/__l5e/assets-v1/d6448ec3-9e3f-46bc-a9cc-2b25af5ecd44/image-2.png",
  chocolate: "/__l5e/assets-v1/a3d97cc1-8044-4c94-aecc-f9cc203d4c0a/image-3.png",
  oreo: "/__l5e/assets-v1/765ad27b-cfa2-4b1e-bb29-b3274b368984/image-7.png",
  morango: "/__l5e/assets-v1/4c29c2a9-2ddb-4d7d-99d6-3d27ffd91c8d/image-5.png",
  maracujaTorta: "/__l5e/assets-v1/e897b1e5-671a-4a6d-b826-0cae1e649378/image-6.png",
  casadinhoNovo: "/__l5e/assets-v1/d8d132b2-43c5-43a0-92eb-b0029e51d1f4/image-8.png",
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
    image: boloMaracuja,
  },
  {
    id: "bolo-abacaxi-coco",
    name: "Abacaxi com Coco",
    category: "bolo",
    description: "Abacaxi caramelizado, creme branco e coco fresquinho.",
    image: boloAbacaxiCoco,
  },
  {
    id: "torta-limao",
    name: "Limão",
    category: "torta",
    description: "Base crocante de biscoito com creme cítrico de limão.",
    image: tortaLimao,
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
    image: tortaAbacaxi,
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
    image: surpresaUva,
  },
];
