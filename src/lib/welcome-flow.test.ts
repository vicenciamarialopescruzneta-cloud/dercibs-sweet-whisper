import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { scheduleMenuOpening, validateWelcomeDetails, WELCOME_LOADING_MS } from "./welcome-flow";

describe("initial registration and loading", () => {
  it("requires a name of at least two characters", () => {
    assert.equal(validateWelcomeDetails(" ", ""), "name");
    assert.equal(validateWelcomeDetails("A", ""), "name");
    assert.equal(validateWelcomeDetails(" Maria ", ""), null);
  });
  it("keeps WhatsApp optional while validating numbers provided", () => {
    assert.equal(validateWelcomeDetails("Maria", ""), null);
    assert.equal(validateWelcomeDetails("Maria", "(98) 99999-1111"), null);
    assert.equal(validateWelcomeDetails("Maria", "+55 98 99999-1111"), null);
    assert.equal(validateWelcomeDetails("Maria", "123"), "phone");
    assert.equal(validateWelcomeDetails("Maria", "letters99999111199"), "phone");
  });
  it("opens the original menu after exactly five seconds, never earlier", () => {
    const originalSet = globalThis.setTimeout;
    const originalClear = globalThis.clearTimeout;
    let elapsed = 0;
    let deadline = 0;
    let pending: (() => void) | null = null;
    let calls = 0;
    try {
      globalThis.setTimeout = ((callback: () => void, ms: number) => {
        deadline = elapsed + ms;
        pending = callback;
        return 1;
      }) as unknown as typeof setTimeout;
      globalThis.clearTimeout = (() => { pending = null; }) as typeof clearTimeout;
      const advance = (ms: number) => {
        elapsed += ms;
        if (pending && elapsed >= deadline) { const callback = pending; pending = null; callback(); }
      };
      scheduleMenuOpening(() => { calls += 1; });
      assert.equal(WELCOME_LOADING_MS, 5000);
      assert.equal(deadline, 5000);
      advance(4999);
      assert.equal(calls, 0);
      advance(1);
      assert.equal(calls, 1);
      advance(5000);
      assert.equal(calls, 1);
      const cancel = scheduleMenuOpening(() => { calls += 1; });
      cancel();
      advance(5000);
      assert.equal(calls, 1);
    } finally {
      globalThis.setTimeout = originalSet;
      globalThis.clearTimeout = originalClear;
    }
  });
});