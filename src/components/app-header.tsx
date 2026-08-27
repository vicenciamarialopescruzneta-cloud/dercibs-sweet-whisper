import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { Bee } from "@/components/bee";
import { useStore } from "@/lib/store";
import { BRAND_NAME } from "@/lib/constants";

export function AppHeader({ showCart = true }: { showCart?: boolean }) {
  const { customer, itemCount } = useStore();
  const firstName = customer?.name?.split(" ")[0];

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <Bee size={40} motion="float" />
          <span className="font-display text-lg leading-none font-bold text-foreground">
            {BRAND_NAME}
            <span className="block text-xs font-normal text-muted-foreground">
              feito com carinho <Heart className="inline size-3 fill-primary text-primary" />
            </span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-3">
          {firstName && (
            <p className="hidden text-sm text-muted-foreground sm:block">
              Olá, <span className="font-semibold text-foreground">{firstName}</span>! 💗
            </p>
          )}
          {showCart && (
            <Link
              to="/carrinho"
              aria-label={`Abrir carrinho com ${itemCount} ${itemCount === 1 ? "item" : "itens"}`}
              className="relative flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="size-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full border-2 border-card bg-accent text-xs font-bold text-accent-foreground">
                  {itemCount}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
