import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, LocateFixed, MapPin, Minus, Plus, Trash2 } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Bee } from "@/components/bee";
import { Button } from "@/components/ui/button";
import { StoreContact } from "@/components/store-contact";
import { formatBRL } from "@/lib/constants";
import { useStore } from "@/lib/store-context";
import {
  buildOrderMessage,
  buildWhatsAppUrl,
  validateOrder,
  type CustomerLocation,
} from "@/lib/whatsapp";
import { toast } from "sonner";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Meu pedido — Dercibs Doces" },
      {
        name: "description",
        content:
          "Revise os potinhos escolhidos, ajuste as quantidades e envie seu pedido da Dercibs Doces pelo WhatsApp.",
      },
      { property: "og:title", content: "Meu pedido — Dercibs Doces" },
      {
        property: "og:description",
        content: "Confira seu carrinho e finalize o pedido pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { customer, hydrated, items, total, itemCount, increment, decrement, removeItem } =
    useStore();
  const navigate = useNavigate();
  const [customerLocation, setCustomerLocation] = useState<CustomerLocation | null>(null);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    if (hydrated && !customer) navigate({ to: "/" });
  }, [hydrated, customer, navigate]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dercibs.customer-location.v1");
      if (saved) setCustomerLocation(JSON.parse(saved) as CustomerLocation);
    } catch {
      localStorage.removeItem("dercibs.customer-location.v1");
    }
  }, []);

  function handleGetLocation() {
    if (!navigator.geolocation) {
      toast.error("Este navegador não oferece suporte à localização.");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCustomerLocation((previous) => {
          const updated = { ...previous, latitude: coords.latitude, longitude: coords.longitude };
          localStorage.setItem("dercibs.customer-location.v1", JSON.stringify(updated));
          return updated;
        });
        setLocating(false);
        toast.success("Localização adicionada ao pedido 💕");
      },
      (error) => {
        setLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          toast.error("Permita o acesso à localização no navegador para compartilhar seu ponto.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          toast.error("Não foi possível encontrar sua localização agora.");
        } else {
          toast.error("A localização demorou muito. Tente novamente.");
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 },
    );
  }

  function handleSend(event: React.MouseEvent<HTMLAnchorElement>) {
    const error = validateOrder(customer, items);
    if (error) {
      event.preventDefault();
      toast.error(error);
      return;
    }
    // A real user-initiated link opens once. window.open(noopener) returning null
    // does not prove a blocked popup, so never follow it with a second navigation.
    toast.success("Seu pedido está sendo preparado para envio pelo WhatsApp 💕");
  }

  return (
    <div className="min-h-screen pb-40">
      <AppHeader showCart={false} />

      <main className="mx-auto max-w-3xl px-4 py-6">
        <Link
          to="/cardapio"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary"
        >
          <ArrowLeft className="size-4" />
          Voltar ao cardápio
        </Link>

        <h1 className="mt-3 font-display text-3xl font-extrabold text-foreground">Meu pedido</h1>

        {items.length === 0 ? (
          <div className="animate-rise mt-10 flex flex-col items-center rounded-3xl bg-card p-8 text-center shadow-card">
            <Bee size={110} motion="fly" />
            <h2 className="mt-4 font-display text-xl font-bold text-foreground">
              Seu carrinho está vazinho
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A abelhinha ainda não achou nenhum docinho por aqui 🐝
            </p>
            <Link
              to="/cardapio"
              className="mt-6 flex min-h-12 items-center rounded-full bg-primary px-6 font-bold text-primary-foreground shadow-soft transition-transform hover:scale-105 active:scale-95"
            >
              Escolher doces
            </Link>
          </div>
        ) : (
          <ul className="mt-5 space-y-3">
            {items.map((item, index) => (
              <li
                key={item.key}
                style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
                className="animate-rise flex gap-3 rounded-3xl bg-card p-3 shadow-card"
              >
                <img
                  src={item.image}
                  alt={item.productName}
                  loading="lazy"
                  className="size-20 shrink-0 rounded-2xl object-cover"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-xs font-semibold text-primary">{item.categoryName}</p>
                  <p className="truncate font-bold text-foreground">{item.productName}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.sizeLabel} • {formatBRL(item.unitPrice)} cada
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center gap-2 rounded-full bg-secondary p-1">
                      <button
                        type="button"
                        aria-label={`Diminuir ${item.productName}`}
                        onClick={() => decrement(item.key)}
                        className="flex size-9 items-center justify-center rounded-full bg-card text-foreground shadow-card"
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="w-5 text-center font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Aumentar ${item.productName}`}
                        onClick={() => increment(item.key)}
                        className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remover ${item.productName}`}
                      onClick={() => removeItem(item.key)}
                      className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                    <span className="ml-auto font-display text-lg font-bold text-primary">
                      {formatBRL(item.quantity * item.unitPrice)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <section className="mt-6 rounded-3xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <LocateFixed className="size-5 text-primary" />
              Compartilhar minha localização
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Se quiser, permita o acesso ao GPS para enviar seu ponto de localização junto com o pedido.
            </p>
            {customerLocation && (
              <a
                className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary underline"
                href={`https://www.google.com/maps?q=${customerLocation.latitude},${customerLocation.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="size-4" /> Localização capturada — ver no mapa
              </a>
            )}
            <Button
              type="button"
              variant="outline"
              disabled={locating}
              onClick={handleGetLocation}
              className="mt-3 min-h-11 rounded-full border-primary px-5 font-bold text-primary"
            >
              <LocateFixed className="size-4" />
              {locating ? "Localizando..." : customerLocation ? "Atualizar localização" : "Usar minha localização"}
            </Button>
          </section>
        )}

        <StoreContact />
      </main>

      {items.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-card/95 px-4 py-4 backdrop-blur-md">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {itemCount} {itemCount === 1 ? "item" : "itens"}
              </span>
              <span className="font-display text-2xl font-extrabold text-primary">
                {formatBRL(total)}
              </span>
            </div>
            <Button
              asChild
              className="mt-3 min-h-13 w-full rounded-full bg-primary px-6 text-base font-bold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] active:scale-95"
            >
              <a
                href={buildWhatsAppUrl(buildOrderMessage(customer, items, total, customerLocation))}
                onClick={handleSend}
                target="_blank"
                rel="noopener noreferrer"
              >
                Fazer Pedido pelo WhatsApp 💬
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
