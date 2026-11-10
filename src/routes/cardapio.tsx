import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { ProductCard } from "@/components/product-card";
import { ProductDialog } from "@/components/product-dialog";
import { StoreContact } from "@/components/store-contact";
import { NotificationSettings } from "@/components/notification-settings";
import { CATEGORIES, PRODUCTS, type Product } from "@/data/products";
import { formatBRL } from "@/lib/constants";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio — Dercibs Doces" },
      {
        name: "description",
        content:
          "Bolos no pote, tortas no pote e especiais da Dercibs Doces. Escolha sabor, tamanho e quantidade e monte seu pedido.",
      },
      { property: "og:title", content: "Cardápio — Dercibs Doces" },
      {
        property: "og:description",
        content: "Sabores artesanais nos potes de 200ml e 250ml. Monte seu pedido agora.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { customer, hydrated, itemCount, total } = useStore();
  const navigate = useNavigate();
  const [active, setActive] = useState<"todos" | (typeof CATEGORIES)[number]["id"]>("todos");
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
    if (hydrated && !customer) navigate({ to: "/" });
  }, [hydrated, customer, navigate]);

  const products =
    active === "todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <div className="min-h-screen pb-28">
      <AppHeader />

      <main className="mx-auto max-w-5xl px-4 py-6">
        <section className="animate-rise rounded-3xl bg-card p-5 shadow-card">
          <h1 className="font-display text-2xl font-extrabold text-foreground">
            Olá, {customer?.name?.split(" ")[0] ?? "doçura"}! 🐝
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Escolha seus potinhos favoritos. Tamanhos de 200ml ({formatBRL(10)}) e 250ml (
            {formatBRL(12)}).
          </p>
        </section>

        <nav
          aria-label="Categorias"
          className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]"
        >
          {[{ id: "todos" as const, name: "Todos", emoji: "💗" }, ...CATEGORIES].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              className={cn(
                "min-h-11 shrink-0 rounded-full border px-4 text-sm font-bold transition-colors",
                active === cat.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary",
              )}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </nav>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onSelect={setSelected}
            />
          ))}
        </div>
        <StoreContact />
        <NotificationSettings />
      </main>

      <ProductDialog product={selected} onOpenChange={(open) => !open && setSelected(null)} />

      {itemCount > 0 && (
        <div className="animate-rise fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-card/95 px-4 py-3 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center gap-3">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">
                {itemCount} {itemCount === 1 ? "item" : "itens"} no carrinho
              </p>
              <p className="font-display text-lg font-bold text-primary">{formatBRL(total)}</p>
            </div>
            <Link
              to="/carrinho"
              className="flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-bold text-primary-foreground shadow-soft transition-transform hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="size-5" />
              Ver pedido
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
