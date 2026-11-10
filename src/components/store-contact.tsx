import { MapPin, MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STORE_LOCATION, WHATSAPP_DISPLAY } from "@/lib/constants";
import { useStore } from "@/lib/store-context";
import { buildContactMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function StoreContact() {
  const { customer } = useStore();
  return (
    <section aria-labelledby="store-contact-title" className="mt-8 border-t border-border pt-6">
      <h2 id="store-contact-title" className="font-display text-2xl font-bold text-foreground">
        Vamos conversar? 💕
      </h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-primary">
            <MessageCircle className="size-5" /> WhatsApp da Dercibs
          </div>
          <a href={`tel:+${WHATSAPP_DISPLAY.replace(/\D/g, "")}`} className="mt-2 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-foreground">
            <Phone className="size-4 text-primary" /> {WHATSAPP_DISPLAY}
          </a>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Sabores, ingredientes e disponibilidade: fale com a gente antes de confirmar seu pedido.
          </p>
          <Button asChild className="mt-4 h-auto min-h-12 rounded-full px-5 font-bold">
            <a href={buildWhatsAppUrl(buildContactMessage(customer?.name))} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> Conversar no WhatsApp <ArrowUpRight />
            </a>
          </Button>
        </div>
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-primary">
            <MapPin className="size-5" /> Localização e retirada
          </div>
          {STORE_LOCATION.address ? (
            <>
              <address className="mt-3 text-sm leading-relaxed font-semibold text-foreground not-italic">{STORE_LOCATION.address}</address>
              {STORE_LOCATION.reference && <p className="mt-2 text-sm text-muted-foreground">Referência: {STORE_LOCATION.reference}</p>}
            </>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Combine a retirada e peça o endereço e o ponto de referência pelo WhatsApp.
            </p>
          )}
          <Button asChild variant="outline" className="mt-4 h-auto min-h-12 rounded-full border-primary px-5 font-bold text-primary">
            <a href={STORE_LOCATION.mapsUrl ?? buildWhatsAppUrl(buildContactMessage(customer?.name, "location"))} target="_blank" rel="noopener noreferrer">
              <MapPin /> {STORE_LOCATION.mapsUrl ? "Abrir localização" : "Pedir localização"} <ArrowUpRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}