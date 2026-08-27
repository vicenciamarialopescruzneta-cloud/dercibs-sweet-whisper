import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { CATEGORIES } from "@/data/products";
import { SIZES, formatBRL } from "@/lib/constants";

interface ProductCardProps {
  product: Product;
  index?: number;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, index = 0, onSelect }: ProductCardProps) {
  const category = CATEGORIES.find((c) => c.id === product.category);
  const minPrice = Math.min(...SIZES.map((s) => s.price));

  return (
    <button
      type="button"
      onClick={() => onSelect(product)}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      className="group animate-rise flex w-full flex-col overflow-hidden rounded-3xl bg-card text-left shadow-card transition-all hover:-translate-y-1 hover:shadow-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={`${category?.name} sabor ${product.name}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground">
          {category?.emoji} {category?.name}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
        <p className="text-sm leading-snug text-muted-foreground">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            a partir de{" "}
            <strong className="text-base text-primary">{formatBRL(minPrice)}</strong>
          </span>
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-90">
            <Plus className="size-4" />
          </span>
        </div>
      </div>
    </button>
  );
}
