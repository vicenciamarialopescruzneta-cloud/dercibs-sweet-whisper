import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createElement, type ComponentType, type ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { useStore } from "./store-context";

function StoreConsumer() {
  const { total, itemCount, hydrated, items } = useStore();
  assert.equal(total, 0);
  assert.equal(itemCount, 0);
  assert.equal(hydrated, false);
  assert.deepEqual(items, []);
  return null;
}

describe("store context module refresh", () => {
  it("retains the shared context across independent provider evaluations", async () => {
    const firstPath = "./store.tsx?regression=first";
    const secondPath = "./store.tsx?regression=second";
    const first = await import(firstPath) as { StoreProvider: ComponentType<{ children: ReactNode }> };
    const second = await import(secondPath) as { StoreProvider: ComponentType<{ children: ReactNode }> };
    assert.notEqual(first.StoreProvider, second.StoreProvider);
    for (const { StoreProvider } of [first, second]) {
      assert.doesNotThrow(() => renderToString(createElement(StoreProvider, { children: createElement(StoreConsumer) })));
    }
  });

  it("still rejects a genuinely missing provider instead of returning an empty fallback", () => {
    assert.throws(() => renderToString(createElement(StoreConsumer)), /useStore precisa estar dentro de StoreProvider/);
  });
});