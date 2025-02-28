import { describe, beforeEach, afterEach, it, expect, vi } from "vitest";

import { fetchGoals } from "./fetchGoals";

vi.mock("$app/environment", () => ({
  browser: true,
}));

describe("fetchGoals", () => {
  const CACHE_KEY = "rt1000.goals";

  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn()
    });

    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("return data from cache if available", async () => {
    const cachedResponse = { goals: 924 };
    const fetchedResponse = { goals: 924 };
    
    const mockGetItem = vi.spyOn(globalThis.localStorage, "getItem").mockReturnValue(
      JSON.stringify({ data: cachedResponse, expires: Date.now() + 10000 })
    );

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => fetchedResponse,
    });
  
    const data = await fetchGoals();

    expect(mockGetItem).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(data).toEqual(cachedResponse);
  });

  it("calls fetch function if there is no cache available", async () => {
    const fetchedResponse = { goals: 924 };

    const mockGetItem = vi.spyOn(globalThis.localStorage, "getItem").mockReturnValue(null);
    const mockSetItem = vi.spyOn(globalThis.localStorage, "setItem");

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => fetchedResponse,
    });
  
    const data = await fetchGoals();

    expect(mockGetItem).toHaveBeenCalled();
    expect(mockSetItem).toHaveBeenCalled();
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual(fetchedResponse);
  });

  it("remove cache if expired", async () => {
    const oldResponse = { goals: 923 };
    const newResponse =  { goals: 924 };
  
    const mockGetItem = vi.spyOn(globalThis.localStorage, "getItem").mockReturnValue(
      JSON.stringify({ data: oldResponse, expires: Date.now() - 1000 })
    );
    const mockRemoveItem = vi.spyOn(globalThis.localStorage, "removeItem");

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => newResponse,
    });
  
    const data = await fetchGoals();

    expect(mockGetItem).toHaveBeenCalled();
    expect(mockRemoveItem).toHaveBeenCalled();
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual(newResponse);
  });
});