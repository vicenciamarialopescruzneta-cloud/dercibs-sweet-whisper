# Android — Dercibs Doces

## Arquitetura

O aplicativo Android usa Capacitor 7 e abre a aplicação de produção já existente em:

`https://dercibs-sweet-whisper.lovable.app`

A interface, as rotas, o carrinho, o Supabase e o fluxo de pedidos permanecem no sistema hospedado. O pacote Android é uma camada nativa; não é uma cópia offline do servidor TanStack Start.

## Recursos configurados

- Identificador Android: `com.dercibs.doces`
- Nome exibido: `Dercibs Doces`
- Navegação segura por HTTPS.
- Plugin Capacitor Geolocation para solicitar a permissão nativa de localização somente quando o cliente tocar em usar GPS.
- Endereço manual e persistência local continuam disponíveis.
- Links externos de WhatsApp continuam sendo gerados pelo fluxo atual do pedido.

## Gerar localmente

Requisitos: Node.js 22, JDK 21, Android SDK e ferramentas de plataforma.

```bash
npm install
npm run build
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug
./gradlew bundleRelease
```

APK de depuração: `android/app/build/outputs/apk/debug/app-debug.apk`

AAB: `android/app/build/outputs/bundle/release/app-release.aab`

O workflow **Android APK and AAB** executa esses passos no GitHub Actions e publica os dois arquivos como artefato do workflow.

## Itens que exigem configuração/validação adicional

1. **Notificações push:** não foram ativadas. É necessário criar/configurar um projeto Firebase, fornecer o `google-services.json`, definir o fluxo de consentimento e implementar o envio no backend. Não é correto declarar push funcionando em segundo plano antes disso.
2. **Ícone de lançamento:** o projeto ainda precisa receber a arte oficial em alta resolução para gerar os ícones Android adaptativos. Não substituir a identidade visual por um ícone genérico sem aprovação.
3. **Assinatura de publicação:** o APK gerado pelo workflow é um APK debug instalável. Para distribuição pública, configurar uma chave de assinatura protegida em GitHub Secrets e assinar o AAB de release.
4. **Teste em dispositivo:** validar GPS, retorno do Android, links WhatsApp, telas e navegação em aparelho físico; o sucesso da compilação não substitui esses testes.
5. **Disponibilidade:** como o app carrega o site hospedado, requer internet e depende da disponibilidade do domínio de produção.
