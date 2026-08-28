/** Fotos reais enviadas pela loja. */
const PHOTOS = {
  chocolate: "/__l5e/assets-v1/8c6240cc-b9a5-4a0a-a1df-206f68274689/real-choco.jpg",
  ninho: "/__l5e/assets-v1/8d467c12-60a9-4fa7-9579-a2b3d49c2406/real-ninho.jpg",
  casadinho: "/__l5e/assets-v1/cc6e5681-2b1a-46c5-8d81-43f88dd2a4a0/real-casadinho.jpg",
  maracujaBolo: "/__l5e/assets-v1/8cbd334f-84fd-4a92-87e0-06f3b3d58936/real-maracuja-bolo.jpg",
  abacaxiCoco: "/__l5e/assets-v1/1ae6746e-b4c7-4847-8da6-8f193402007c/real-abacaxi-coco.jpg",
  limao: "/__l5e/assets-v1/2bc583b2-089e-4305-a65c-6ef127424092/real-limao.jpg",
  maracujaTorta: "/__l5e/assets-v1/ca7aa9e6-4bdb-4874-8955-0e0017af63f5/real-maracuja-torta.jpg",
  abacaxi: "/__l5e/assets-v1/ff8f7b9b-ab3c-4682-93c1-2f57be20f99f/real-abacaxi.jpg",
  morango: "/__l5e/assets-v1/b6da3a46-26c2-49be-be1c-3d1997ac060b/real-morango.jpg",
  oreo: "/__l5e/assets-v1/0703a1bb-c18b-4baa-a594-804b47b3fc51/real-oreo.jpg",
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
    image: PHOTOS.casadinhoNovo,
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
