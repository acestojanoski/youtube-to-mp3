/**
 * Dedupe values
 * @param {any[]} values
 * @returns
 */
export function dedupe(values) {
	return [...new Set(values)]
}
