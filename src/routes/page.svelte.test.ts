import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/svelte";

import Page from "./+page.svelte";

describe("/+page.svelte", () => {
	it("renders header and gif", () => {
		const headerText = "Cristiano Ronaldo road to 1000 goals";
		render(Page);
		expect(screen.queryByTestId("header")).toBeVisible();
		expect(screen.queryByTestId("header")).toHaveTextContent(headerText);
		expect(screen.queryByTestId("gif")).toBeVisible();
	});

	it("shows a loader when data is being retrieved", async () => {
		const mockResponse = { goals: 924 };
		window.fetch = vi.fn().mockReturnValueOnce(mockResponse);

		render(Page);
		expect(screen.queryByTestId("loading")).toBeVisible();
		expect(window.fetch).toHaveBeenCalledTimes(1);
	});
});
