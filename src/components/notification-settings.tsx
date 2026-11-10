import { Bell, Heart } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { DEFAULT_REMINDER_POLICY } from "@/lib/notification-policy";

// No permission request, fake success, local timer or worker until a push provider is connected.
export function NotificationSettings() {
  return (
    <section aria-labelledby="notification-title" className="mt-8 border-t border-border pt-6">
      <div className="flex items-center gap-3">
        <Bell className="size-5 shrink-0 text-primary" />
        <h2 id="notification-title" className="flex-1 font-display text-2xl font-bold text-foreground">Um carinho de vez em quando</h2>
        <Switch checked={false} disabled aria-label="Receber notificações" aria-describedby="notification-status" />
      </div>
      <p id="notification-status" role="status" className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Notificações indisponíveis: o serviço de envio ainda não foi conectado pela loja.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Prazo proposto: {DEFAULT_REMINDER_POLICY.inactivityDays} dias sem visitar, com pelo menos {DEFAULT_REMINDER_POLICY.minimumIntervalDays} dias entre lembretes. Nada é enviado enquanto estiver desativado.
      </p>
      <div className="mt-4 flex gap-3 border-l-2 border-primary pl-4">
        <Heart className="mt-1 size-4 shrink-0 text-primary" />
        <p className="text-sm leading-relaxed text-foreground">“Oi! Estamos com saudades de você! ❤️ Volte para conferir nossos sabores.”</p>
      </div>
    </section>
  );
}