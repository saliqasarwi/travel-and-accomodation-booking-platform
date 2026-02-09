import { beforeAll, afterAll, vi } from "vitest";

beforeAll(() => {
  // If anything tries to use fetch, fail loudly
  vi.stubGlobal(
    "fetch",
    vi.fn(() => {
      throw new Error("❌ Unexpected fetch() call in tests. Mock it!");
    })
  );

  // If anything tries to use XHR (axios in browser mode), fail loudly
  // @ts-expect-error - we're overriding for tests
  global.XMLHttpRequest = class {
    constructor() {
      throw new Error(
        "❌ Unexpected XMLHttpRequest in tests. Mock axios/http client!"
      );
    }
  };
});

afterAll(() => {
  vi.unstubAllGlobals();
});
