import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.dercibs.doces",
  appName: "Dercibs Doces",
  webDir: "android-web",
  server: {
    // The existing TanStack Start application remains hosted; the Android shell
    // loads the same production site instead of duplicating its server runtime.
    url: "https://dercibs-sweet-whisper.lovable.app",
    cleartext: false,
    allowNavigation: ["dercibs-sweet-whisper.lovable.app"],
  },
  android: {
    allowMixedContent: false,
  },
  plugins: {
    Geolocation: {
      // The plugin requests permission only when the customer taps the GPS button.
    },
  },
};

export default config;
