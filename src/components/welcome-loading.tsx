import { LoaderCircle } from "lucide-react";
import dercibsLogo from "@/assets/dercibs_logo.png.asset.json";
import { BRAND_NAME } from "@/lib/constants";

export function WelcomeLoading() {
  return (
    <main aria-busy="true" className="flex min-h-screen flex-col items-center justify-center bg-background px-5 py-10 text-center">
      <img src={dercibsLogo.url} alt={`Logo da ${BRAND_NAME}`} width={128} height={128}
        className="size-32 object-contain motion-safe:animate-float" />
      <h1 className="mt-5 font-display text-3xl font-extrabold text-foreground">{BRAND_NAME}</h1>
      <div role="status" aria-live="polite" className="mt-4 flex flex-col items-center gap-3">
        <LoaderCircle aria-hidden="true" className="size-7 text-primary motion-safe:animate-spin" />
        <p className="text-base font-semibold text-muted-foreground">Preparando tudo para você...</p>
      </div>
    </main>
  );
}