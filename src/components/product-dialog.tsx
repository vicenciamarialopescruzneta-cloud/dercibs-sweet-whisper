import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CATEGORIES, PRODUCTS, type Product } from "@/data/products";
import { SIZES, formatBRL, type SizeId } from "@/lib/constants";
import { useStore } from "@/lib/store-context";
import { cn } from "@/lib/utils";

interface ProductDialogProps {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
}

export function ProductDialog({ product, onOpenChange }: ProductDialogProps) {
  const { addItem } = useStore();
  const [flavorId, setFlavorId] = useState<string | null>(null);
  const [sizeId, setSizeId] = useState<SizeId>("200");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setFlavorId(product.id);
      setSizeId("200");
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const category = CATEGORIES.find((c) => c.id === product.category)!;
  const flavors = PRODUCTS.filter((p) => p.category === product.category);
  const selected = flavors.find((p) => p.id === flavorId) ?? product;
  const size = SIZES.find((s) => s.id === sizeId)!;
  const subtotal = size.price * quantity;

  function handleAdd() {
    addItem({
      productId: selected.id,
      productName: selected.name,
      categoryName: category.name,
      sizeId,
      quantity,
      image: selected.image,
    });
    toast.success(`${quantity}x ${selected.name} (${size.label}) no carrinho!`);
    onOpenChange(false);
  }

  return (
    <Dialog open={!!product} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto rounded-3xl border-none bg-card p-0 sm:max-w-md">
        <img
          src={selected.image}
          alt={selected.name}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-t-3xl object-cover"
        />

        <div className="space-y-5 p-5">
          <DialogHeader className="space-y-1 text-left">
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">
              {category.emoji} {category.name}
            </p>
            <DialogTitle className="font-display text-2xl text-foreground">
              {selected.name}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selected.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <p className="text-sm font-bold text-foreground">Escolha o sabor</p>
            <div className="flex flex-wrap gap-2">
              {flavors.map((flavor) => (
                <button
                  key={flavor.id}
                  type="button"
                  onClick={() => setFlavorId(flavor.id)}
                  className={cn(
                    "min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors",
                    flavor.id === selected.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary text-foreground hover:border-primary",
                  )}
                >
                  {flavor.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-bold text-foreground">Escolha o tamanho</p>
            <div className="grid grid-cols-2 gap-2">
              {SIZES.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSizeId(option.id)}
                  className={cn(
                    "min-h-16 rounded-2xl border px-4 py-2 text-left transition-colors",
                    option.id === sizeId
                      ? "border-primary bg-primary/10"
                      : "border-border bg-secondary/60 hover:border-primary",
                  )}
                >
                  <span className="block font-bold text-foreground">{option.label}</span>
                  <span className="block text-sm font-semibold text-primary">
                    {formatBRL(option.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-foreground">Quantidade</p>
            <div className="flex items-center gap-3 rounded-full bg-secondary p-1">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex size-10 items-center justify-center rounded-full bg-card text-foreground shadow-card disabled:opacity-40"
                disabled={quantity <= 1}
              >
                <Minus className="size-4" />
              </button>
              <span className="w-6 text-center font-display text-lg font-bold">{quantity}</span>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-bold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] active:scale-95"
          >
            <ShoppingBag className="size-5" />
            Adicionar • {formatBRL(subtotal)}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
