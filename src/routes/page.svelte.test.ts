import { describe, beforeEach, afterEach, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/svelte";

import Page from "./+page.svelte";

import { fetchGoals } from "$lib/api/fetchGoals";

vi.mock("$lib/api/fetchGoals", () => ({
  fetchGoals: vi.fn(),
}));

describe("/+page.svelte", () => {
	const headerText = "Cristiano Ronaldo road to 1000 goals";

	afterEach(() => {
    vi.restoreAllMocks();
  });

	it("renders header and gif", async () => {
		const mockData = { goals: 924 };
		(fetchGoals as vi.Mock).mockResolvedValue(mockData);
		render(Page);

		expect(screen.getByText(headerText)).toBeInTheDocument();
		expect(screen.getByText(headerText)).toHaveTextContent(headerText);
		await waitFor(() => expect(screen.getByTestId("gif")).toBeInTheDocument());
	});

	it("shows a loader when data is being retrieved", async () => {
		const mockData = { goals: 924 };
		(fetchGoals as vi.Mock).mockResolvedValue(mockData);

		render(Page);

		await waitFor(() => expect(screen.getByTestId("loading")).toBeInTheDocument());
		expect(fetchGoals).toHaveBeenCalledTimes(1);
	});

	it("shows the number when data successfully retrieved", async () => {
		const mockData = { goals: 924 };
		(fetchGoals as vi.Mock).mockResolvedValue(mockData);
		render(Page);

		await waitFor(() => expect(screen.getByTestId("loading")).toBeInTheDocument());
		await waitFor(() => expect(screen.getByTestId("number")).toBeInTheDocument());
		await waitFor(() => expect(screen.queryByTestId("loading")).not.toBeInTheDocument());
	});
});
