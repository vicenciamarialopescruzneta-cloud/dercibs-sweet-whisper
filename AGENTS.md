<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Product photos use CDN asset pointers; saved carts resolve current photos from the catalog to keep image updates consistent without changing prices or quantities.
- Keep cart context and useStore in a product-independent module; the provider exports only a component at runtime so photo updates cannot recreate context identity or invalidate split-route consumers.
- WhatsApp handoff uses a single native external link with an encoded cart message; a null popup handle is not a reliable blocked-popup signal.
- Store address and maps links remain nullable until confirmed, so contact surfaces request location rather than publishing invented details.
- Do not register push workers or claim notification activation before a real provider connection and durable opt-in/scheduling are implemented; the declined connection leaves that work pending.
- Keep focused business-rule tests beside the WhatsApp helpers, using node:test and node:assert through Bun to avoid extra test dependencies and missing Bun-specific TypeScript declarations.
