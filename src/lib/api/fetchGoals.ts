import type { GoalsResponse } from '$lib/domain/GoalsResponse';
import { getCache, setCache } from '$lib/utils/cache';

export async function fetchGoals() {
	const CACHE_KEY = 'rt1000.goals';
	const ttl = 900;
	const cachedData: GoalsResponse | null = getCache(CACHE_KEY);

	if (cachedData) return cachedData;

	const url = 'https://goals-api.fusinate.workers.dev/goals';
	const response = await fetch(url);

	if (!response.ok) throw new Error(`Error fetching goals: ${response.statusText}`);

	const data = await response.json();
	setCache(CACHE_KEY, data, ttl);

	return data;
}
