import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, LocateFixed, LoaderCircle, MapPin, Pencil, Save, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { emptyDeliveryLocation, normalizeDeliveryLocation, type DeliveryLocation } from "@/lib/delivery-location";
import { useStore } from "@/lib/store-context";

const inputClass = "min-h-12 rounded-2xl bg-secondary/50 px-3 text-base text-foreground md:text-base";

export function CustomerLocation() {
  const { hydrated, deliveryLocation, setDeliveryLocation, clearDeliveryLocation } = useStore();
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState<DeliveryLocation>(emptyDeliveryLocation);
  const [locating, setLocating] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const requestId = useRef(0);

  useEffect(() => () => { requestId.current += 1; }, []);

  function cancelGps() {
    requestId.current += 1;
    setLocating(false);
  }

  function toggleEditor() {
    cancelGps();
    setDraft(deliveryLocation ? { ...deliveryLocation } : emptyDeliveryLocation());
    setStatus("");
    setError("");
    setExpanded((current) => !current);
  }

  function updateField(field: "address" | "city" | "neighborhood" | "reference", value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function locate() {
    setError("");
    setStatus("");
    if (!navigator.geolocation || !window.isSecureContext) {
      setError("O GPS não está disponível aqui. Você pode digitar o endereço ou continuar sem localização.");
      return;
    }
    const currentRequest = ++requestId.current;
    setLocating(true);
    // Request permission only after this explicit click, never on page load.
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (currentRequest !== requestId.current) return;
        setLocating(false);
        setDraft((current) => ({
          ...current,
          coordinates: { latitude: coords.latitude, longitude: coords.longitude, accuracy: coords.accuracy },
        }));
        setStatus("Localização encontrada. Confira os dados antes de salvar.");
      },
      (failure) => {
        if (currentRequest !== requestId.current) return;
        setLocating(false);
        setError(failure.code === 1
          ? "Acesso ao GPS não autorizado. Digite o endereço ou continue sem localização."
          : failure.code === 3
            ? "O GPS demorou para responder. Tente novamente, digite o endereço ou continue sem localização."
            : "Não foi possível obter a localização. Digite o endereço ou continue sem localização.");
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 },
    );
  }

  function save(event: React.FormEvent) {
    event.preventDefault();
    const confirmed = normalizeDeliveryLocation(draft);
    if (!confirmed) {
      setError("Informe um endereço ou use o GPS antes de confirmar a localização.");
      return;
    }
    if (!setDeliveryLocation(confirmed)) {
      setError("Não conseguimos salvar neste aparelho. Seu cadastro pode continuar sem localização.");
      return;
    }
    cancelGps();
    setExpanded(false);
    setError("");
    setStatus("Localização confirmada e salva neste aparelho.");
  }

  function remove() {
    cancelGps();
    if (!clearDeliveryLocation()) {
      setError("Não conseguimos apagar a localização salva. Tente novamente.");
      return;
    }
    setDraft(emptyDeliveryLocation());
    setExpanded(false);
    setError("");
    setStatus("Localização removida deste aparelho.");
  }

  return (
    <section aria-labelledby="customer-location-title" className="mt-6 border-y border-border py-4">
      <div className="flex items-start gap-3">
        <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
        <div className="min-w-0 flex-1">
          <h2 id="customer-location-title" className="font-display text-lg font-bold text-foreground">
            Sua localização <span className="font-sans text-xs font-normal text-muted-foreground">(opcional)</span>
          </h2>
          <p className="mt-1 break-words text-sm text-muted-foreground">
            {deliveryLocation
              ? [deliveryLocation.address || "Localização por GPS", deliveryLocation.neighborhood, deliveryLocation.city].filter(Boolean).join(" · ")
              : "Onde você gostaria de receber seus doces?"}
          </p>
          {deliveryLocation && <p className="mt-1 text-xs text-muted-foreground">
            {deliveryLocation.shareWithOrder ? "Incluída no pedido pelo WhatsApp." : "Não será incluída no pedido pelo WhatsApp."}
          </p>}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button type="button" variant="outline" disabled={!hydrated} onClick={toggleEditor}
          aria-expanded={expanded} aria-controls="customer-location-editor"
          className="h-auto min-h-11 rounded-full border-primary px-4 font-bold text-primary">
          {deliveryLocation ? <Pencil /> : <MapPin />}
          {deliveryLocation ? "Editar localização" : "Informar localização"}
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
        {deliveryLocation && <Button type="button" variant="ghost" size="icon" onClick={remove}
          aria-label="Apagar localização salva" title="Apagar localização salva" className="size-11 rounded-full text-muted-foreground">
          <Trash2 />
        </Button>}
      </div>

      {expanded && <form id="customer-location-editor" onSubmit={save} className="mt-4 space-y-4">
        <div>
          <Button type="button" variant="secondary" onClick={locate} disabled={locating}
            className="h-auto min-h-12 w-full rounded-full px-3 font-bold">
            {locating ? <LoaderCircle className="motion-safe:animate-spin" /> : <LocateFixed />}
            {locating ? "Buscando localização..." : "Usar minha localização atual"}
          </Button>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Você pode negar o GPS e continuar normalmente.</p>
        </div>

        {draft.coordinates && <div className="border-l-2 border-primary pl-3">
          <div className="flex items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-sm font-bold text-primary"><Check className="size-4" /> GPS selecionado</p>
            <Button type="button" variant="ghost" size="icon" className="size-11 shrink-0 rounded-full"
              aria-label="Remover GPS selecionado" title="Remover GPS selecionado"
              onClick={() => { setDraft((current) => ({ ...current, coordinates: null })); setStatus(""); }}><X /></Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {draft.coordinates.latitude.toFixed(5)}, {draft.coordinates.longitude.toFixed(5)}
            {draft.coordinates.accuracy !== null && ` · precisão de aproximadamente ${Math.round(draft.coordinates.accuracy)} m`}
          </p>
        </div>}

        <div className="space-y-1.5">
          <label htmlFor="delivery-address" className="text-sm font-bold text-foreground">Endereço</label>
          <Input id="delivery-address" value={draft.address} onChange={(event) => updateField("address", event.target.value)}
            maxLength={180} autoComplete="street-address" placeholder="Rua, número e complemento" className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="min-w-0 space-y-1.5">
            <label htmlFor="delivery-city" className="text-sm font-bold text-foreground">Cidade</label>
            <Input id="delivery-city" value={draft.city} onChange={(event) => updateField("city", event.target.value)}
              maxLength={80} autoComplete="address-level2" placeholder="Sua cidade" className={inputClass} />
          </div>
          <div className="min-w-0 space-y-1.5">
            <label htmlFor="delivery-neighborhood" className="text-sm font-bold text-foreground">Bairro</label>
            <Input id="delivery-neighborhood" value={draft.neighborhood} onChange={(event) => updateField("neighborhood", event.target.value)}
              maxLength={80} autoComplete="address-level3" placeholder="Seu bairro" className={inputClass} />
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="delivery-reference" className="text-sm font-bold text-foreground">Ponto de referência</label>
          <Input id="delivery-reference" value={draft.reference} onChange={(event) => updateField("reference", event.target.value)}
            maxLength={180} placeholder="Ex.: em frente à praça" className={inputClass} />
        </div>

        <label htmlFor="share-location" className="flex min-h-11 cursor-pointer items-start gap-3 text-sm font-semibold text-foreground">
          <Checkbox id="share-location" checked={draft.shareWithOrder}
            onCheckedChange={(checked) => setDraft((current) => ({ ...current, shareWithOrder: checked === true }))} className="mt-0.5 size-5" />
          Incluir minha localização nos pedidos pelo WhatsApp
        </label>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Salva somente neste aparelho. Sem rastreamento contínuo; você pode editar ou apagar quando quiser.
        </p>
        <Button type="submit" disabled={locating} className="h-auto min-h-12 w-full rounded-full px-3 font-bold">
          <Save /> Confirmar e salvar localização
        </Button>
        <Button type="button" variant="ghost" onClick={toggleEditor} className="h-auto min-h-11 w-full rounded-full text-muted-foreground">
          {deliveryLocation ? "Cancelar alterações" : "Continuar sem localização"}
        </Button>
      </form>}

      {status && <p role="status" className="mt-3 text-sm font-semibold text-primary">{status}</p>}
      {error && <p role="alert" className="mt-3 text-sm font-semibold text-destructive">{error}</p>}
    </section>
  );
}