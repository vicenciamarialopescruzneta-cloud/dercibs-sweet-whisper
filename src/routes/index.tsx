import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Heart, Sparkles } from "lucide-react";
import dercibsLogo from "@/assets/dercibs_logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { CustomerLocation } from "@/components/customer-location";
import { WelcomeLoading } from "@/components/welcome-loading";
import { BRAND_NAME } from "@/lib/constants";
import { useStore } from "@/lib/store-context";
import { scheduleMenuOpening, validateWelcomeDetails } from "@/lib/welcome-flow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dercibs Doces — Cardápio digital de bolos e tortas no pote" },
      {
        name: "description",
        content:
          "Monte seu pedido de bolos e tortas no pote da Dercibs Doces e envie direto pelo WhatsApp. Sabores artesanais nos tamanhos 200ml e 250ml.",
      },
      { property: "og:title", content: "Dercibs Doces — Cardápio digital" },
      {
        property: "og:description",
        content:
          "Bolos e tortas no pote feitos com carinho. Escolha o sabor, o tamanho e envie seu pedido pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WelcomePage,
});

function WelcomePage() {
  const { customer, setCustomer, hydrated } = useStore();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [preparing, setPreparing] = useState(false);
  const submitted = useRef(false);

  useEffect(() => {
    if (customer?.name) {
      setName(customer.name);
      setPhone(customer.phone);
      setRemember(customer.remember);
    }
  }, [customer]);

  useEffect(() => {
    if (!preparing) return;
    return scheduleMenuOpening(() => { void navigate({ to: "/cardapio" }); });
  }, [preparing, navigate]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!hydrated || submitted.current) return;
    const trimmed = name.trim();
    const invalidField = validateWelcomeDetails(name, phone);
    setError("");
    setPhoneError("");
    if (invalidField === "name") {
      setError("Por favor, conte pra gente o seu nome 💗");
      return;
    }
    if (invalidField === "phone") {
      setPhoneError("Confira seu WhatsApp com DDD ou deixe o campo em branco 💗");
      return;
    }
    setCustomer({ name: trimmed, phone: phone.trim(), remember });
    submitted.current = true;
    setPreparing(true);
  }

  if (preparing) return <WelcomeLoading />;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-10">
      <div className="pointer-events-none absolute -top-16 -left-16 size-64 rounded-full bg-primary/10 blur-2xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-72 rounded-full bg-accent/20 blur-3xl" />

      <div className="animate-rise w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <img src={dercibsLogo.url} alt={`Logo da ${BRAND_NAME}`} width={128} height={128}
            className="size-32 object-contain" />
          <h1 className="mt-2 font-display text-4xl font-extrabold text-foreground">
            {BRAND_NAME}
          </h1>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <Sparkles className="size-4 text-primary" />
            doces artesanais feitos com amor
            <Heart className="size-4 fill-primary text-primary" />
          </p>
        </div>

        <CustomerLocation />

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 rounded-3xl bg-card p-6 shadow-card"
        >
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-bold text-foreground">
              Seu nome *
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              autoComplete="name"
              placeholder="Ex.: Maria"
              className="min-h-13 w-full rounded-2xl border border-input bg-secondary/50 px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "name-error" : undefined}
            />
            {error && <p id="name-error" role="alert" className="text-sm font-semibold text-destructive">{error}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-sm font-bold text-foreground">
              WhatsApp <span className="font-normal text-muted-foreground">(opcional)</span>
            </label>
            <input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={20}
              inputMode="tel"
              autoComplete="tel"
              placeholder="(00) 00000-0000"
              className="min-h-13 w-full rounded-2xl border border-input bg-secondary/50 px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
              aria-invalid={Boolean(phoneError)}
              aria-describedby={phoneError ? "phone-error" : undefined}
            />
            {phoneError && <p id="phone-error" role="alert" className="text-sm font-semibold text-destructive">{phoneError}</p>}
          </div>

          <label className="flex min-h-11 items-center gap-3 text-sm font-semibold text-foreground">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="size-5 accent-[var(--primary)]"
            />
            Lembrar meu nome
          </label>

          <Button
            type="submit"
            disabled={!hydrated}
            className="min-h-13 w-full rounded-full bg-primary px-6 text-base font-bold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
          >
            Ver o cardápio 🍰
          </Button>
        </form>
      </div>
    </main>
  );
}
